import React, { useEffect, useState } from 'react'
import { IoSearch } from 'react-icons/io5'
import { Outlet } from 'react-router-dom'
import { DarkLightToggleButton } from '../UI/DarkLightToggleButton'
import { TopBar } from '../UI/TopBar'
import { Toaster } from 'react-hot-toast';
export const RightLayout = () => {


    return (
        <div className='w-full h-screen flex flex-col'>
            <TopBar />
            {/* Content Area */}
            <div className='right-pannel-scrollbar h-full overflow-auto'>
            <Outlet />
            <Toaster containerStyle={{marginTop:'95px'}} position='top-center'/>
            </div>
        </div>
    )
}
