import { useMutation, useQueries, useQueryClient } from '@tanstack/react-query'
import React, { useState } from 'react'
import { deleteSong } from '../../../apis/SongApi'
import toast from 'react-hot-toast'

export const SongRow = ({ song }) => {
    const queryClient = useQueryClient()
    const [token, setToken] = useState(localStorage.getItem('token') || null)

    const deleteMutation = useMutation({
        mutationKey:['deleteSong'],
        mutationFn:(id)=>deleteSong(id,token),
        onSuccess:()=>{
            queryClient.invalidateQueries(['userUploads'])
            toast.success("Song Deleted Sucessfully")
        },
        onError:(error)=>{
            toast.error(`Error: ${error.message}`)
        }
    })
    return (
        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:text-white dark:hover:bg-gray-600">
            {/* Song Info */}
            <td className="px-3 py-3 md:px-6 md:py-4 flex items-center gap-2 md:gap-3">
                <img className="rounded-full h-10 w-10 ring-1 ring-offset-2 ring-[var(--primary-color)]" src={song?.image} alt={song?.title} />
                <div className="flex flex-col w-full h-full justify-start items-start">
                    <p className="font-bold line-clamp-1">{song?.title}</p>
                    {song.artist && <p className="line-clamp-1 text-gray-400 ">{song?.artist?.name}</p>}
                </div>
            </td>

            {/* Duration */}
            <td className="px-2 py-3 text-center md:px-6 md:py-4">{song?.duration ? song?.duration : '-'}</td>

            {/* Like (Heart Icon) - Fixed Centering */}
            <td className="px-2 py-3 text-center md:px-6 md:py-4">
            <button onClick={()=>deleteMutation.mutate(song?._id)} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Delete</button>
            </td>
        </tr>
    )
}
