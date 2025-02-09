import React from 'react'
import { SongBar } from '../components/UI/SongBar'
import { useNavigate } from 'react-router-dom'
import { fetchSong } from '../apis/SongApi'
import { useQuery } from '@tanstack/react-query'

export const AllSongs = () => {
    let navigate = useNavigate()
    
    const {data,isError,isLoading,error} = useQuery({
        queryKey:['allSongs'],
        queryFn:fetchSong,
        staleTime:1000 * 60 * 15
    })

    const handleOnClick = () => {

    }

    if(isLoading) return <div>Loading.......</div>
    if(error) return <div>Error.......</div>
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
                <div className="flex sm:mr-1 md:*:mx-3 *:mx-1 text-gray-400  w-44 md:w-91 justify-between items-center text-xs sm:text-sm">
                    <p>Duration</p>
                    <p>Play's</p>
                    <p>Favourate</p>
                </div>
            </div>

            {data.map((song)=>{
                return <SongBar key={song._id} onClick={handleOnClick} imgSrc={song.image} title={song.title} artist="Arijit Singh" duration="3:12" noOfPlay="1434"/>
            })}
            {/* <SongBar imgSrc="https://i.scdn.co/image/ab67616d0000b27344aa56e23e3a89802e6c6347" title="Dildara(Stand By Me)" artist="Arijit Singh" duration="3:12" noOfPlay="1434" />
            <SongBar imgSrc="https://c.saavncdn.com/527/My-Name-Is-Khan-Hindi-2010-20190617160533-500x500.jpg" duration="5:03" title='Sajda (From "My Name is Khan")' noOfPlay="1201" />
            <SongBar imgSrc="https://i.scdn.co/image/ab67616d0000b27344aa56e23e3a89802e6c6347" duration="3:33" title="Dildara (Stand By me)" noOfPlay="1101" />
            <SongBar imgSrc="https://i.ytimg.com/vi/O8h4GU95aZA/maxresdefault.jpg" duration="4:43" title="Mitwa" noOfPlay="1233201" artist="Shafqat Amanat Ali" />
            <SongBar imgSrc="https://res.cloudinary.com/dk6waforl/image/upload/v1722673827/apna-bana-le-lyrics_hcp6le.webp" duration="3:12" title="Aapna Banale Piya tu jo sath merer to ye jaha so lage muje" noOfPlay="9201" artist="Arijit Sing" /> */}
        </div>
    )
}
