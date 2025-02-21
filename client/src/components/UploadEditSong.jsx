import { useMutation, useQueries, useQuery } from '@tanstack/react-query'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { uploadSong } from '../apis/SongApi'
import { LoadingDots } from './LoadingDots'
import { LuChevronsUpDown } from "react-icons/lu"
import { fetchArtistNameAndID } from '../apis/artistApi'
import { Link, useNavigate } from 'react-router-dom'



export const UploadEditSong = () => {
    const [song, setSong] = useState(null)
    const [title, setTitle] = useState("")
    const [image, setImage] = useState(null)
    const [duration, setDuration] = useState(0);

    const [searchTerm, setSearchTerm] = useState("");
    const [selectedArtistID, setSelectedArtistID] = useState(null);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const navigate = useNavigate()

    const mutation = useMutation({
        mutationKey: ['uploadSong'],
        mutationFn: (data) => uploadSong(data),
        onSuccess: () => {
            toast.success("Song Uploaded")
            setSong(null)
            setTitle('')
            setImage(null)
            setDuration(0)
        },
        onError: (error) => {
            toast.error(`Error: ${error.message}`)
            setSong(null)
            setTitle('')
            setImage(null)
            setDuration(0)
        }
    })

    const formatTime = (time) => {
        if (isNaN(time) || time === Infinity) return "0:00";
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    };

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!song || !title) {
            toast.error("Please provide all required fields!");
            return;
        }
        const audioUrl = URL.createObjectURL(song);
        const audio = new Audio(audioUrl);
        audio.addEventListener('loadedmetadata', () => {
            const durationInSeconds = audio.duration;
            const formattedDuration = formatTime(durationInSeconds);

            const formData = new FormData();
            formData.append('image', image);
            formData.append('song', song);
            formData.append('title', title);
            formData.append('duration', formattedDuration);
            if (selectedArtistID) {
                formData.append('aritst', selectedArtistID);
            }
            console.log([...formData.entries()]);

            // mutation.mutate(formData);

            URL.revokeObjectURL(audioUrl);
        });
    }

    const { data } = useQuery({
        queryKey: ['artistSelection', searchTerm],
        queryFn: () => fetchArtistNameAndID(searchTerm),
        enabled: !!searchTerm,
        staleTime: 60 * 60 * 1000,  // 1 hour → Data remains fresh for 1 hour
        cacheTime: 2 * 60 * 60 * 1000, // 12 hours → Keep cached data for 2 hours
        refetchOnWindowFocus: false, // No unnecessary refetching when switching tabs
        refetchOnReconnect: false, // No refetching when network reconnects
        keepPreviousData: true, // Keep old data while fetching new data
    })
    const artists = data?.artists || []



    const handleSongChange = (event) => setSong(event.target.files[0]);
    const handleImageChange = (event) => setImage(event.target.files[0]);

    return (
        <>
            <button onClick={() => navigate(-1)} className="mx-5 my-5 flex items-center gap-2 bg-white px-2.5 py-1.5 md:px-4 md:py-2 rounded-full text-sm md:text-base shadow-md  hover:bg-gray-100 dark:hover:bg-gray-500 active:bg-gray-200 dark:bg-gray-600 transition-all" aria-label="Go back">
                {/* Left Arrow SVG */}
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-700 dark:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
                <span className="text-gray-700 font-medium dark:text-white">Go Back</span>
            </button>

            <h1 className='text-center text-xl mt-10 font-semibold my-3 dark:text-white'>Upload Your Song</h1>
            <div className="max-w-md mx-auto mt-3 bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg mb-20">
                <form className="space-y-3 md:space-y-6" onSubmit={handleSubmit}>
                    {/* <!-- File Input --> */}
                    <div className='flex md:block gap-4 md:space-y-6'>

                        <div className="flex flex-col">
                            <label htmlFor="songImage" className="text-sm font-medium text-gray-700 dark:text-white mb-2">Song Image</label>
                            <input
                                type="file"
                                name='songImage'
                                onChange={handleImageChange}
                                accept='image/*'
                                className="block w-full p-1 md:p-2 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-300 dark:bg-gray-700 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>

                        <div className="flex flex-col">
                            <label htmlFor="song" className="text-sm font-medium text-gray-700 dark:text-white mb-2">Song</label>
                            <input
                                type="file"
                                name='song'
                                onChange={handleSongChange}
                                accept='audio/*'
                                className="block w-full p-1 md:p-2 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-300 dark:bg-gray-700 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                    </div>

                    {/* Selecting Artist ComboBox  */}
                    <div className="relative w-full">
                        {/* Input Field */}
                        <div className='flex flex-col'>
                            <label htmlFor="artist" className="text-sm font-medium text-gray-700 dark:text-white mb-2">Select Artist</label>
                            <div className='relative flex items-center'>

                                <input
                                    type="text"
                                    value={searchTerm}
                                    id='artist'
                                    onChange={(e) => {
                                        setSearchTerm(e.target.value);
                                        setIsDropdownOpen(true);
                                    }}
                                    autoComplete='off'
                                    onFocus={() => setIsDropdownOpen(true)}
                                    placeholder="Select a Artist..."
                                    className="w-full px-4 py-1 md:py-2 text-gray-900 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                                <LuChevronsUpDown onClick={() => setIsDropdownOpen(!isDropdownOpen)} className='absolute right-4 text-gray-700 dark:text-white' />
                            </div>
                        </div>

                        {/* Dropdown List */}
                        {isDropdownOpen && (
                            <div className="absolute z-50 w-full max-h-60 mt-1 p-1 bg-white border dark:bg-gray-700 border-gray-300 rounded-lg overflow-y-auto shadow-lg">
                                <div
                                    className="cursor-pointer p-1 md:p-2 px-4 text-sm dark:text-gray-200 text-gray-800 dark:bg-gray-700  hover:bg-gray-600 rounded-lg"
                                    onClick={() => {
                                        setSelectedArtistID(null);
                                        setIsDropdownOpen(false);
                                        setSearchTerm('Unknown')
                                    }}
                                >
                                    Unknown
                                </div>
                                {artists.length > 0 ? (
                                    artists.map((artist) => (
                                        <div
                                            key={artist._id}
                                            className="cursor-pointer py-1 md:py-2 px-4 text-sm dark:text-gray-200 text-gray-800 dark:bg-gray-700  hover:bg-gray-600 rounded-lg"
                                            onClick={() => {
                                                setSelectedArtistID(artist._id);
                                                setSearchTerm(artist.name);
                                                setIsDropdownOpen(false);
                                            }}
                                        >
                                            {artist.name}
                                        </div>
                                    ))
                                ) : (
                                    <div className="p-2 text-gray-500 dark:text-gray-200">No results found</div>
                                )}
                            </div>
                        )}
                    </div>
                    {/* <!-- Song Name Input --> */}
                    <div className="flex flex-col">
                        <label htmlFor="name" className="text-sm font-medium text-gray-700 dark:text-white mb-2">Song Name</label>
                        <input
                            type="text"
                            id="name"
                            placeholder="Enter Song name"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full px-4 py-1 md:py-2 text-gray-900 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            required
                        />
                    </div>
                    <p className='text-xs text-gray-500 text-center'>Note: Select from admin-approved artists. 
                        <p>
                        Need one? 
                        <Link to='/request-form' className='underline text-blue-600'> Request here</Link>.
                        </p>
                    </p>


                    <button
                        type="submit"
                        disabled={mutation.isLoading}
                        className={`w-full py-1 md:py-2 px-4 ${mutation.isLoading ? 'opacity-70' : ''} bg-[var(--primary-color)] hover:opacity-80 text-white font-semibold rounded-lg shadow-md transition-all`}
                    >
                        {mutation.isPending ? (<>Uploading<LoadingDots /></>) : "Upload Song"}
                    </button>
                </form>
            </div>
        </>
    )
}
