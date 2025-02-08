import React from 'react'
import { PlaylistCard } from '../components/UI/PlaylistCard'
import { NavLink } from 'react-router-dom'
import { MdFileUpload, MdOutlineCreateNewFolder } from 'react-icons/md'
import { IoCreate, IoCreateOutline } from 'react-icons/io5'

export const Playlist = () => {
  return (
    <>
      < div className="Playlist my-4 flex flex-col gap-5" >

        {/* Saved Playlists  */}
        <div>
          <div className='flex justify-between px-3 items-center'>
            <h1 className='font-bold text-2xl mx-4 dark:text-white'>Saved Playlist</h1>
          </div>

          <div className='playlist flex flex-nowrap  gap-4 items-center justify-start p-4'>
            <PlaylistCard imgSrc="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTTcOlodFZ-BbjcvK_kTkhO4G6a38b7QP6-Q&s" title="My Playlist" />
            <PlaylistCard imgSrc="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTTcOlodFZ-BbjcvK_kTkhO4G6a38b7QP6-Q&s" title="My Playlist" />
            <PlaylistCard imgSrc="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTTcOlodFZ-BbjcvK_kTkhO4G6a38b7QP6-Q&s" title="My Playlist" />
            <PlaylistCard imgSrc="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTTcOlodFZ-BbjcvK_kTkhO4G6a38b7QP6-Q&s" title="My Playlist" />
          </div>
        </div>


        {/* Your Playlists  */}
        <div>
          <div className='flex justify-between px-3 items-center'>
            <h1 className='font-bold text-2xl mx-4 dark:text-white'>Your Playlist</h1>
          </div>

          <div className='playlist flex flex-wrap  gap-4 items-center justify-start p-4'>
            <PlaylistCard imgSrc="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTTcOlodFZ-BbjcvK_kTkhO4G6a38b7QP6-Q&s" title="My Playlist" />
            <PlaylistCard imgSrc="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTTcOlodFZ-BbjcvK_kTkhO4G6a38b7QP6-Q&s" title="My Playlist" />
            <PlaylistCard imgSrc="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTTcOlodFZ-BbjcvK_kTkhO4G6a38b7QP6-Q&s" title="My Playlist" />
            <PlaylistCard imgSrc="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTTcOlodFZ-BbjcvK_kTkhO4G6a38b7QP6-Q&s" title="My Playlist" />
          </div>
        </div>

        <div className=' mx-7 mb-19'>
          <button className='text-white rounded shadow-md py-2.5 px-3 text-base md:text-md font-semibold bg-[var(--primary-color)] flex items-center gap-3 hover:opacity-75 active:opacity-75'>
            <MdOutlineCreateNewFolder className='text-2xl md:text-3xl' />
            Create a Playlist
          </button>
        </div>
      </div >
    </>
  )
}
