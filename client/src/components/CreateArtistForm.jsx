import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { LoadingDots } from './LoadingDots'
import { createArtist } from '../apis/artistApi'

export const CreateArtistForm = () => {
    const navigate = useNavigate()

    const [name, setName] = useState('')
    const [image, setImage] = useState(null)
    const [previewImg, setPreviewImg] = useState()
    const [token, setToken] = useState(localStorage.getItem('token') || null)

    const [errors, setErrors] = useState([])


    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const UrlObj = URL.createObjectURL(file)
            if (previewImg) {
                URL.revokeObjectURL(previewImg)
                setPreviewImg(null)
            }
            setPreviewImg(UrlObj)
            setImage(file)
        }
    }

    const handleCanceleUpload = () => {
        if (previewImg) {
            URL.revokeObjectURL(previewImg)
            setPreviewImg(null)
            setImage(null)
        }
    }

    const createArtistMutation = useMutation({
        mutationKey: ['createArtist'],
        mutationFn: ({formdata, token}) => createArtist(formdata, token),
        onSuccess: (data) => {
            toast.success(data.message)
            setName('')
            setImage(null)
        },
        onError: (error) => {
            const errorMessage = error.response?.data?.message || error.message || "Something went wrong!";
            toast.error(`Error: ${errorMessage}`);
        }
    })

    const validateForm = () => {
        let errors = [];

        if (name.length > 20) {
            errors.push(" Name length should not exceed 20 characters");
        }
        if (image === null) {
            errors.push("Please Upload Image of Artist.")
        }

        // Set Errors in State
        setErrors(errors);

        // Return whether form is valid
        return errors.length === 0;
    };


    const handleSubmit = (e) => {
        e.preventDefault()
        if (!validateForm()) return

        const formData = new FormData();
        formData.append('image', image);
        formData.append('name', name);
        console.log(name, image)
        console.log(formData.entries())

        createArtistMutation.mutate({formData, token})
    }

    return (
        <div>
            <button onClick={() => navigate(-1)} className="mx-5 my-5 flex items-center gap-2 bg-white px-2.5 py-1.5 md:px-4 md:py-2 rounded-full text-sm md:text-base shadow-md  hover:bg-gray-100 dark:hover:bg-gray-500 active:bg-gray-200 dark:bg-gray-600 transition-all" aria-label="Go back">
                {/* Left Arrow SVG */}
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-700 dark:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
                <span className="text-gray-700 font-medium dark:text-white">Go Back</span>
            </button>


            <h1 className='text-center text-xl md:text-3xl dark:text-gray-50 font-bold text-gray-800 my-2'>Create Artist.</h1>

            <div className="max-w-md mx-auto mt-3 bg-white dark:bg-gray-900 p-4 md:p-6 rounded-lg shadow-lg">
                <form className="space-y-3" onSubmit={handleSubmit}>

                    {/* <!-- File Input --> */}
                    <div className='m-2 w-30 md:w-48 mx-auto flex items-center flex-col'>
                        <img className='h-20 w-20 md:h-28 md:w-28 rounded-full mb-2 shadow-2xl' src={previewImg ? previewImg : '/default.webp'} alt="Profile" />
                        {previewImg ? <button onClick={handleCanceleUpload} className="cursor-pointer bg-slate-200 font-semibold px-4 py-2 my-4 rounded-lg w-full text-center" > Cancel </button>
                            : <label htmlFor="file-upload" className="cursor-pointer bg-slate-200 font-semibold px-3 py-1 md:px-4 md:py-2 my-4 rounded-lg w-full text-center" > Upload </label>}
                        <input id='file-upload' type="file" accept='image/*' className="hidden" name="image" onChange={handleFileChange} />
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="artistname" className="text-sm font-medium text-gray-700 dark:text-gray-200 mb-1 md:mb-2">Artist Name</label>
                        <input
                            type="text"
                            id="artistname"
                            placeholder="Artist Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="w-full  px-2 py-1 md:px-4 md:py-2 mb-2 text-gray-900 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    {errors.length > 0 && errors.map((err, i) => {
                        return <p key={i} className='text-xs text-red-500'>*{err}</p>
                    })}
                    <button
                        type="submit"
                        className="w-full py-1 md:py-2 px-4 bg-[var(--primary-color)] hover:opacity-80 text-white font-semibold rounded-lg shadow-md focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800 transition-all"
                    >
                        {createArtistMutation.isPending ? (<> Creating<LoadingDots /></>) : "Create"}
                    </button>
                </form>
            </div>
        </div>
    )
}
