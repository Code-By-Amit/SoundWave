import React from 'react'
import { IoSearch } from "react-icons/io5";
import { SongCard } from '../components/UI/SongCard';
import { PlaylistCard } from '../components/UI/PlaylistCard';

export const Home = () => {
  return (
    <>
      {/* Main Content Area */}
      <div className=" w-full bg-gray-100 dark:bg-gray-800 p-1.5 overflow-auto">


        <div className="flex items-center justify-between px-4 py-3 rounded-md bg-white dark:border-gray-700  dark:bg-gray-900">
          {/* Search Input */}
          <div className="flex-1 max-w-md relative  hidden sm:block">
            <input
              className="w-full py-2 px-4 bg-white dark:bg-gray-700 text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 border border-gray-300 dark:border-gray-600 outline-none rounded-md focus:ring-2 focus:ring-cyan-400 transition-all"
              type="text"
              placeholder="Search..."
            /> <IoSearch className='absolute top-3 right-3 text-white text-xl' />
          </div>

          <div className="flex items-center gap-1 sm:hidden text-lg">
            <img className={`dark:invert w-10 transition-all duration-300 `} src="/logo.png" alt="Logo" />
            <span className={`font-bold transition-all text-md duration-300 dark:bg-[var(--primary-color)]`}> SoundWave </span>
          </div>

          {/* Login Button */}
          <div className="ml-4">
            <button className="px-3 py-1.5 bg-[var(--primary-color)] text-sm text-white font-semibold md:font-bold rounded-full transition-all hover:bg-cyan-600 focus:ring-2 focus:ring-cyan-400">
              Login
            </button>
          </div>
        </div>

        {/* Songs Cards  */}
        <div className="Songs my-4">
          <h1 className='font-bold text-2xl mx-4'>Top Songs</h1>
          <div className='songscards flex  overflow-x-auto flex-nowrap  items-center justify-start gap-4 p-4'>
            <SongCard
              imgSrc="https://c.saavncdn.com/527/My-Name-Is-Khan-Hindi-2010-20190617160533-500x500.jpg"
              title='Sajdaa (From "My Name Is Khan")'
            />
            <SongCard
              imgSrc="https://i.scdn.co/image/ab67616d0000b27344aa56e23e3a89802e6c6347"
              title='Dildara (Stand By me)'
            />
            <SongCard
              imgSrc="https://i.ytimg.com/vi/O8h4GU95aZA/maxresdefault.jpg"
              title='Mitwa'
            />
            <SongCard
              imgSrc="https://res.cloudinary.com/dk6waforl/image/upload/v1722673827/apna-bana-le-lyrics_hcp6le.webp"
              title='Aapna Banale Piya tu jo sath merer to ye jaha so lage muje'
            />
          </div>
        </div>

      {/* Playlist Card  */}
      <div className="Playlist my-4">
          <h1 className='font-bold text-2xl mx-4'>Top Playlist</h1>
          <div className='playlist flex  overflow-x-auto flex-nowrap  items-center justify-start gap-4 p-4'>
            <PlaylistCard imageSrc="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTTcOlodFZ-BbjcvK_kTkhO4G6a38b7QP6-Q&s" title="My Playlist"/>
          </div>
        </div>

      </div>
    </>
  )
}
