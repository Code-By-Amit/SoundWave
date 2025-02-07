import React, { useEffect, useState } from 'react'
import { IoSearch } from 'react-icons/io5'
import { Outlet } from 'react-router-dom'
import { DarkLightToggleButton } from '../UI/DarkLightToggleButton'
import { TopBar } from '../UI/TopBar'

export const RightLayout = () => {


    return (
        <div className='w-full h-screen flex flex-col'>
            <TopBar />
            {/* Content Area */}
            <div className='right-pannel-scrollbar overflow-auto'>
            <Outlet />
            </div>
        </div>
    )
}
