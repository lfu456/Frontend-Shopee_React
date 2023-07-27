export interface ErrorResponse<Data>{
 message:string
 data?:Data
}
export interface SucessResponse<Data>{
    message:string
    data:Data
   }
// Đặt interface cho API trả về 
// Data là Generictype sẽ được tạo khi tạo type AuthResponse = ResponseApi<{ data:data | string }>