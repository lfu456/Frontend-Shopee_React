import { User } from "./user.type";
import { SucessResponse } from "./utils.type";

export type AuthResponse = SucessResponse <{
    access_token:string
    expires:string
    user:User
}>
