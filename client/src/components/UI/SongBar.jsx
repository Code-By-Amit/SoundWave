import React, { useEffect, useState } from 'react'
import { useSong } from '../../context/SongContext'
import { authUser } from '../../context/AuthUserContext'
import { LikeUnlike } from '../LikeUnlike'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { likeUnlikeSong } from '../../apis/SongApi'
import { MdPlaylistAdd } from "react-icons/md";
import { addOrRemoveToPlaylist, fetchUserPlaylistNameAndID } from '../../apis/playlistApi'
import toast from 'react-hot-toast'
import { MdPlaylistRemove, MdOutlinePlaylistAdd } from "react-icons/md";

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

        onMutate: () => {
            // Show pending toast
            const toastId = toast.loading("Processing like/unlike...");
            return { toastId };
        },

        onSuccess: (_, __, context) => {
            toast.success("Updated successfully!", { id: context.toastId }); // Replace pending with success
            setIsLiked((prev) => !prev);
            queryClient.invalidateQueries(['favourates']);
        },

        onError: (error, _, context) => {
            toast.error(`Error: ${error.message}`, { id: context.toastId }); // Replace pending with error
            console.error('Error liking/unliking song:', error);
        }
    });


    const toggleLike = () => {
        likeUnlike.mutate({ id: song._id, token })
    }

    const { data: playlists, isLoading } = useQuery({
        queryKey: ['playlistNameAndId'],
        queryFn: () => fetchUserPlaylistNameAndID(token),
        enabled: !!token,
        staleTime: 60 * 60 * 1000,  // 1 hour → Data remains fresh for 1 hour
        cacheTime: 2 * 60 * 60 * 1000, // 12 hours → Keep cached data for 2 hours
        refetchOnWindowFocus: false, // No unnecessary refetching when switching tabs
        refetchOnReconnect: false, // No refetching when network reconnects
    })


    const addToPlaylistMutation = useMutation({
        mutationKey: ['addToSongPlaylist', song._id],
        mutationFn: ({ id, songId, token }) => addOrRemoveToPlaylist(id, songId, token),

        onMutate: () => {
            // Show pending toast
            const toastId = toast.loading("Adding/Removing to playlist...");
            return { toastId };
        },

        onSuccess: (data, _, context) => {
            toast.success(data.message, { id: context.toastId }); // Replace pending with success toast
            setIsOpen(false);
            queryClient.invalidateQueries(["playlists", "allPlaylist"]);
        },

        onError: (error, _, context) => {
            toast.error(`Error: ${error.message}`, { id: context.toastId }); // Replace pending with error toast
            setIsOpen(false);
        }
    });


    return (
        <div onClick={() => setSongHandler(song)} className={`song cursor-pointer shadow-md md:py-2 md:px-3 md:pr-2 py-2 px-3  rounded flex  mb-2 group  hover:bg-[var(--primary-color)] transition ease-in-out duration-300 hover:shadow-2xl justify-between ${isPlaying ? "bg-[var(--primary-color)]" : "bg-white dark:hover:bg-gray-500 hover:bg-gray-200 dark:bg-gray-600"} items-center space-x-4 `}>
            {/* image and title */}
            <div className="flex items-center gap-3 sm:w-auto group flex-1">

                <img className="w-8 h-8 md:w-10 md:h-10 rounded-full ring-1 ring-offset-2 ring-[var(--primary-color)]" src={song.image} alt={song.title} />
                <div className="flex flex-col w-full h-full justify-start items-start text-sm ">
                    <p className={`font-bold line-clamp-1 text-sm md:text-base text-gray-600 flex-1 ${isPlaying ? "text-white" : ""}   dark:text-white`}>{song.title}</p>
                    {song.artist && <p className={`line-clamp-1 text-xs md:text-sm text-gray-400  ${isPlaying ? "text-white" : ""}   dark:text-white`}>{song.artist?.name}</p>}
                </div>
            </div>



            {/* time, play, and Add to Favorites */}
            <div className={`flex sm:mr-5 md:*:mx-3 gap-5 sm:gap-9 text-gray-500 justify-between  ${isPlaying ? "text-white" : ""} dark:text-white items-center text-xs sm:text-sm`}>
                <p>{song?.duration ? song?.duration : "-"}</p>
                <div className='flex items-center  justify-between gap-0 sm:gap-4 md:gap-8'>
                    <div className="relative">
                        <MdPlaylistAdd
                            onClick={(e) => {
                                e.stopPropagation();
                                if (user) {
                                    setIsOpen(!isOpen);
                                } else {
                                    toast.error("Please Login to Add Song to Playlist")
                                }
                            }}
                            className="text-3xl hover:scale-110 active:scale-110 rounded-[0.35rem] p-1"
                        />

                        {isOpen && (
                            <div onClick={(e) => e.stopPropagation()} className="z-10 absolute bottom-full right-4 transition ease-in-out bg-white divide-y dark:bg-gray-600 divide-gray-100 rounded-lg shadow-md w-fit">
                                <div className="py-0.5 md:py-1">
                                    <p className='w-full text-start px-4 py-1 text-base md:text-md font-semibold dark:text-gray-100  text-gray-900'>Your Playlists</p>
                                    <div className='w-[90%] mx-auto border-gray-300 mb-2 rounded-full border'></div>
                                    {
                                        playlists.length > 0 ?
                                            playlists?.map(playlist => {
                                                let isExistsInPlaylist = playlist.songs.includes(song?._id)
                                                console.log(isExistsInPlaylist)
                                                return <>
                                                    <button key={playlist._id}
                                                        onClick={(e) => {
                                                            e.stopPropagation()
                                                            addToPlaylistMutation.mutate({ id: playlist?._id, songId: song?._id, token })
                                                        }}
                                                        className={`w-full ${isExistsInPlaylist ? 'text-red-600' : 'dark:text-gray-100 '} text-start whitespace-nowrap flex gap-5 justify-between items-center px-4 py-1.5 text-md md:text-md font-semibold text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white`}>
                                                        {playlist.name} {isExistsInPlaylist ? <MdPlaylistRemove className='text-base md:text-xl' /> : <MdOutlinePlaylistAdd className='text-base md:text-xl' />}
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


                    <LikeUnlike isLiked={isLiked} isPlaying={isPlaying} toggleLike={toggleLike} />
                </div>
            </div>
        </div>
    )
}
