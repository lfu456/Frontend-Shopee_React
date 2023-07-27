import axios, { AxiosError,  } from "axios";
import HttpStatusCode from "../constant/httpStatusCodeEnum";

//type guards trong control flow analysis
export function isAxiosError<T>(error: unknown): error is AxiosError<T>{
    return axios.isAxiosError(error)
}
//type predicate sau khi chay func thi  error mang type AxiosError<T>

export function isAxiosUnprocessableEntityError<FormError>(error:unknown): error is AxiosError<FormError>{
    return isAxiosError(error) && error.response?.status === HttpStatusCode.UnprocessableEntity
}

