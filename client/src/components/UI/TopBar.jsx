import React, { useEffect, useState } from 'react'
import { DarkLightToggleButton } from './DarkLightToggleButton'
import { IoSearch } from 'react-icons/io5'
import { NavLink, useNavigate } from 'react-router-dom';
import { authUser } from '../../context/AuthUserContext';
import { ColorPiker } from './ColorPicker';

export const TopBar = () => {
    const [isDarkMode, setIsDarkMode] = useState(() => localStorage.getItem("theme") === "dark");
    const [isOpen, setIsOpen] = useState(false);
    const [search,setSearch] = useState("");
    const { user, logout } = authUser();

    const navigate = useNavigate()

    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode)
    }

    useEffect(()=>{
        if(search !== ""){
            navigate(`/search/${search}`)
        }else{
            navigate('/')
        }
    },[search])

    useEffect(() => {
        let theme = localStorage.getItem('theme');
        if (theme == "dark") setIsDarkMode(true);
        else setIsDarkMode(false);
    }, []);

    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.setAttribute("data-theme", "dark")
            document.documentElement.style.setProperty('--sb-track-color', '#232e33')
            localStorage.setItem("theme", "dark");
        }
        else {
            document.documentElement.setAttribute("data-theme", "")
            document.documentElement.style.setProperty("--sb-track-color", '#f3f4f6')
            localStorage.removeItem("theme");
        }
    }, [isDarkMode])

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };
    const handleLogout = async () => {
        await logout()
        navigate('/')
        toggleDropdown()
    }
    return (
        <div className="flex items-center sticky top-0 z-10 justify-between p-3 md:px-4 md:py-3 bg-white dark:border-gray-700  dark:bg-gray-900">
            {/* Search Input */}
            <div className="flex-1 max-w-md relative hidden sm:block">
                <input className="w-full py-1.5 md:py-2 px-4 ml-3 shadow-sm dark:bg-gray-700 text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 border border-gray-300 dark:border-gray-600 outline-none rounded-md focus:ring-2 focus:ring-cyan-400 transition-all" type="text"
                    placeholder="Search..."
                    value={search}
                    onChange={(e)=>setSearch(e.target.value)}
                /> <IoSearch className='absolute top-2.5 right-2  md:top-3 md:right-3 dark:text-white text-gray-500 text-xl' />
            </div>

            <div className="flex items-center gap-2 sm:hidden text-lg">
                <img className={`dark:invert w-6 md:w-10 transition-all duration-300 `} src="/logo.png" alt="Logo" />
                <span className={`font-bold transition-all text-md duration-300 text-[var(--primary-color)]`}> SoundWave </span>
            </div>

            {/* Login Button */}
            <div className="ml-4 flex gap-2 md:gap-4 items-center">
            <ColorPiker />
                <DarkLightToggleButton toggleDarkMode={toggleDarkMode} isDarkMode={isDarkMode} />

                {
                    user ? (
                        <div className='relative'>
                            <button
                                className="flex text-sm items-center p-0.5 md:p-1 rounded-full ring-2 md:ring-3 ring-[var(--primary-color)] hover:scale-105"
                                type="button"
                                onClick={toggleDropdown} >
                                <div className="w-7 h-7 rounded-full overflow-hidden">
                                    <img className="w-full h-full object-cover" src={user.profileImg} alt="user photo" crossOrigin="anonymous" />
                                </div>
                                <div className='whitespace-nowrap mx-1 text-xs hidden sm:block md:text-base dark:text-white'>{user.firstName}</div>
                            </button>

                            {/* Dropdown menu */}
                            {isOpen && (
                                <div className="z-10 absolute mt-2 bg-white divide-y dark:bg-gray-600 divide-gray-100 rounded-lg shadow md:w-44 min-w-max right-0 lg:left-auto">
                                    <div className="py-0.5 md:py-1">
                                        <button onClick={handleLogout} className="w-full text-start px-4 py-0.5 md:py-2 text-xs md:text-md font-semibold text-red-500 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white" >
                                            Sign out
                                            {/* <p className='text-sm font-mono font-light text-gray-600 dark:text-white'>{user.username}</p> */}
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    ) : (
                        <NavLink to="/login">
                            <button className="cursor-pointer px-4 py-2 bg-[var(--primary-color)] text-sm text-white font-semibold md:font-bold rounded-full transition-all hover:opacity-80 focus:ring-2">
                                Login
                            </button>
                        </NavLink>
                    )
                }

            </div>
        </div>
    )
}
