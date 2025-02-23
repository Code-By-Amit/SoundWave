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

      </div>
    </>
  )
}
