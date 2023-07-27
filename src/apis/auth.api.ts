import { path } from "../constant/path";
import { AuthResponse } from "../types/auth.type";
import { User } from "../types/user.type";
import http from "../utils/http";

export const registerAccount = (body: { email: string; password: string }) =>  http.post<AuthResponse>(path.register, body);

export const loginAccount = (body: { email: string; password: string }) =>
http.post<AuthResponse>(path.login, body);

export const logout = () =>
http.post<AuthResponse>(path.logout)