import React from 'react'

interface Props {
    children?: React.ReactNode
}

export const SearchLayout = ({children}:Props) => {
  return (
    <div className=' flex justify-center'>
        <div id='containter' className='w-[1200px] h-[300px] flex justify-between' >
                <div id='filter-panel' className='w-[190px] bg-red-400'></div>
                <div id='main'className='w-[990px] '>
                    <div id='relevant-shop'></div>
                    <div id='result' className='flex flex-col gap-[10px]'>
                        <div id='sort-panel' className='h-[60px] bg-[rgba(0,0,0,.03)] px-[20px] py-[13px] flex items-center gap-[]'>
                            <span>Sắp xếp theo</span>
                            <div id=''></div>
                        </div>
                        <div id='items-list'></div>
                        <div id='pagination' className='flex gap-5 w-[800px] '>
                           {Array(10).fill(0).map((item,index) => <button className='px-3 rounded-sm bg-[#ff2d55]'>{index+1}</button>  )}
                        </div>
                    </div>

                </div>
        </div>
    </div>
    
  )
}
