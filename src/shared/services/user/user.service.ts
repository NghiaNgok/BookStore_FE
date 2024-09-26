import { UpdatePasswordType, UpdateUserType } from "../../constants/types/user.type";
import { apiBase } from "../apiBase";
import { getCurrentUser, updateUserInfo, updateUserPassword } from "./user.query";

export const getUserApi = (id: string) => apiBase(getCurrentUser(id));
export const updateUserApi = (data: UpdateUserType) =>
  apiBase(updateUserInfo(data));
export const updatePasswordApi = (data: UpdatePasswordType) => apiBase(updateUserPassword(data));
