import React from 'react'
import { FaRegHeart } from 'react-icons/fa'

export const SongRow = ({ title, imgSrc, duration, noOfPlay, artist }) => {
    return (
        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:text-white dark:hover:bg-gray-600">
            {/* Song Info */}
            <td className="px-3 py-3 md:px-6 md:py-4 flex items-center gap-2 md:gap-3">
                <img className="rounded-full h-10 w-10 ring-1 ring-offset-2 ring-[var(--primary-color)]" src={imgSrc} alt={title} />
                <div className="flex flex-col w-full h-full justify-start items-start">
                    <p className="font-bold line-clamp-1">{title}</p>
                    {artist && <p className="line-clamp-1 text-gray-400 ">{artist}</p>}
                </div>
            </td>

            {/* Duration */}
            <td className="px-2 py-3 text-center md:px-6 md:py-4">{duration}</td>

            {/* Number of Plays */}
            <td className="px-2 py-3 text-center md:px-6 md:py-4">{noOfPlay}</td>

            {/* Like (Heart Icon) - Fixed Centering */}
            <td className="px-2 py-3 md:px-6 md:py-4">
                <div className="flex justify-center items-center w-full h-full">
                    <FaRegHeart className="text-xl" />
                </div>
            </td>
        </tr>
    )
}
