import React from 'react'
import { Link } from 'react-router-dom'

export const PlaylistCard = ({ imgSrc, title,id ,songsLength}) => {

    return (
        <Link to={`/playlist-page/${id}`} className="card w-auto min-w-[6.25rem] md:w-34 md:min-w-[8rem]  h-fit bg-white rounded-md group overflow-hidden transition ease-in-out 
                        duration-105 dark:bg-[#141e32] dark:hover:bg-[#1c2944]  hover:shadow-md
                          hover:bg-gray-50 hover:scale-105 shrink">

            {/* Image Section */}
            <div className="w-25 h-25 md:w-full md:h-32 overflow-hidden flex justify-center group items-center relative bg-gray-300">
                <img className="h-full w-full object-cover object-center transform transition-all duration-300 group-hover:scale-105" src={imgSrc} alt={title} />
            </div>

            {/* Title Section */}
            <div className="title p-2">
                <p className='font-semibold dark:text-white text-sm group mb-0.5 font-roboto line-clamp-2'>{title}</p>
                <p className='text-gray-400 text-xs'>{songsLength} Songs</p>
            </div>
        </Link>
    )
}
