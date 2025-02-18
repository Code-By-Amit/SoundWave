import React from 'react'
import { PlaylistCard } from '../components/UI/PlaylistCard'
import { useNavigate } from 'react-router-dom'
import { fetchAllPlaylist } from '../apis/playlistApi';
import { useQuery } from '@tanstack/react-query';
import { Loader } from '../components/UI/Loader';

export const AllPlaylist = () => {
    const navigate = useNavigate()
    // Fetch Playlists
    const { data: playlists, isLoading: loadingPlaylists, isError: errorPlaylists } = useQuery({
        queryKey: ["allPlaylist"],
        queryFn: fetchAllPlaylist
    });

    if (loadingPlaylists) return <div className='w-full h-full flex justify-center items-center'><Loader /></div>
    if (errorPlaylists) return <div className='w-full h-full flex justify-center items-center'> <Error errors={[errorPlaylists]} /> </div>

    return (
        <>
            {/* Playlist Card  */}
            <div className="Playlist p-4">

                <button onClick={() => navigate(-1)} className="mx-5 my-5 flex items-center gap-2 bg-white px-2.5 py-1.5 md:px-4 md:py-2 rounded-full text-sm md:text-base shadow-md  hover:bg-gray-100 dark:hover:bg-gray-500 active:bg-gray-200 dark:bg-gray-600 transition-all" aria-label="Go back">
                    {/* Left Arrow SVG */}
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-700 dark:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                    </svg>
                    <span className="text-gray-700 font-medium dark:text-white">Go Back</span>
                </button>


                <h1 className='font-bold text-2xl my-5 mx-4 dark:text-white'>Playlist</h1>
                <div className='playlist flex max-w-full flex-wrap  gap-2 md:gap-4 items-center  justify-center md:justify-start  md:p-4'>
                    {
                        playlists.map((playlist) => {
                            return <PlaylistCard key={playlist._id} songsLength={playlist.songs.length} imgSrc={playlist.image} title={playlist.name} />
                        })
                    }
                </div>
            </div >

        </>
    )
}
