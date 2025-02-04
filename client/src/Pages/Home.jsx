import React from 'react'
import { IoSearch } from "react-icons/io5";

export const Home = () => {
  return (
    <>
      {/* Main Content Area */}
      <div className=" w-full bg-gray-100 dark:bg-gray-800 p-1.5 overflow-auto">
        {/* <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Main Content Here</h1>
        <p className="mt-4 text-gray-700 dark:text-gray-300">This section expands to fill the remaining space.</p> */}

        <div className="flex items-center justify-between px-4 py-3 rounded-md bg-gray-200 dark:border-gray-700  dark:bg-gray-900">

          {/* Search Input */}
          <div className="flex-1 max-w-md relative">
            <input
              className="w-full py-2 px-4 bg-white dark:bg-gray-700 text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 border border-gray-300 dark:border-gray-600 outline-none rounded-md focus:ring-2 focus:ring-cyan-500 transition-all"
              type="text"
              placeholder="Search..."
            /> <IoSearch className='absolute top-3.5 right-4' />
          </div>

          {/* Login Button */}
          <div className="ml-4">
            <button className="px-5 py-2 bg-cyan-500 text-white font-bold rounded-full transition-all hover:bg-cyan-600 focus:ring-2 focus:ring-cyan-400">
              Login
            </button>
          </div>
        </div>
          

      </div>
    </>
  )
}
