import React from 'react'
import { FaPlay  } from "react-icons/fa6";

export const SongCard = ({ title, image }) => {
  return (
    <div className="card w-34 min-w-[8rem] min-h-50 bg-white rounded-lg shadow-md overflow-hidden">

      {/* Image Section */}
      <div className='relative'>
        <div className="w-full h-32 overflow-hidden flex justify-center items-center relative bg-gray-300">
          <img className="h-full w-full object-cover" src={image} alt={title} />
        </div>

        <div className='absolute z-10 right-2 -bottom-2.5 p-1 bg-[var(--primary-color)] rounded-full flex justify-center items-center'>
          <FaPlay className='text-white text-2xl p-1 md:text-xl' />
        </div>
      </div>


      {/* Title Section */}
      <div className="title font-semibold text-sm p-2 mt-2.5 font-roboto line-clamp-2">
        <span>{title}</span>
      </div>
    </div>
  )
}
