import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './App.css'
import { useRouteElement } from './hooks'

function App() {
    const routeElement = useRouteElement();

  return  (
    <div className='font-item'>
    {routeElement}
    <ToastContainer />
  </div>
  )
  
  
}

export default App
