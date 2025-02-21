import React from 'react'
import { ArtistCard } from '../components/UI/ArtistCard'
import { useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { fetchAllArtist } from '../apis/artistApi'
import { Loader } from '../components/UI/Loader'

export const AllArtist = () => {

    const { data: artists, isLoading: loadingArtist, isError: errorArtist } = useQuery({
        queryKey: ["allArtist"],
        queryFn: fetchAllArtist,
        staleTime: 60 * 60 * 1000,  // 1 hour → Data remains fresh for 1 hour
        cacheTime: 2 * 60 * 60 * 1000, // 2 hours → Keep cached data for 2 hours
        refetchOnWindowFocus: false, // No unnecessary refetching when switching tabs
        refetchOnReconnect: false, // No refetching when network reconnects
        keepPreviousData: true, // Keep old data while fetching new data
    });

    if (loadingArtist) return <div className='w-full h-full flex justify-center items-center'><Loader /></div>
    if (errorArtist) return <div className='w-full h-full flex justify-center items-center'> <Error errors={[errorArtist]} /> </div>

    let navigate = useNavigate()
    return (
        <>

            {/* Artist's Cards  */}
            <div className="Artist my-4">

                <button onClick={() => navigate(-1)} className="mx-5 my-5 flex items-center gap-2 bg-white px-2.5 py-1.5 md:px-4 md:py-2 rounded-full text-sm md:text-base shadow-md  hover:bg-gray-100 dark:hover:bg-gray-500 active:bg-gray-200 dark:bg-gray-600 transition-all" aria-label="Go back">
                    {/* Left Arrow SVG */}
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-700 dark:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                    </svg>
                    <span className="text-gray-700 font-medium dark:text-white">Go Back</span>
                </button>

                <div className="flex justify-between px-3 items-center">
                    <h1 className="font-bold text-2xl mx-4 dark:text-white">Artists</h1>
                </div>

                {/* Enable horizontal scroll */}
                <div className="space-x-4 flex flex-wrap max-w-full items-center p-4 justify-center md:justify-start">
                    {
                        artists.map((artist) => <ArtistCard key={artist._id} id={artist._id} imgSrc={artist.image} name={artist.name} />)
                    }
                </div>
            </div>
        </>
    )
}
