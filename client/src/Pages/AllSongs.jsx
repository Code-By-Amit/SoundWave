import React from 'react'
import { SongBar } from '../components/UI/SongBar'
import { useNavigate } from 'react-router-dom'
import { fetchSong } from '../apis/SongApi'
import { useQuery } from '@tanstack/react-query'
import { useSong } from '../context/SongContext'

export const AllSongs = () => {
    let navigate = useNavigate()
    const { playSong } = useSong()

    const { data:songs, isError, isLoading, error } = useQuery({
        queryKey: ['allSongs'],
        queryFn: fetchSong,
        staleTime: 1000 * 60 * 15
    })

    const setSongHandler = (song) => {
        if(songs){
          playSong(song,songs)
        }
      }

    if (isLoading) return <div>Loading.......</div>
    if (isError) return <div>Error.......</div>
    return (
        <div className="songs p-4">

            <button onClick={() => navigate(-1)} className="mx-5 my-5 flex items-center gap-2 bg-white px-2.5 py-1.5 md:px-4 md:py-2 rounded-full text-sm md:text-base shadow-md  hover:bg-gray-100 dark:hover:bg-gray-500 active:bg-gray-200 dark:bg-gray-600 transition-all" aria-label="Go back">
                {/* Left Arrow SVG */}
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-700 dark:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
                <span className="text-gray-700 font-medium dark:text-white">Go Back</span>
            </button>

            <h1 className="text-2xl font-bold my-2 mx-2 dark:text-white">Top Songs</h1>

            {/* Heading for songs  */}
            <div className="song p-3 py-1  pr-1 rounded flex mx-2 md:mx-4 mb-1 transition ease-in-out duration-300 justify-between items-center space-x-4 ">
                <p className="line-clamp-1 text-gray-400 text-md ">Track/Artist</p>
            </div>

            {songs.map((song) => {
                return <SongBar key={song._id} song={song} setSongHandler={setSongHandler} />
            })}
             </div>
    )
}
