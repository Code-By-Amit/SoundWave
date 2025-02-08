import React from 'react'
import { FaHeart } from 'react-icons/fa'

export const RecentPlaysPage = () => {
  return (
    <>
      {/* Favourate Songs  */}
      <div className="songs min-h-96 p-3">

        <h1 className="text-2xl font-bold  md:mx-7 my-4 dark:text-white">Recent play's</h1>



        <div className="song shadow-md p-3 rounded flex mx-2 md:mx-4 mb-2 group hover:bg-[var(--primary-color)] transition ease-in-out duration-300 hover:shadow-2xl justify-between bg-white items-center space-x-4 dark:bg-gray-600 ">
          {/* image and title */}
          <div className="flex items-center gap-3 w-1/2 sm:w-auto group flex-1 max-w-84">

            <img className="w-10 h-10 rounded-full ring-1 ring-offset-1 ring-[var(--primary-color)]" src="https://i.scdn.co/image/ab67616d0000b27344aa56e23e3a89802e6c6347" alt="Dildara (Stand by me)" />
            <div className="flex flex-col w-full h-full justify-start items-start text-sm ">
              <p className="font-bold line-clamp-1 text-gray-600 group-hover:text-white dark:text-white">Dildara (Stand by me)</p>
              <p className="line-clamp-1 text-gray-400 group-hover:text-white dark:text-white">Arizit Singh</p>
            </div>
          </div>
          <div className='flex items-center justify-between w-20 md:w-30 mx-3 md:mx-5'>
            <p className='text-white px-3'>3:44</p>
            <FaHeart className='text-red-600 cursor-pointer' />
          </div>
        </div>

        <div className="song shadow-md p-3 rounded flex mx-2 md:mx-4 mb-2 group hover:bg-[var(--primary-color)] transition ease-in-out duration-300 hover:shadow-2xl justify-between bg-white items-center space-x-4 dark:bg-gray-600 ">
          {/* image and title */}
          <div className="flex items-center gap-3 w-1/2 sm:w-auto group flex-1 max-w-84">

            <img className="w-10 h-10 rounded-full ring-1 ring-offset-1 ring-[var(--primary-color)]" src="https://i.scdn.co/image/ab67616d0000b27344aa56e23e3a89802e6c6347" alt="Dildara (Stand by me)" />
            <div className="flex flex-col w-full h-full justify-start items-start text-sm ">
              <p className="font-bold line-clamp-1 text-gray-600 group-hover:text-white dark:text-white">Dildara (Stand by me)</p>
              <p className="line-clamp-1 text-gray-400 group-hover:text-white dark:text-white">Arizit Singh</p>
            </div>
          </div>
          <div className='flex items-center justify-between w-20 md:w-30 mx-3 md:mx-5'>
            <p className='text-white px-3'>3:44</p>
            <FaHeart className='text-red-600 cursor-pointer' />
          </div>
        </div>

        <div className="song shadow-md p-3 rounded flex mx-2 md:mx-4 mb-2 group hover:bg-[var(--primary-color)] transition ease-in-out duration-300 hover:shadow-2xl justify-between bg-white items-center space-x-4 dark:bg-gray-600 ">
          {/* image and title */}
          <div className="flex items-center gap-3 w-1/2 sm:w-auto group flex-1 max-w-84">

            <img className="w-10 h-10 rounded-full ring-1 ring-offset-1 ring-[var(--primary-color)]" src="https://i.scdn.co/image/ab67616d0000b27344aa56e23e3a89802e6c6347" alt="Dildara (Stand by me)" />
            <div className="flex flex-col w-full h-full justify-start items-start text-sm ">
              <p className="font-bold line-clamp-1 text-gray-600 group-hover:text-white dark:text-white">Dildara (Stand by me)</p>
              <p className="line-clamp-1 text-gray-400 group-hover:text-white dark:text-white">Arizit Singh</p>
            </div>
          </div>
          <div className='flex items-center justify-between w-20 md:w-30 mx-3 md:mx-5'>
            <p className='text-white px-3'>3:44</p>
            <FaHeart className='text-red-600 cursor-pointer' />
          </div>
        </div>


      </div>
    </>
  )
}
