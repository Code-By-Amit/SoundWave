import React from 'react'
import { FaPlay } from "react-icons/fa6";
import { useSong } from '../../context/SongContext';
import { FaPause } from 'react-icons/fa';

export const SongCard = ({ song ,setCurrentSongHandler}) => {
  const { setCurrentSong, currentSong, isPlaying } = useSong()

  return (
    <div onClick={setCurrentSongHandler} className="card w-25 min-h-40 md:w-34 md:min-w-[8rem] md:min-h-50 group rounded-lg hover:scale-105 transition ease-in-out duration-200 group overflow-hidden shrink-0">

      {/* Image Section */}
      <div className='relative group '>
        <div className="w-full h-25 md:w-full md:h-32 overflow-hidden flex justify-center items-center relative bg-gray-300">
          <img className="h-full w-full object-cover object-center transform transition-all duration-300 group-hover:scale-105" src={song.image} alt={song.title} />
        </div>

        <div className="absolute -bottom-2.5 right-2 p-1 bg-[var(--primary-color)] rounded-full flex justify-center items-center opacity-0 transform translate-y-3 group-hover:opacity-300 group-hover:translate-y-0 transition-all duration-200 ease-in-out z-10">
          {song?._id == currentSong?._id ? <FaPause className='text-white text-2xl p-1 md:text-xl' /> : <FaPlay className='text-white text-2xl p-1 md:text-xl' />}
        </div>

      </div>


      {/* Title Section */}
      <div className="title group p-2 mt-1 text-gray-800 dark:text-white ">
        <span className='font-bold text-sm group font-roboto line-clamp-2'>{song.title}</span>
      </div>
    </div>
  )
}
