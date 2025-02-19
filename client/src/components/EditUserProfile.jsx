import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { authUser } from '../context/AuthUserContext'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateUserProfile } from '../apis/userApi'
import toast from 'react-hot-toast'
import { LoadingDots } from './LoadingDots'
import { useSong } from '../context/SongContext'

export const EditUserProfile = () => {
  const { user } = authUser()
  const navigate = useNavigate()
  const [name, setName] = useState({ firstName: "", lastName: "" })
  const [username, setUserName] = useState(user?.username)
  const [image, setImage] = useState(user?.profileImg)
  const [previewImg, setPreviewImg] = useState(null)
  const [errors, setErrors] = useState([])

  const queryClient = useQueryClient()

  useEffect(() => {
    setName({
      firstName: user?.firstName,
      lastName: user?.lastName,
    })
    setUserName(user?.username)
    setPreviewImg(null)
  }, [user])

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
      setPreviewImg(null)
    }
  }

  const profileMutation = useMutation({
    mutationKey: ['updateProfile'],
    mutationFn: (data) => updateUserProfile(data),
    onSuccess: (data) => {
      toast.success(data.message)
      queryClient.invalidateQueries(['authUser'])
    },
    onError: (error) => {
      const errorMessage = error.response?.data?.message || error.message || "Something went wrong!";
      toast.error(`Error: ${errorMessage}`);
    }
  })

  const validateForm = () => {
    let errors = [];

    // Validate First and Last Name Length
    if (name.firstName.trim().length > 8 || name.lastName.trim().length > 8) {
      errors.push("First and Last Name length should not exceed 8 characters");
    }

    // Validate Username (only a-z, 0-9, - and @)
    if (!/^[a-z0-9\-@]+$/.test(username.trim())) {
      errors.push("Username should only contain a-z, 0-9, - and @");
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
    formData.append('profileImg', image);
    formData.append('firstName', name.firstName);
    formData.append('lastName', name.lastName);
    formData.append('username', username);
    profileMutation.mutate(formData)
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


      <h1 className='text-center text-xl md:text-3xl font-bold text-gray-800 my-2'>Update Your Profile.</h1>

      <div className="max-w-md mx-auto mt-3 bg-white dark:bg-gray-800 p-4 md:p-6 rounded-lg shadow-lg">
        <form className="space-y-3" onSubmit={handleSubmit}>

          {/* <!-- File Input --> */}
          <div className='m-2 w-30 md:w-48 mx-auto flex items-center flex-col'>
            <img className='h-20 w-20 md:h-28 md:w-28 rounded-full mb-2 shadow-2xl' src={previewImg ? previewImg : user?.profileImg} alt="Profile" />
            {previewImg ? <button onClick={handleCanceleUpload} className="cursor-pointer bg-slate-200 font-semibold px-4 py-2 my-4 rounded-lg w-full text-center" > Cancel </button>
              : <label htmlFor="file-upload" className="cursor-pointer bg-slate-200 font-semibold px-3 py-1 md:px-4 md:py-2 my-4 rounded-lg w-full text-center" > Upload </label>}
            <input id='file-upload' type="file" accept='image/*' className="hidden" name="profileImg" onChange={handleFileChange} />
          </div>


          <div className='flex gap-3'>

            <div className="flex flex-col">
              <label htmlFor="firstname" className="text-sm font-medium text-gray-700 dark:text-gray-200  mb-1 md:mb-2">First Name</label>
              <input
                type="text"
                id="firstname"
                placeholder="First Name"
                value={name.firstName}
                onChange={(e) => setName((prev) => ({ ...prev, firstName: e.target.value }))}
                className="w-full px-2 py-1 md:px-4 md:py-2 text-gray-900 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="lastname" className="text-sm font-medium text-gray-700 dark:text-gray-200  mb-1 md:mb-2">Last Name</label>
              <input
                type="text"
                id="lastname"
                placeholder="Last Name (optional)"
                value={name.lastName}
                onChange={(e) => setName((prev) => ({ ...prev, lastName: e.target.value }))}
                className="w-full  px-2 py-1 md:px-4 md:py-2 text-gray-900 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
          <div className="flex flex-col">
            <label htmlFor="lastname" className="text-sm font-medium text-gray-700 dark:text-gray-200 mb-1 md:mb-2">Username</label>
            <input
              type="text"
              id="lastname"
              placeholder="Last Name"
              value={username}
              onChange={(e) => setUserName(e.target.value)}
              className="w-full  px-2 py-1 md:px-4 md:py-2 text-gray-900 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {errors.length > 0 && errors.map(err => {
            return <p className='text-xs text-red-500'>*{err}</p>
          })}
          <button
            type="submit"
            className="w-full py-2 px-4 bg-[var(--primary-color)] hover:opacity-80 text-white font-semibold rounded-lg shadow-md focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800 transition-all"
          >
            {profileMutation.isPending ? (<> Updating Profile<LoadingDots /></>) : "Update"}
          </button>
        </form>
      </div>
    </div>
  )
}
