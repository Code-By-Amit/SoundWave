import React from 'react'
import { FaPlay  } from "react-icons/fa6";

export const SongCard = ({ title, imgSrc }) => {
  return (
    <div className="card w-34 min-w-[8rem] min-h-50 group bg-white rounded-lg hover:scale-105 transition ease-in-out duration-200 hover:shadow-md dark:bg-[#141e32] hover:bg-gray-50 dark:hover:bg-[#1c2944] shadow group overflow-hidden shrink-0">

      {/* Image Section */}
      <div className='relative group '>
        <div className="w-full h-32 overflow-hidden flex justify-center items-center relative bg-gray-300">
          <img className="h-full w-full object-cover transform transition-all duration-300 group-hover:scale-105" src={imgSrc} alt={title} />
        </div>

        <div className="absolute -bottom-2.5 right-2 p-1 bg-[var(--primary-color)] rounded-full flex justify-center items-center opacity-0 transform translate-y-3 group-hover:opacity-300 group-hover:translate-y-0 transition-all duration-200 ease-in-out z-10">
          <FaPlay className='text-white text-2xl p-1 md:text-xl' />
        </div>
      </div>


      {/* Title Section */}
      <div className="title group p-2 mt-1 dark:text-white ">
        <span className='font-semibold text-sm group font-roboto line-clamp-2'>{title}</span>
      </div>
    </div>
  )
}
