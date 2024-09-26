import { LoginFieldType, LogoutFieldType, SignUpFieldType } from "../../constants/types/auth.type";
import { apiBase } from "../apiBase";
import { logout, signin, signup } from "./auth.query";

export const signUp = (data?: SignUpFieldType) => apiBase(signup(data));
export const signIn = (data?: LoginFieldType) => apiBase(signin(data));
export const logOut = (data?: LogoutFieldType) => apiBase(logout(data));
