import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { AiFillHome } from "react-icons/ai";
import { MdLibraryMusic } from "react-icons/md";
import { IoCloudUploadSharp, IoReload } from "react-icons/io5";
import { FaHeart } from "react-icons/fa";
import { PiPlaylistDuotone } from "react-icons/pi";
import { FiMenu } from "react-icons/fi";

export const LeftNavBar = () => {
  const [isOpen, setIsOpen] = useState(true); // Sidebar toggle state

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      className={`dark:bg-gray-900 dark:text-white bg-white pt-4 h-screen flex flex-col transition-all duration-300
          md:relative top-0 left-0 z-50 ${isOpen ? "w-64 p-5 fixed" : "w-16 p-3"}
          min-w-[4rem] md:flex`}
    >
      {/* Top Section */}
      <div className="flex justify-between items-center">

        {/* Logo */}
        <div className="flex items-center gap-2 text-lg">
          <img className={`dark:invert w-10 transition-all duration-300 ${!isOpen && "hidden"}`} src="/logo.png" alt="Logo" />
          <span className={`font-bold transition-all duration-300 text-cyan-500 ${!isOpen && "hidden"} md:block`}> SoundWave </span>
        </div>

        {/* Toggle Button (Mobile Only) */}
        <button
          className="dark:bg-gray-800 bg-gray-100 text-black h-9 flex justify-center items-center w-9 p-2 rounded-md cursor-pointer md:hidden"
          onClick={toggleSidebar}
        >
          <FiMenu size={25} />
        </button>
      </div>

      {/* Navigation Menu */}
      <nav className="mt-6">
        <ul className="flex flex-col">
          <NavItem to="/" text="Home" isOpen={isOpen} icon={<AiFillHome />} />
          <NavItem to="/explore" text="Explore" isOpen={isOpen} icon={<MdLibraryMusic />} />
          <NavItem to="/favourites" text="Favourites" isOpen={isOpen} icon={<FaHeart />} />
          <NavItem to="/playlist" text="Your Playlists" isOpen={isOpen} icon={<PiPlaylistDuotone />} />

          {/* Divider
            <div className="border border-gray-500 rounded-2xl my-2"></div> */}

          <NavItem to="/recent" text="Recent" isOpen={isOpen} icon={<IoReload />} />
          <NavItem to="/uploads" text="Uploads" isOpen={isOpen} icon={<IoCloudUploadSharp />} />
        </ul>
      </nav>
    </div>
  );
};

// Navigation Item Component
const NavItem = ({ to, text, icon, isOpen }) => {
  return (
    <li>
      <NavLink to={to} className={({ isActive }) => `flex items-center ${isOpen ? "gap-3" : "justify-center"}  p-2 rounded-md mb-2 transition duration-300 ${isActive ? "bg-cyan-500 text-white" : "text-gray-600 hover:bg-gray-300 dark:hover:text-white"} dark:hover:bg-gray-800` }>
        <div className="w-7 h-7 min-w-[28px] min-h-[28px] flex justify-center items-center">
          {icon}
        </div>
        <span className={`text-sm ${!isOpen && "hidden"} md:block`}>
          {text}
        </span>
      </NavLink>
    </li>
  );
};
