import React from 'react'
import { Outlet } from "react-router-dom"
import { LeftNavBar } from '../UI/LeftNavBar'

export const MainLayout = () => {
  return (
      <div className="flex gap-0.5 h-screen max-w-screen bg-[var(--background-color)]  ">
        <LeftNavBar /> 
        {/* <div className='border rounded-2xl mx-1'></div> */}
        <div className=" bg-gray-100 dark:bg-gray-800 flex-1 overflow-auto">
          <Outlet />
        </div>
      </div>
  )
}
