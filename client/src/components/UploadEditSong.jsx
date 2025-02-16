import { useMutation } from '@tanstack/react-query'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { uploadSong } from '../apis/SongApi'
import { LoadingDots } from './LoadingDots'

export const UploadEditSong = () => {
    const [song, setSong] = useState(null)
    const [title, setTitle] = useState()
    const [image, setImage] = useState(null)
    const [duration,setDuration] = useState(0);

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
        const audio = new Audio(URL.createObjectURL(song));
        audio.addEventListener('loadedmetadata', () => {
            const durationInSeconds = audio.duration;
            const formattedDuration = formatTime(durationInSeconds);
    
            const formData = new FormData();
            formData.append('image', image);
            formData.append('song', song);
            formData.append('title', title);
            formData.append('duration', formattedDuration);
    
            mutation.mutate(formData);
        });
    }

    const handleSongChange = (event) => setSong(event.target.files[0]);
    const handleImageChange = (event) => setImage(event.target.files[0]);

    return (
        <>
            <h1 className='text-center text-xl mt-10 font-semibold my-3'>Upload Your Song</h1>
            <div className="max-w-md mx-auto mt-3 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
                <form className="space-y-6" onSubmit={handleSubmit}>
                    {/* <!-- File Input --> */}
                    <div className="flex flex-col">
                        <label htmlFor="songImage" className="text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">Song Image</label>
                        <input
                            type="file"
                            name='songImage'
                            onChange={handleImageChange}
                            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-300 dark:bg-gray-700 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="song" className="text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">Song</label>
                        <input
                            type="file"
                            name='song'
                            onChange={handleSongChange}
                            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-300 dark:bg-gray-700 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    {/* <!-- Playlist Name Input --> */}
                    <div className="flex flex-col">
                        <label htmlFor="playlistName" className="text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">Song Name</label>
                        <input
                            type="text"
                            id="playlistName"
                            placeholder="Enter Song name"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full px-4 py-2 text-gray-900 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            required
                        />
                    </div>


                    <button
                        type="submit"
                        disabled={mutation.isLoading}
                        className={`w-full py-2 px-4 ${mutation.isLoading ? 'opacity-70' : ''} bg-[var(--primary-color)] hover:opacity-80 text-white font-semibold rounded-lg shadow-md transition-all`}
                    >
                        {mutation.isPending ? ( <>Uploading<LoadingDots /></>) : "Upload Song"}
                    </button>
                </form>
            </div>
        </>
    )
}
