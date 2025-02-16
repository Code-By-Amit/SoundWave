import React from 'react'
import { SongRow } from './SongRow'
import { useQuery } from '@tanstack/react-query'
import { fetchUserUploads } from '../../../apis/SongApi'
import toast from 'react-hot-toast'

export const SongTable = () => {
  const { data, isLoading, isError,error } = useQuery({
    queryKey: ['userUploads'],
    queryFn: () => fetchUserUploads(),
    onError:(error)=>{
      toast.error(`Error: ${error.message}`)
  }
  })
  
  if (isLoading) return <div>Loading.......</div>
  if (isError) return <div>Error.......{error.message}</div>
  
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
        {/* <SongRow imgSrc="https://c.saavncdn.com/527/My-Name-Is-Khan-Hindi-2010-20190617160533-500x500.jpg" duration="5:03" title='Sajda (From "My Name is Khan")' noOfPlay="1201" /> */}
       {
        data.map((song)=>{
        return  <SongRow key={song._id} song={song} />
        })
      }
    </tbody>
  </table>
  ) 
}
