import axios, {AxiosError, AxiosInstance} from "axios";
import HttpStatusCode from "../constant/httpStatusCodeEnum";
import { toast } from "react-toastify";
import { AuthResponse } from "../types/auth.type";
import { clearLs, getAccessTokenFromLs, setAccessTokenToLS } from "./auth";
import { path } from "../constant/path";

class Http {
    instance: AxiosInstance
    private accessToken:string
    //luu accessToken o class => luu tren ram => truy xuat nhanh hon trong Local
    constructor(){
      this.accessToken = getAccessTokenFromLs()
      //moi lan refresh constructor se chay 1 lan duy nhat getAccessTokenFromLs
        this.instance = axios.create({
            baseURL:'https://api-ecom.duthanhduoc.com/',
            timeout:10000,
            headers:{
                'Content-Type':'application/json'
            }
        })
        this.instance.interceptors.request.use( (config) => {
            // Làm gì đó trước khi request dược gửi đi
            if(this.accessToken && config.headers){
              config.headers.Authorization = this.accessToken
              return config
            }
            return config;
          }, function (error) {
            // Làm gì đó với lỗi request
            return Promise.reject(error);
          },);
        
        // Thêm một bộ đón chặn response
            this.instance.interceptors.response.use(
            // Bất kì mã trạng thái nào nằm trong tầm 2xx đều khiến hàm này được trigger
            // Làm gì đó với dữ liệu response
            (response) => {
              const {url} = response.config
              if(url === path.login|| url === path.register){
                this.accessToken = (response.data as AuthResponse).data?.access_token
                console.log();
                setAccessTokenToLS(this.accessToken)
              } else if (url === path.logout){
                this.accessToken =''
                clearLs()
              }
            return response;
          }, function (error: AxiosError) {
            // Bất kì mã trạng thái nào lọt ra ngoài tầm 2xx đều khiến hàm này được trigger\
            // Làm gì đó với lỗi response
            if(error.response?.status !== HttpStatusCode.UnprocessableEntity){
              const data:any | undefined = error.response?.data
              const message = data?.message || error.message
              toast.error(message);
            }
            return Promise.reject(error);
          });
    }
    // Thêm một bộ đón chặn request
    

}

const http = new Http().instance
export default http
