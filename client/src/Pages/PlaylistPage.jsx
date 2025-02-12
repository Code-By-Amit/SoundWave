import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { fetchPlaylistById } from '../apis/playlistApi'
import { SongBar } from '../components/UI/SongBar'

export const PlaylistPage = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const { data: playlist, isLoading, error, isError } = useQuery({
        queryKey: [`playlist/${id}`],
        queryFn: () => fetchPlaylistById(id),
        enabled: !!id
    })

    if (isLoading) return <div>Loading...........</div>
    if (isError) return <div>{error}...........</div>

    return (
        <>
            <button onClick={() => navigate(-1)} className="mx-5 absolute my-5 flex items-center gap-2 bg-white px-2.5 py-1.5 md:px-4 md:py-2 rounded-full text-sm md:text-base shadow-md  hover:bg-gray-100 dark:hover:bg-gray-500 active:bg-gray-200 dark:bg-gray-600 transition-all" aria-label="Go back">
                {/* Left Arrow SVG */}
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-700 dark:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
                <span className="text-gray-700 font-medium dark:text-white">Go Back</span>
            </button>

            <div className='p-4'>
                <div className='mx-auto w-60 mt-18 h-60 overflow-hidden rounded dark:shadow-black hover:scale-105 transition ease-in-out duration-300 shadow-2xl'>
                    <img className='w-full h-full object-cover ' src={playlist.image} alt="" />
                </div>
                <div className='text-center text-md my-4 font-semibold dark:text-white text-gray-800'>
                    <p>{playlist.name}</p>
                </div>

                {/* Top Songs  */}
                <div className="songs min-h-96">
                    <h1 className="text-2xl font-bold md:mx-4 my-2  dark:text-white">{playlist?.songs.length === 0 ? "No Songs" : "Songs"}</h1>
                    {/* Heading for songs  */}
                    <div className="song p-3 py-1  pr-1 rounded flex mx-2 md:mx-4 mb-1 transition ease-in-out duration-300 justify-between items-center space-x-4 ">
                    </div>
                    {
                        playlist.songs.map((song) => {
                            return <SongBar key={song._id} song={song} />
                        })
                    }
                </div>
            </div >
        </>
    )
}
