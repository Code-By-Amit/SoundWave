import React, { useEffect, useState } from 'react'
import { DarkLightToggleButton } from './DarkLightToggleButton'
import { IoSearch } from 'react-icons/io5'

export const TopBar = () => {
    const [isDarkMode, setIsDarkMode] = useState(() => localStorage.getItem("theme") === "dark");

    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode)
        console.log("I am here")
    }

    useEffect(() => {
        let theme = localStorage.getItem('theme');
        if (theme == "dark") setIsDarkMode(true);
        else setIsDarkMode(false);
    }, []);

    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.setAttribute("data-theme", "dark")
            localStorage.setItem("theme", "dark");
        }
        else {
            document.documentElement.setAttribute("data-theme", "")
            localStorage.removeItem("theme");
        }
    }, [isDarkMode])
    return (
        <div className="flex items-center sticky top-0 z-10 justify-between px-4 py-3 bg-white dark:border-gray-700  dark:bg-gray-900">
            {/* Search Input */}
            <div className="flex-1 max-w-md relative hidden sm:block">
                <input className="w-full py-2 px-4 ml-3 shadow-sm dark:bg-gray-700 text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 border border-gray-300 dark:border-gray-600 outline-none rounded-md focus:ring-2 focus:ring-cyan-400 transition-all" type="text"
                    placeholder="Search..."
                /> <IoSearch className='absolute top-3 right-3 dark:text-white text-gray-500 text-xl' />
            </div>

            <div className="flex items-center gap-1 sm:hidden text-lg">
                <img className={`dark:invert w-10 transition-all duration-300 `} src="/logo.png" alt="Logo" />
                <span className={`font-bold transition-all text-md duration-300 text-[var(--primary-color)]`}> SoundWave </span>
            </div>

            {/* Login Button */}
            <div className="ml-4 flex gap-4 items-center">
                <DarkLightToggleButton toggleDarkMode={toggleDarkMode} />
                <div>
                    <button className="px-3 py-1.5 bg-[var(--primary-color)] text-sm text-white font-semibold md:font-bold rounded-full transition-all hover:bg-cyan-600 focus:ring-2 focus:ring-cyan-400">
                        Login
                    </button>
                </div>
            </div>
        </div>
    )
}
