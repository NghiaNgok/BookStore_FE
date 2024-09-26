import axios, { AxiosRequestConfig } from "axios";
import { IApi } from "../constants/types/api.type";
import {
  ACCESS_TOKEN,
  REFRESH_TOKEN,
  USER_STORE,
} from "../constants/appConstants";

export const apiBase = async (graphqlQuery: IApi) => {
  const baseUrl: string = import.meta.env.VITE_API;
  const token = localStorage.getItem(ACCESS_TOKEN);
  const refreshToken = localStorage.getItem(REFRESH_TOKEN);
  const headers = {
    "Content-Type": "application/json",
    authorization: token ? `Bearer ${token}` : "",
  };

  const config: AxiosRequestConfig = {
    url: baseUrl,
    method: "post",
    data: graphqlQuery,
    headers: headers,
  };

  try {
    const response = await axios(config);
    console.log("response", response);

    if (
      !response.data.data &&
      response.data.errors &&
      response.data.errors[0].message === "Unauthorized"
    ) {
      try {
        // Call your refresh token endpoint
        const refreshResponse = await axios.post(baseUrl, {
          query: `
          mutation Refresh {
            refresh(refresh_token: "${refreshToken}") {
              accessToken
              userInfo {
                fullName
                username
                id
                avatar
                refreshToken
              }
            }
          }
          `,
        });

        if (!refreshResponse.data.data) {
          const logout = await axios.post(baseUrl, {
            query: `
            mutation Logout {
              logout(refresh_token: "${refreshToken}") {
              refreshToken
              }
            }
            `,
          });
          localStorage.clear();
          return logout;
        }

        const newInfo = refreshResponse.data.data.refresh;
        localStorage.setItem(ACCESS_TOKEN, newInfo.accessToken);
        localStorage.setItem(USER_STORE, JSON.stringify(newInfo.userInfo));

        // Retry the original request with the new access token
        if (config.headers) {
          config.headers.authorization = `Bearer ${newInfo.accessToken}`;
        }

        const retryResponse = await axios(config);
        return retryResponse;
      } catch (refreshError) {
        console.error("Refresh token is invalid or expired");
        throw refreshError;
      }
    }

    return response;
  } catch (error) {
    console.log("error", error);
    throw error;
  }
};
