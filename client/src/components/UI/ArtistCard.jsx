import React from 'react'
import { FaPlay } from 'react-icons/fa'
import { Link } from 'react-router-dom'

export const ArtistCard = ({ imgSrc, name, id }) => {
    return (
        <Link to={`/artist-page/${id}`} className="card w-32 md:w-40 flex flex-col items-center justify-center md:min-w-[8rem] h-fit group rounded-lg hover:scale-105 transition ease-in-out duration-200 group overflow-hidden shrink-0 p-1">

            {/* Image Section */}
            <div className="w-22 h-22 md:w-30 md:h-30 rounded-full overflow-hidden flex justify-center items-center relative bg-gray-300 ring-2 ring-[var(--primary-color)] ring-offset-2 dark:ring-offset-[#1e2939]">
                <img className="h-full w-full object-cover object-center transform transition-all duration-300 group-hover:scale-105" src={imgSrc} alt={`${name} image`} />
            </div>

            {/* Name Section */}
            <div className="title group p-2 mt-1 text-center dark:text-white ">
                <span className='font-semibold text-sm group font-roboto line-clamp-2'>{name}</span>
            </div>
        </Link>
    )
}
