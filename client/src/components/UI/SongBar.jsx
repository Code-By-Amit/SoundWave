import React from 'react'
import { FaRegHeart } from 'react-icons/fa'

export const SongBar = ({ title, imgSrc, duration, noOfPlay, artist }) => {
    return (
        <div className="song shadow-md md:p-3 md:pr-2 p-2  rounded flex  mb-2 group hover:bg-[var(--primary-color)] transition ease-in-out duration-300 hover:shadow-2xl justify-between bg-white items-center space-x-4 dark:bg-gray-600 ">
            {/* image and title */}
            <div className="flex items-center gap-3 w-1/2 sm:w-auto group flex-1 max-w-84">
        
                <img className="w-10 h-10 rounded-full ring-1 ring-offset-1 ring-[var(--primary-color)]" src={imgSrc} alt={title} />
                <div className="flex flex-col w-full h-full justify-start items-start text-sm ">
                    <p className="font-bold line-clamp-1 text-gray-600 group-hover:text-white dark:text-white">{title}</p>
                    {artist && <p className="line-clamp-1 text-gray-400 group-hover:text-white dark:text-white">{artist}</p>}
                </div>
            </div>

            {/* time, play, and Add to Favorites */}
            <div className="flex sm:mr-5 *:mx-3 w-44 text-gray-500 md:w-84 justify-between group-hover:text-white dark:text-white items-center text-xs sm:text-sm">
                <p>{duration}</p>
                <p>{noOfPlay}</p>
                <FaRegHeart className="text-xl hover:text-red-500 cursor-pointer" />
            </div>
        </div>
    )
}
