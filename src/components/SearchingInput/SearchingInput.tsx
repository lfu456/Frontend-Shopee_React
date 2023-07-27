import React from 'react'
import icons from '../../utils/icons'

export const SearchingInput = () => {
    const {CgSearch} = icons
  return (
    <>
      <form className='bg-white w-full h-full rounded-sm' >
      <div className='flex rounded-sm bg-white p-[3px] '>
              <input
                type='text'
                className=' flex-grow border-none bg-transparent px-3 py-1 placeholder:font-thin
                outline-none'
                placeholder='Đăng ký và nhận voucher bạn mới đến 70k!'
                
              />
              <button className='rounded-sm bg-orange py-2 px-6 hover:opacity-90'>
                    <CgSearch color="white" fontSize="1.25em" />
              </button>
            </div>
      </form>
    </>
  )
}

 
