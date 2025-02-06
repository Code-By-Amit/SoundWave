import React, { useEffect, useState } from 'react'
import { IoSearch } from 'react-icons/io5'
import { Outlet } from 'react-router-dom'
import { DarkLightToggleButton } from '../UI/DarkLightToggleButton'
import { TopBar } from '../UI/TopBar'

export const RightLayout = () => {
    

    return (
        <div className=' w-full h-screen flex flex-col'>

            <TopBar />

            {/* Content Area */}
            <div className="right-pannel-scrollbar bg-gray-100 dark:bg-gray-800 h-full p-1.5 overflow-auto">
                <Outlet />
            </div>

        </div>
    )
}
