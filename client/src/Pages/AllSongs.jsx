import React from 'react'
import { SongBar } from '../components/UI/SongBar'
import { useNavigate } from 'react-router-dom'
import { fetchSong } from '../apis/SongApi'
import { useQuery } from '@tanstack/react-query'
import { useSong } from '../context/SongContext'
import { Loader } from '../components/UI/Loader'

export const AllSongs = () => {
    let navigate = useNavigate()
    const { playSong } = useSong()

    const { data: songs, isError, isLoading, error } = useQuery({
        queryKey: ['allSongs'],
        queryFn: fetchSong,
        staleTime: 60 * 60 * 1000,  // 1 hour → Data remains fresh for 1 hour
        cacheTime: 2 * 60 * 60 * 1000, // 2 hours → Keep cached data for 2 hours
        refetchOnWindowFocus: false, // No unnecessary refetching when switching tabs
        refetchOnReconnect: false, // No refetching when network reconnects
        keepPreviousData: true, // Keep old data while fetching new data
    })

    const setSongHandler = (song) => {
        if (songs) {
            playSong(song, songs)
        }
    }

    if (isLoading) return <div className='w-full h-full flex justify-center items-center'><Loader /></div>
    if (isError) return <div className='w-full h-full flex justify-center items-center'> <Error errors={[error]} /> </div>
    return (
        <div className="songs p-4 pb-25">

            <button onClick={() => navigate(-1)} className="md:mx-5 my-3 mb-5 md:my-5 flex items-center gap-2 bg-white px-2.5 py-1.5 md:px-4 md:py-2 rounded-full text-sm md:text-base shadow-md  hover:bg-gray-100 dark:hover:bg-gray-500 active:bg-gray-200 dark:bg-gray-600 transition-all" aria-label="Go back">
                {/* Left Arrow SVG */}
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-700 dark:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
                <span className="text-gray-700 font-medium dark:text-white">Go Back</span>
            </button>

            <h1 className="text-xl md:text-2xl font-bold my-2 mx-2 dark:text-white">All Songs</h1>


            {songs.map((song) => {
                return <SongBar key={song._id} song={song} setSongHandler={setSongHandler} />
            })}
        </div>
    )
}
