import { useMutation } from '@tanstack/react-query'
import React, { useState } from 'react'
import { createPlaylist } from '../apis/playlistApi'
import toast from 'react-hot-toast'
import { LoadingDots } from './LoadingDots'

export const CreateEditPlaylist = () => {
    const [coverImage, setCoverImage] = useState(null)
    const [playlistName, setPlaylistName] = useState()
    const [isPrivate, setIsPrivate] = useState(false)

    const mutation = useMutation({
        mutationKey: ['createPlaylist'],
        mutationFn: (data) => createPlaylist(data),
        onSuccess: () => {
            toast.success("Playlist Created")
            setCoverImage(null)
            setPlaylistName(null)
            setIsPrivate(false)
        },
        onError: (error) => {
            toast.error(`Error: ${error.message}`)
            setCoverImage(null)
            setPlaylistName(null)
            setIsPrivate(false)
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
        formData.append('name', playlistName);
        formData.append('isPrivate', isPrivate);

        mutation.mutate(formData)
    }

    const handleFileChange = (event) => {
        const file = event.target.files[0]
        if (file) {
            setCoverImage(file)
        }
    }

    return (
        <>
            <h1 className='text-center text-xl mt-10 font-semibold my-3'>Create Your Playlist</h1>
            <div className="max-w-md mx-auto mt-3 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
                <form className="space-y-6" onSubmit={handleSubmit}>
                    {/* <!-- File Input --> */}
                    <div className="flex flex-col">
                        <label htmlFor="playlistImage" className="text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">Playlist Image</label>
                        <input
                            type="file"
                            id="playlistImage"
                            name='image'
                            onChange={handleFileChange}
                            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-300 dark:bg-gray-700 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
                            className="w-full px-4 py-2 text-gray-900 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            required
                        />
                    </div>


                    <div className="flex items-center justify-between">
                        <label className="inline-flex items-center cursor-pointer">
                            <input type="checkbox" checked={isPrivate} onChange={(e) => setIsPrivate(e.target.checked)} className="sr-only peer" />
                            <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-[var(--primary-color)] rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[var(--primary-color)] dark:peer-checked:bg-[var(--primary-color)]"></div>
                            <div className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">is Private</div>
                        </label>
                    </div>


                    <button
                        type="submit"
                        className="w-full py-2 px-4 bg-[var(--primary-color)] hover:opacity-80 text-white font-semibold rounded-lg shadow-md focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800 transition-all"
                    >
                        {mutation.isPending ? (<> Creating Playlist<LoadingDots /></>) : "Create Playlist"}
                    </button>
                </form>
            </div>
        </>
    )
}
