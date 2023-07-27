import React, { InputHTMLAttributes } from 'react'
import { RegisterOptions, UseFormRegister } from 'react-hook-form'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  type: React.HTMLInputTypeAttribute
  errorMessage?: string
  placeholder?:string
  className?:string
  name: string
  register:UseFormRegister<any>

  rules?: RegisterOptions
}
export const Input = ({type, errorMessage, placeholder, className,register, name,rules}:Props) => {
  const registerResult = name && register ? register(name,rules) : {}
  return (
    <div className={className}>
      <input
                  // register={register}
                  type={type}
                  className="p-3 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm"
                  // errorMessage={errors.email?.message}
                  placeholder={placeholder}
                  {...registerResult}
                />
                <div className='mt-1 text-red-600 min-h-[1.25rem] text-sm'>{errorMessage}</div>
    </div>
  )
}

 
