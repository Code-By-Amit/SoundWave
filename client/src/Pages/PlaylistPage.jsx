import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { deletePlaylist, fetchPlaylistById, saveUnsavePlaylist } from '../apis/playlistApi'
import { SongBar } from '../components/UI/SongBar'
import { authUser } from '../context/AuthUserContext'
import { RiDeleteBin6Line } from "react-icons/ri";
import toast from 'react-hot-toast'
import { useSong } from '../context/SongContext'
import { Loader } from '../components/UI/Loader'

export const PlaylistPage = () => {

    const { playSong } = useSong()

    const [isSaved, setIsSaved] = useState(false)
    const { user } = authUser()
    const [displaySaveUnsave, setDisplaySaveUnsave] = useState(true)

    const { id } = useParams()
    const navigate = useNavigate()
    const queryClient = useQueryClient()

    const { data: playlist, isLoading, error, isError } = useQuery({
        queryKey: [`playlist/${id}`],
        queryFn: () => fetchPlaylistById(id),
        enabled: !!id,
        staleTime: 60 * 60 * 1000,  // 1 hour → Data remains fresh for 1 hour
        cacheTime: 2 * 60 * 60 * 1000, // 2 hours → Keep cached data for 2 hours
        refetchOnWindowFocus: false, // No unnecessary refetching when switching tabs
        refetchOnReconnect: false, // No refetching when network reconnects
        keepPreviousData: true, // Keep old data while fetching new data
    })

    useEffect(() => {
        if (playlist) {

            if (playlist?.author === user?._id) {
                setDisplaySaveUnsave(false);
            }

            if (user?.playlist?.includes(id)) {
                setIsSaved(true);
            }
        }
    }, [playlist, user?.playlist, id, user?._id]);


    const saveUnsaveMutation = useMutation({
        mutationKey: ['saveUnsave', id],
        mutationFn: (id) => saveUnsavePlaylist(id),
        onMutate: async (id) => {
            const toastId = toast.loading('Saving playlist...');
            return { toastId };
        },
        onSuccess: (data, variable, context) => {
            setIsSaved((prev) => !prev)
            toast.success(data.message, { id: context.toastId })
            queryClient.invalidateQueries(['user-Created/Saved-Playlist'])
        },
        onError: (error, variable, context) => {
            toast.error(error.message, { id: context.toastId })
            console.error('Error savingUnsaving song:', error)
        }
    })

    const deleteMutation = useMutation({
        mutationKey: ['deletePlaylist', id],
        mutationFn: (id) => deletePlaylist(id),
        enabled: !!id,
        onMutate: async (id) => {
            const toastId = toast.loading('Deleting playlist...');
            return { toastId };
        },
        onSuccess: (data, variable, context) => {
            navigate('/playlist')
            toast.success(data.message, { id: context.toastId })
        },
        onError: (error, variable, context) => {
            toast.error(error.message, { id: context.toastId })
        },
    })

    const toggleSave = (e) => {
        saveUnsaveMutation.mutate(id)
    }

    const setSongHandler = (song) => {
        if (playlist?.songs) {
            playSong(song, playlist?.songs)
        }
    }

    if (isLoading) return <div className='w-full h-full flex justify-center items-center'><Loader /></div>
    if (isError) return <div className='w-full h-full flex justify-center items-center'> <Error errors={[error]} /> </div>




    return (
        <>
            <button onClick={() => navigate(-1)} className="mx-5 absolute my-5 flex items-center gap-2 bg-white px-2.5 py-1.5 md:px-4 md:py-2 rounded-full text-sm md:text-base shadow-md  hover:bg-gray-100 dark:hover:bg-gray-500 active:bg-gray-200 dark:bg-gray-600 transition-all" aria-label="Go back">
                {/* Left Arrow SVG */}
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-700 dark:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
                <span className="text-gray-700 font-medium dark:text-white">Go Back</span>
            </button>

            <div className='p-4 pb-25'>
                <div className='mx-auto w-50 h-50 md:w-60 mt-18 md:h-60 overflow-hidden rounded dark:shadow-black hover:scale-105 transition ease-in-out duration-300 shadow-2xl'>
                    <img className='w-full h-full object-cover ' src={playlist.image} alt="" />
                </div>
                <div className='text-center text-md my-4 font-semibold dark:text-white text-gray-800'>
                    <p>{playlist.name}</p>
                </div>
                {
                    user &&

                    (displaySaveUnsave ?
                        <div onClick={(e) => {
                            e.preventDefault()
                            if (user) {
                                toggleSave()
                            }
                        }} className={`likes cursor-pointer w-fit hover:scale-105 md:m-4 px-2 transition ease-in-out duration-300 bg-[var(--primary-color)] text-white p-1 rounded`}>
                            <p>
                                {isSaved ? (
                                    <>
                                        Unsave <img src="/save.png" className="w-4 inline-block invert" alt="Unsave" />
                                    </>
                                ) : (
                                    <>
                                        Save <img src="/save.png" className="w-4 inline-block invert" alt="Save" />
                                    </>
                                )}
                            </p>

                        </div>
                        : (<>
                            <div onClick={() => {
                                let a = confirm("Are you sure? Playlist will be permanently deleted.")
                                if (a) {
                                    deleteMutation.mutate(id)
                                }
                            }} className={`likes cursor-pointer w-fit hover:scale-105 md:m-4 px-2 transition ease-in-out duration-300 bg-red-600 text-white p-1 rounded`}>
                                <p className='flex items-center gap-2'>
                                    Delete <RiDeleteBin6Line />
                                </p>
                            </div>

                        </>))

                }

                {/* Top Songs  */}
                <div className="songs min-h-96">
                    <h1 className="text-2xl font-semibold md:mx-4 my-2  dark:text-white">{playlist?.songs.length === 0 ? "No Songs" : "Songs"}</h1>
                    {/* Heading for songs  */}
                    <div className="song p-3 py-1  pr-1 rounded flex mx-2 md:mx-4 mb-1 transition ease-in-out duration-300 justify-between items-center space-x-4 ">
                    </div>
                    {
                        playlist.songs.map((song) => {
                            return <SongBar key={song._id} song={song} setSongHandler={setSongHandler} />
                        })
                    }
                </div>
            </div >
        </>
    )
}
