import { useMutation, useQueryClient } from '@tanstack/react-query'
import React, { useRef, useState } from 'react'
import { createPlaylist } from '../apis/playlistApi'
import toast from 'react-hot-toast'
import { LoadingDots } from './LoadingDots'
import { useNavigate } from 'react-router-dom'

export const CreateEditPlaylist = () => {
    const [coverImage, setCoverImage] = useState(null)
    const [playlistName, setPlaylistName] = useState("")
    const [isPrivate, setIsPrivate] = useState(false)
    const navigate = useNavigate()
    const queryClient = useQueryClient()
    const [token, setToken] = useState(localStorage.getItem('token') || null)

    const imageInputRef = useRef(null)

    const mutation = useMutation({
        mutationKey: ['createPlaylist'],
        mutationFn: ({ data, token }) => createPlaylist(data, token),
        onSuccess: () => {
            toast.success("Playlist Created")
            setCoverImage(null)
            setPlaylistName("")
            setIsPrivate(false)
            if (imageInputRef.current) {
                imageInputRef.current.value = ""
            }
            queryClient.invalidateQueries(['user-Created/Saved-Playlist'])
        },
        onError: (error) => {
            toast.error(`Error: ${error.message}`)
            setCoverImage(null)
            setPlaylistName("")
            setIsPrivate(false)
            if (imageInputRef.current) {
                imageInputRef.current.value = ""
            }
        }
    })

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!coverImage || !playlistName) {
            toast.error("Please provide all required fields!");
            return;
        }

        const formData = new FormData();
        formData.append('image', coverImage); // This must match 'image' in upload.single('image')
        formData.append('name', playlistName.trim());
        formData.append('isPrivate', isPrivate);

        mutation.mutate({ formData, token })
    }

    const handleFileChange = (event) => {
        const file = event.target.files[0]
        if (file) {
            setCoverImage(file)
        }
    }

    return (
        <>
            <button onClick={() => navigate(-1)} className="mx-5 my-5 flex items-center gap-2 bg-white px-2.5 py-1.5 md:px-4 md:py-2 rounded-full text-sm md:text-base shadow-md  hover:bg-gray-100 dark:hover:bg-gray-500 active:bg-gray-200 dark:bg-gray-600 transition-all" aria-label="Go back">
                {/* Left Arrow SVG */}
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-700 dark:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
                <span className="text-gray-700 font-medium dark:text-white">Go Back</span>
            </button>
            <h1 className='text-center text-xl mt-10 dark:text-white font-semibold my-3'>Create Your Playlist</h1>
            <div className="max-w-md mx-auto mt-3 bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg">
                <form className="space-y-6" onSubmit={handleSubmit}>
                    {/* <!-- File Input --> */}
                    <div className="flex flex-col">
                        <label htmlFor="playlistImage" className="text-sm font-medium text-gray-700 dark:text-white mb-2">Playlist Image</label>
                        <input
                            type="file"
                            id="playlistImage"
                            name='image'
                            ref={imageInputRef}
                            onChange={handleFileChange}
                            className="block w-full text-sm p-1 md:p-2 text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-300 dark:bg-gray-700 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    {/* <!-- Playlist Name Input --> */}
                    <div className="flex flex-col">
                        <label htmlFor="playlistName" className="text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">Playlist Name</label>
                        <input
                            type="text"
                            id="playlistName"
                            placeholder="Enter playlist name"
                            value={playlistName}
                            onChange={(e) => setPlaylistName(e.target.value)}
                            className="w-full px-4 py-1 md:py-2 text-gray-900 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            required
                        />
                    </div>


                    <div className="flex items-center justify-between">
                        <label className="inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                checked={isPrivate}
                                onChange={(e) => setIsPrivate(e.target.checked)}
                                className="sr-only peer"
                            />
                            <div
                                className="relative w-9 h-5 md:w-11 md:h-6 bg-gray-200 peer-focus:outline-none 
                                            peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-[var(--primary-color)] 
                                            rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full 
                                            rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white 
                                            after:content-[''] after:absolute after:top-[2px] after:start-[2px] 
                                            after:bg-white after:border-gray-300 after:border after:rounded-full 
                                            after:h-4 after:w-4 md:after:h-5 md:after:w-5 after:transition-all 
                                            dark:border-gray-600 peer-checked:bg-[var(--primary-color)] 
                                            dark:peer-checked:bg-[var(--primary-color)]"
                            ></div>
                            <div className="ms-2 md:ms-3 text-xs md:text-sm font-medium text-gray-900 dark:text-gray-300">
                                is Private
                            </div>
                        </label>
                    </div>



                    <button
                        type="submit"
                        className="w-full py-1 md:py-2 px-4 bg-[var(--primary-color)] hover:opacity-80 text-white font-semibold rounded-lg shadow-md focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800 transition-all"
                    >
                        {mutation.isPending ? (<> Creating Playlist<LoadingDots /></>) : "Create Playlist"}
                    </button>
                </form>
            </div>
        </>
    )
}
