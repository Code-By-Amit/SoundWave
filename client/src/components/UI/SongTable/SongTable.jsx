import React, { useState } from 'react'
import { SongRow } from './SongRow'
import { useQuery } from '@tanstack/react-query'
import { fetchUserUploads } from '../../../apis/SongApi'
import toast from 'react-hot-toast'
import { Loader } from '../Loader'

export const SongTable = () => {
  const [token, setToken] = useState(localStorage.getItem('token') || null)
  const { data, isLoading, isError,error } = useQuery({
    queryKey: ['userUploads'],
    queryFn: () => fetchUserUploads(token),
    onError:(error)=>{
      toast.error(`Error: ${error.message}`)
  }
  })
  
  if (isLoading) return <div className='w-full h-full flex justify-center items-center'><Loader /></div>
  if (isError) return <div className='w-full h-full flex justify-center items-center'> <Error errors={[error]} /> </div>
  
  return (
    <table className='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'>
    <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-white'>
      <tr>
        {/* <th scope='col' className='px-6 py-4'>#</th> */}
        <th scope='col' className='px-5 py-2 md:px-8 md:py-4 flex items-center'>Track/Artist</th>
        <th scope='col' className='px-3 py-2 md:px-6 md:py-4 text-center'>Time</th>
        <th scope='col' className='px-3 py-2 md:px-6 md:py-4 text-center'>Delete</th>
      </tr>
    </thead>
    <tbody>
       {
        data.map((song)=>{
        return  <SongRow key={song._id} song={song} />
        })
      }
    </tbody>
  </table>
  ) 
}
