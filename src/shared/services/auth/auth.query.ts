import {
  LoginFieldType,
  LogoutFieldType,
  SignUpFieldType,
} from "../../constants/types/auth.type";

export const signin = (data?: LoginFieldType) => {
  return {
    operationName: "Signin",
    query: ` mutation Signin($username: String!, $password: String!) {
        signin(password: $password, username: $username) {
          accessToken
          refreshToken
          userInfo {
            fullName
            username
            address
            phoneNumber
            id
            avatar
          }
        }
      }
      `,
    variables: data || ({} as LoginFieldType),
  };
};
export const signup = (data?: SignUpFieldType) => {
  return {
    operationName: "Signup",
    query: ` mutation Signup(
      $fullName: String!,
      $email: String!,
      $phoneNumber: String!,
      $address: String!,
      $username: String!,
      $password: String!,
      $avatar: String!
    ) {
      signup(
        fullName: $fullName,
        email: $email,
        phoneNumber: $phoneNumber,
        address: $address,
        username: $username,
        password: $password,
        avatar: $avatar
      ) {
        address
        avatar
        createdAt
        email
        id
        isActive
        password
        phoneNumber
        refreshToken
        updatedAt
        username
      }
    }
    
      `,
    variables: data || ({} as SignUpFieldType),
  };
};
export const logout = (data?: LogoutFieldType) => {
  return {
    operationName: "Logout",
    query: ` 
      mutation Logout($uid: String!) {
        logout(uid: $uid) {
          refreshToken
        }
      }
      `,
    variables: data || ({} as LogoutFieldType),
  };
};
