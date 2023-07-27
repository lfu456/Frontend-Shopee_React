import React from 'react'
import { Footer, Header } from '../../components'

interface Props{
    children?: React.ReactNode
}

export const MainLayout = ({children}:Props) => {
  return (
    <div className='flex flex-col gap-[20px] bg-neutral-100'>
      <Header />
      {children}
      <Footer />
    </div>
  )
}

 
