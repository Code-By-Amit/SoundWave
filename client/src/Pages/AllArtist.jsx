import React from 'react'
import { ArtistCard } from '../components/UI/ArtistCard'
import { SeeAllButton } from '../components/UI/SeeAllButton'
import { useNavigate } from 'react-router-dom'

export const AllArtist = () => {
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
                    <ArtistCard imgSrc="https://lastfm.freetls.fastly.net/i/u/ar0/ad7e05685bef8909f27c0d95bf79425c.jpg" name="Arijit Singh" />
                    <ArtistCard imgSrc="https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcT1TTQyxyfeUJ936sqEsO65oAjq2yKqAh9APswkZyzR3ie0hewtz8r3ZsLq3hdLjYgP2ac2tTvqeV2caa63MqpVKEDO3De_d9Cz0KEA2Q" name="Atif Aslam" />
                    <ArtistCard imgSrc="https://c.ndtvimg.com/2022-08/2huc1t4_kishore-kumar_625x300_04_August_22.jpg" name="Kihsor Kumar" />
                    <ArtistCard imgSrc="https://c.ndtvimg.com/2022-08/2huc1t4_kishore-kumar_625x300_04_August_22.jpg" name="Kihsor Kumar" />
                    <ArtistCard imgSrc="https://c.ndtvimg.com/2022-08/2huc1t4_kishore-kumar_625x300_04_August_22.jpg" name="Kihsor Kumar" />
                    <ArtistCard imgSrc="https://c.ndtvimg.com/2022-08/2huc1t4_kishore-kumar_625x300_04_August_22.jpg" name="Kihsor Kumar" />
                    <ArtistCard imgSrc="https://c.ndtvimg.com/2022-08/2huc1t4_kishore-kumar_625x300_04_August_22.jpg" name="Kihsor Kumar" />
                    <ArtistCard imgSrc="https://c.ndtvimg.com/2022-08/2huc1t4_kishore-kumar_625x300_04_August_22.jpg" name="Kihsor Kumar" />
                    <ArtistCard imgSrc="https://c.ndtvimg.com/2022-08/2huc1t4_kishore-kumar_625x300_04_August_22.jpg" name="Kihsor Kumar" />
                    <ArtistCard imgSrc="https://c.ndtvimg.com/2022-08/2huc1t4_kishore-kumar_625x300_04_August_22.jpg" name="Kihsor Kumar" />
                    <ArtistCard imgSrc="https://c.ndtvimg.com/2022-08/2huc1t4_kishore-kumar_625x300_04_August_22.jpg" name="Kihsor Kumar" />
                    <ArtistCard imgSrc="https://c.ndtvimg.com/2022-08/2huc1t4_kishore-kumar_625x300_04_August_22.jpg" name="Kihsor Kumar" />
                    <ArtistCard imgSrc="https://c.ndtvimg.com/2022-08/2huc1t4_kishore-kumar_625x300_04_August_22.jpg" name="Kihsor Kumar" />
                    <ArtistCard imgSrc="https://c.ndtvimg.com/2022-08/2huc1t4_kishore-kumar_625x300_04_August_22.jpg" name="Kihsor Kumar" />
                </div>
            </div>
        </>
    )
}
