import React from 'react'
import { Outlet } from "react-router-dom"
import { LeftNavBar } from '../UI/LeftNavBar'

export const MainLayout = () => {
  return (
    <div>
      <div className="flex gap-1 min-h-screen bg-gray-200">
        <LeftNavBar />
        {/* <div className='border rounded-2xl mx-1'></div> */}
        <Outlet />
      </div>
    </div>
  )
}
