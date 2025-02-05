import React from 'react'
import { IoSearch } from "react-icons/io5";
import { SongCard } from '../components/UI/SongCard';
import { PlaylistCard } from '../components/UI/PlaylistCard';
import { NavLink } from 'react-router-dom';
import { FaHeart } from 'react-icons/fa';
import { SongTable } from '../components/UI/SongTable/SongTable';

export const Home = () => {
  return (
    <>
      {/* Main Content Area */}
      <div className=" bg-gray-100 dark:bg-gray-800 p-1.5 overflow-auto">
      
        {/* Songs Cards  */}
        <div className="Songs my-4">
          <div className='flex justify-between px-3 items-center '>
            <h1 className='font-bold text-2xl mx-4 dark:text-white'>Top Songs</h1>
            <NavLink to="/songs" >
              <button className='text-gray-600 dark:text-gray-400 md:mx-4 hover:text-[var(--primary-color)] cursor-pointer'>View All</button>
            </NavLink>
          </div>
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
        <div className="Playlist my-4 mb-10">
          <div className='flex justify-between px-3 items-center'>
            <h1 className='font-bold text-2xl mx-4 dark:text-white'>Top Playlist</h1>
            <NavLink to="/playlist" >
              <button className='text-gray-600 mx-4 dark:text-gray-400 md:mx-4 hover:text-[var(--primary-color)] cursor-pointer'>View All</button>
            </NavLink>
          </div>
          <div className='playlist flex  overflow-x-auto flex-nowrap  items-center justify-start gap-4 p-4'>
            <PlaylistCard imgSrc="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTTcOlodFZ-BbjcvK_kTkhO4G6a38b7QP6-Q&s" title="My Playlist" />
            <PlaylistCard imgSrc="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTTcOlodFZ-BbjcvK_kTkhO4G6a38b7QP6-Q&s" title="My Playlist" />
            <PlaylistCard imgSrc="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTTcOlodFZ-BbjcvK_kTkhO4G6a38b7QP6-Q&s" title="My Playlist" />
            <PlaylistCard imgSrc="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTTcOlodFZ-BbjcvK_kTkhO4G6a38b7QP6-Q&s" title="My Playlist" />
            <PlaylistCard imgSrc="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTTcOlodFZ-BbjcvK_kTkhO4G6a38b7QP6-Q&s" title="My Playlist" />
            <PlaylistCard imgSrc="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTTcOlodFZ-BbjcvK_kTkhO4G6a38b7QP6-Q&s" title="My Playlist" />
            <PlaylistCard imgSrc="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTTcOlodFZ-BbjcvK_kTkhO4G6a38b7QP6-Q&s" title="My Playlist" />
            <PlaylistCard imgSrc="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTTcOlodFZ-BbjcvK_kTkhO4G6a38b7QP6-Q&s" title="My Playlist" />
          </div>
        </div>


        {/* Top Songs  */}
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <SongTable />
        </div>
      </div>
    </>
  )
}
