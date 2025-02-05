import React from 'react'
import { IoSearch } from 'react-icons/io5'
import { Outlet } from 'react-router-dom'

export const RightLayout = () => {
    return (
        <div className='right-pannel w-full h-screen overflow-y-scroll'>
            <div className="flex items-center sticky top-0 z-10 justify-between px-4 py-3 bg-white dark:border-gray-700  dark:bg-gray-900">
                {/* Search Input */}
                <div className="flex-1 max-w-md relative  hidden sm:block">
                    <input className="w-full py-2 px-4 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 border border-gray-300 dark:border-gray-600 outline-none rounded-md focus:ring-2 focus:ring-cyan-400 transition-all" type="text"
                        placeholder="Search..."
                    /> <IoSearch className='absolute top-3 right-3 dark:text-white text-gray-500 text-xl' />
                </div>

                <div className="flex items-center gap-1 sm:hidden text-lg">
                    <img className={`dark:invert w-10 transition-all duration-300 `} src="/logo.png" alt="Logo" />
                    <span className={`font-bold transition-all text-md duration-300 text-[var(--primary-color)]`}> SoundWave </span>
                </div>

                {/* Login Button */}
                <div className="ml-4">
                    <button className="px-3 py-1.5 bg-[var(--primary-color)] text-sm text-white font-semibold md:font-bold rounded-full transition-all hover:bg-cyan-600 focus:ring-2 focus:ring-cyan-400">
                        Login
                    </button>
                </div>
            </div>
            
                <Outlet />
        
        </div>
    )
}
