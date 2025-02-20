import React, { useEffect, useState } from 'react'
import { FaRegHeart } from 'react-icons/fa'
import { useSong } from '../../context/SongContext'
import { authUser } from '../../context/AuthUserContext'
import { LikeUnlike } from '../LikeUnlike'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { likeUnlikeSong } from '../../apis/SongApi'
import { MdPlaylistAdd } from "react-icons/md";
import { addOrRemoveToPlaylist, fetchUserPlaylistNameAndID } from '../../apis/playlistApi'
import toast from 'react-hot-toast'

export const SongBar = ({ song, setSongHandler }) => {
    const { currentSong } = useSong()
    const { user } = authUser();

    const [isLiked, setIsLiked] = useState(user?.songsLiked?.includes(song._id))
    const [token, setToken] = useState(localStorage.getItem('token') || null)
    const [isPlaying, setIsPlaying] = useState(false)
    const [isOpen, setIsOpen] = useState(false)

    const queryClient = useQueryClient()

    useEffect(() => {
        if (user && song) {
            setIsLiked(user?.songsLiked?.includes(song._id));
        }
        if (currentSong?._id === song?._id) {
            setIsPlaying(true)
        } else {
            setIsPlaying(false)
        }
    }, [user, song, currentSong]);


    const likeUnlike = useMutation({
        mutationKey: ['likeUnlike'],
        mutationFn: ({ id, token }) => likeUnlikeSong(id, token),
        onSuccess: () => {
            setIsLiked((prev) => !prev)
            queryClient.invalidateQueries(['favourates'])
        },
        onError: (error) => {
            console.error('Error liking/unliking song:', error)
        }
    })

    const toggleLike = () => {
        likeUnlike.mutate({ id: song._id, token })
    }

    const { data: playlists, isLoading } = useQuery({
        queryKey: ['playlistNameAndId'],
        queryFn: fetchUserPlaylistNameAndID,
        staleTime: Infinity,
        cacheTime: 10 * 60 * 1000, // ✅ Cache results for 10 minutes
        refetchOnWindowFocus: false, // ✅ Prevent refetch when user switches tabs
        refetchOnMount: false
    })


    const addToPlaylistMutation = useMutation({
        mutationKey: ['addToSongPlaylist', song._id],
        mutationFn: ({ id, songId }) => addOrRemoveToPlaylist(id, songId),
        onSuccess: (data) => {
            toast.success(data.message)
            setIsOpen(false)
        },
        onError: (error) => {
            toast.error(`Error: ${error.message}`)
            setIsOpen(false)
        }
    })

    return (
        <div onClick={() => setSongHandler(song)} className={`song shadow-md md:p-3 md:pr-2 p-2  rounded flex  mb-2 group  hover:bg-[var(--primary-color)] transition ease-in-out duration-300 hover:shadow-2xl justify-between ${isPlaying ? "bg-[var(--primary-color)]" : "bg-white dark:hover:bg-gray-500 hover:bg-gray-200 dark:bg-gray-600"} items-center space-x-4 `}>
            {/* image and title */}
            <div className="flex items-center gap-3 w-1/2 sm:w-auto group flex-1 max-w-84">

                <img className="w-10 h-10 rounded-full ring-1 ring-offset-1 ring-[var(--primary-color)]" src={song.image} alt={song.title} />
                <div className="flex flex-col w-full h-full justify-start items-start text-sm ">
                    <p className={`font-bold line-clamp-1 text-gray-600  ${isPlaying ? "text-white" : ""}   dark:text-white`}>{song.title}</p>
                    {song.artist && <p className={`line-clamp-1 text-gray-400  ${isPlaying ? "text-white" : ""}   dark:text-white`}>{song.artist?.name}</p>}
                </div>
            </div>

            {/* time, play, and Add to Favorites */}
            <div className={`flex sm:mr-5 *:mx-3 w-44 text-gray-500 gap-4 justify-between  ${isPlaying ? "text-white" : ""} dark:text-white items-center text-xs sm:text-sm`}>
                {/* <p>{song.duration}</p> */}
                <p>4:13</p>
                <div className='flex items-center justify-between gap-4'>
                    <div className="relative">
                        <MdPlaylistAdd
                            onClick={(e) => {
                                e.stopPropagation();
                                setIsOpen(!isOpen);

                            }}
                            className="text-3xl hover:scale-110 active:scale-110 rounded-[0.35rem] p-1"
                        />

                        {isOpen && (
                            <div onClick={(e) => e.stopPropagation()} className="z-10 absolute bottom-full right-4 transition ease-in-out bg-white divide-y dark:bg-gray-600 divide-gray-100 rounded-lg shadow-md w-44 min-w-max">
                                <div className="py-0.5 md:py-1">
                                    <p className='w-full text-start px-4 py-1 text-base md:text-md font-semibold text-gray-900'>Your Playlists</p>
                                    <div className='w-[90%] mx-auto border-gray-300 mb-2 rounded-full border'></div>
                                    {
                                        playlists.length > 0 ?
                                            playlists?.map(playlist => {
                                                return <>
                                                    <button key={playlist._id}
                                                        onClick={(e) => {
                                                            e.stopPropagation()
                                                            addToPlaylistMutation.mutate({ id: playlist?._id, songId: song?._id })
                                                        }}
                                                        className={`w-full text-start px-4 py-1.5 text-md md:text-md font-semibold text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white`}>
                                                        {playlist.name}
                                                    </button>
                                                </>
                                            })
                                            : (<button className="w-full text-start px-4 py-1 text-md md:text-md font-semibold text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white">
                                                Not Created Playlist Yet ?
                                            </button>)
                                    }
                                </div>
                            </div>
                        )}
                    </div>


                    <LikeUnlike isLiked={isLiked} toggleLike={toggleLike} />
                </div>
            </div>
        </div>
    )
}
