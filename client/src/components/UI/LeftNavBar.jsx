import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { AiFillHome } from "react-icons/ai";
import { MdLibraryMusic } from "react-icons/md";
import { IoCloudUploadSharp, IoReload } from "react-icons/io5";
import { FaHeart, FaPlusSquare, FaUserCog } from "react-icons/fa";
import { PiPlaylistDuotone } from "react-icons/pi";
import { FiMenu } from "react-icons/fi";
import { RxCross2 } from "react-icons/rx"
import { GoSignOut } from "react-icons/go";
import { authUser } from '../../context/AuthUserContext';


export const LeftNavBar = () => {
  const [isOpen, setIsOpen] = useState(window.innerWidth > 768); // Sidebar toggle state
  const { user, logout } = authUser()
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      className={`dark:bg-gray-900 dark:text-white bg-white pt-4 h-screen flex flex-col transition-all ease-in-out duration-300
          md:relative top-0 left-0 z-50 ${isOpen ? "w-74 p-5 fixed" : "w-16 p-3"}
          min-w-[4rem] md:flex shrink-0`} >
      {/* Top Section */}
      <div className="flex justify-between items-center">

        {/* Logo */}
        <div className="flex items-center gap-2 text-lg">
          <img className={`dark:invert w-10 transition-all duration-300 ${!isOpen && "hidden"}`} src="/logo.png" alt="Logo" />
          <span className={`font-bold transition-all duration-300 text-[var(--primary-color)] ${!isOpen && "hidden"}`}> SoundWave </span>
        </div>

        {/* Toggle Button */}
        <button
          className="dark:bg-gray-800 bg-gray-100 dark:text-white text-black h-9 flex justify-center items-center transition ease-in-out duration-300 w-9 p-2 rounded-md cursor-pointer"
          onClick={toggleSidebar}
        >
          {isOpen ? <RxCross2 size={25} /> : <FiMenu size={25} />}
        </button>
      </div>

      {/* Navigation Menu */}
      <nav className="mt-6">
        <ul className="flex flex-col">
          <NavItem to="/" text="Home" isOpen={isOpen} icon={<AiFillHome />} />
          <NavItem to="/explore" text="Explore" isOpen={isOpen} icon={<MdLibraryMusic />} />
          <NavItem to="/favourites" text="Favourites" isOpen={isOpen} icon={<FaHeart />} />
          <NavItem to="/playlist" text="Your Playlists" isOpen={isOpen} icon={<PiPlaylistDuotone />} />
          <NavItem to="/recent" text="Recent" isOpen={isOpen} icon={<IoReload />} />
          <NavItem to="/uploads" text="Uploads" isOpen={isOpen} icon={<IoCloudUploadSharp />} />
          {/* Divider */}
          {
            user &&
            (<>
              <div className="border border-gray-300 rounded-2xl my-3"></div>
              
              {
                (user && user.role == 'ADMIN') && <NavItem to="/create-artist" text="Create Artist" isOpen={isOpen} icon={<FaPlusSquare />} />
              }

              <NavItem to="/edit-profile" text="Edit Profile" isOpen={isOpen} icon={<FaUserCog />} />
              <li>
                <div onClick={logout} className={`flex items-center ${isOpen ? "gap-3" : "justify-center"}  p-2 rounded-md mb-2 transition duration-300 text-gray-600 hover:bg-gray-300 dark:text-white dark:hover:bg-gray-800`}>
                  <div className="w-7 h-7 min-w-[28px] min-h-[28px] flex justify-center items-center">
                    <GoSignOut color='red' />
                  </div>
                  <span className={`text-sm text-red-500 transition-all duration-300 overflow-hidden whitespace-nowrap  ${isOpen ? "opacity-100 max-w-full" : "opacity-0 max-w-0"}`}>
                    Logout
                  </span>
                </div>
              </li>
            </>)
          }
        </ul>
      </nav>
    </div>
  );
};

// Navigation Item Component
const NavItem = ({ to, text, icon, isOpen }) => {
  return (
    <li>
      <NavLink to={to} className={({ isActive }) => `flex items-center ${isOpen ? "gap-3" : "justify-center"}  p-2 rounded-md mb-2 transition duration-300  ${isActive ? "bg-[var(--primary-color)] text-white" : "text-gray-600 hover:bg-gray-300 dark:text-white"} dark:hover:bg-gray-800`}>
        <div className="w-7 h-7 min-w-[28px] min-h-[28px] flex justify-center items-center">
          {icon}
        </div>
        <span className={`text-sm transition-all duration-300 overflow-hidden whitespace-nowrap 
                        ${isOpen ? "opacity-100 max-w-full" : "opacity-0 max-w-0"}`}>
          {text}
        </span>
      </NavLink>
    </li>
  );
};
