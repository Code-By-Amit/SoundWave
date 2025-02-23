import React, { useState } from 'react'
import { FaHeart } from 'react-icons/fa'
import { fetchFavourates } from '../apis/SongApi'
import { useQuery } from '@tanstack/react-query'
import { SongBar } from '../components/UI/SongBar'
import { useSong } from '../context/SongContext'
import { Loader } from '../components/UI/Loader'

export const Favourates = () => {
  const [token, setToken] = useState(localStorage.getItem('token') || false)
  const { playSong } = useSong()

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['favourates'],
    queryFn: () => fetchFavourates(token),
    enabled: !!token,
    staleTime: 60 * 60 * 1000,  // 1 hour → Data remains fresh for 1 hour
    cacheTime: 2 * 60 * 60 * 1000, // 2 hours → Keep cached data for 2 hours
    refetchOnWindowFocus: false, // No unnecessary refetching when switching tabs
    refetchOnReconnect: false, // No refetching when network reconnects
    keepPreviousData: true, // Keep old data while fetching new data
  })

  
  if (isLoading) return <div className='w-full h-full flex justify-center items-center'><Loader /></div>
  if (isError) return <div className='w-full h-full flex justify-center items-center'> <Error errors={[error]} /> </div>

    const { songsLiked } = data;
  
  const setSongHandler = (song) => {
    if (songsLiked) {
      playSong(song, songsLiked)
    }
  }

  return (
    <>
      {/* Favourate Songs  */}
      <div className="songs min-h-96 p-3 pb-25">

        <h1 className="text-2xl font-bold  md:mx-7 my-4 dark:text-white">Favourate Songs</h1>
        {songsLiked.length === 0 && (<p className='dark:text-white text-center my-9 text-md'>No Favourate Song</p>)}
        {
          songsLiked.map(song => {
            return <SongBar key={song._id} song={song} setSongHandler={setSongHandler} />
          })
        }
        {/* 
        <div className="song shadow-md p-3 rounded flex mx-2 md:mx-4 mb-2 group hover:bg-[var(--primary-color)] transition ease-in-out duration-300 hover:shadow-2xl justify-between bg-white items-center space-x-4 dark:bg-gray-600 ">
          image and title
          <div className="flex items-center gap-3 w-1/2 sm:w-auto group flex-1 max-w-84">

            <img className="w-10 h-10 rounded-full ring-1 ring-offset-1 ring-[var(--primary-color)]" src="https://i.scdn.co/image/ab67616d0000b27344aa56e23e3a89802e6c6347" alt="Dildara (Stand by me)" />
            <div className="flex flex-col w-full h-full justify-start items-start text-sm ">
              <p className="font-bold line-clamp-1 text-gray-600 group-hover:text-white dark:text-white">Dildara (Stand by me)</p>
              <p className="line-clamp-1 text-gray-400 group-hover:text-white dark:text-white">Arizit Singh</p>
            </div>
          </div>
          <div className='flex items-center justify-between w-20 md:w-30 mx-3 md:mx-5'>
            <p className='dark:text-white px-3 text-gray-500'>3:44</p>
            <FaHeart className='text-red-600 cursor-pointer' />
          </div>
        </div> */}


      </div>
    </>
  )
}
