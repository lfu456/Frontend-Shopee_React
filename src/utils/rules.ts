import { RegisterOptions, UseFormGetValues } from "react-hook-form";
import * as yup from 'yup'

type Rules = {[key in 'email' | 'password' | 'confirm_password']?:RegisterOptions}
export const getRules = (getValues?:UseFormGetValues<any>):Rules => ({
  email: {
    required: {
      value: true,
      message: "Vui lòng nhập trường này",
    },
    pattern: {
      value: /^\S+@\S+\.\S+$/,
      message: "Sai định dạng",
    },
    maxLength: {
        value:160,
        message:'Độ dài từ 5-160 ký tự'
    },
    minLength: {
        value:5,
        message:'Độ dài từ 5-160 ký tự'
    }
  },
  password: {
    required: {
      value: true,
      message: "Vui lòng nhập trường này",
    },
    maxLength: {
        value:160,
        message:'Độ dài từ 5-160 ký tự'
    },
    minLength: {
        value:5,
        message:'Độ dài từ 5-160 ký tự'
    }
  },
  confirm_password: {
    required: {
      value: true,
      message: "Vui lòng nhập trường này",
    },
    maxLength: {
        value:160,
        message:'Độ dài từ 5-160 ký tự'
    },
    minLength: {
        value:5,
        message:'Độ dài từ 5-160 ký tự'
    },
    
    validate: typeof getValues ==='function' ? (value) => value === getValues('password') || 'Nhập lại Password không khớp' : undefined
  }
})

export const schema = yup.object({
    email:yup
      .string()
      .required('Email required')   
      .email('undefind type')
      .min(5,'Độ dài từ 5 - 160 ký tự')
      .max(160,'Độ dài từ 5 - 160 ký tự'),
      password:yup
      .string()
      .required('password required')
      .min(5,'Độ dài từ 5 - 160 ký tự')
      .max(160,'Độ dài từ 5 - 160 ký tự'), 
      confirm_password:yup
      .string()
      .required('password required')
      .min(5,'Độ dài từ 5 - 160 ký tự')
      .max(160,'Độ dài từ 5 - 160 ký tự')
      .oneOf([yup.ref('password')], 'nhập lại password không đúng'),



})
const loginSchema = schema.omit(['confirm_password'])
export type Schema = yup.InferType<typeof schema>
 


