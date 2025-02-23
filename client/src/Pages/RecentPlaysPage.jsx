import { useQuery } from '@tanstack/react-query'
import React, { useState } from 'react'
import { FaHeart } from 'react-icons/fa'
import { getRecentPlays } from '../apis/SongApi'
import { SongBar } from '../components/UI/SongBar'
import { useSong } from '../context/SongContext'
import { Loader } from '../components/UI/Loader'

export const RecentPlaysPage = () => {
  const [token, setToken] = useState(localStorage.getItem('token') || null)
  const { playSong } = useSong()

  const { data:songs, isLoading, isError, error } = useQuery({
    queryKey: ['recentPlays'],
    queryFn: () => getRecentPlays(token),
    enabled: !!token,
  })

  const setSongHandler = (song) => {
    if(songs){
      playSong(song,songs)
    }
  }

  if (isLoading) return <div className='w-full h-full flex justify-center items-center'><Loader /></div>
  if (isError) return <div className='w-full h-full flex justify-center items-center'> <Error errors={[error]} /> </div>

  return (
    <>
      {/* Favourate Songs  */}
      <div className="songs min-h-96 p-3 pb-25">

        <h1 className="text-2xl font-bold  md:mx-7 my-4 dark:text-white">Recent play's</h1>

        {
          songs.map(song=>{
            return <SongBar key={song._id} song={song} setSongHandler={setSongHandler}/>
          })
        }

      </div>
    </>
  )
}

// return    <div className="song shadow-md p-3 rounded flex mx-2 md:mx-4 mb-2 group hover:bg-[var(--primary-color)] transition ease-in-out duration-300 hover:shadow-2xl justify-between bg-white items-center space-x-4 dark:bg-gray-600 ">
// {/* image and title */}
// <div className="flex items-center gap-3 w-1/2 sm:w-auto group flex-1 max-w-84">

//   <img className="w-10 h-10 rounded-full ring-1 ring-offset-1 ring-[var(--primary-color)]" src="https://i.scdn.co/image/ab67616d0000b27344aa56e23e3a89802e6c6347" alt="Dildara (Stand by me)" />
//   <div className="flex flex-col w-full h-full justify-start items-start text-sm ">
//     <p className="font-bold line-clamp-1 text-gray-600 group-hover:text-white dark:text-white">{song.name}</p>
//     {/* <p className="line-clamp-1 text-gray-400 group-hover:text-white dark:text-white"></p>  */}
//   </div>
// </div>
// <div className='flex items-center justify-between w-20 md:w-30 mx-3 md:mx-5'>
//   <p className='text-white px-3'>3:44</p> 
//   <FaHeart className='text-red-600 cursor-pointer' />
// </div>
// </div>