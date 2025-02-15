import React, { useEffect, useState } from 'react'
import { FaRegHeart } from 'react-icons/fa'
import { useSong } from '../../context/SongContext'
import { authUser } from '../../context/AuthUserContext'
import { LikeUnlike } from '../LikeUnlike'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { likeUnlikeSong } from '../../apis/SongApi'

export const SongBar = ({ song }) => {
    const { setCurrentSong } = useSong()
    const { user } = authUser();

    const [isLiked, setIsLiked] = useState(user?.songsLiked?.includes(song._id))
    const [token, setToken] = useState(localStorage.getItem('token') || null)
    
    const queryClient = useQueryClient()

    useEffect(() => {
        if (user && song) {
          setIsLiked(user?.songsLiked?.includes(song._id));
        }
      }, [user, song]);

    const setCurrentSongHandler = () => {
        setCurrentSong({
            _id: song?._id,
            title: song?.title,
            songImg: song?.image,
            url: song?.songUrl
        })
    }

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

    return (
        <div onClick={setCurrentSongHandler} className="song shadow-md md:p-3 md:pr-2 p-2  rounded flex  mb-2 group hover:bg-[var(--primary-color)] transition ease-in-out duration-300 hover:shadow-2xl justify-between bg-white items-center space-x-4 dark:bg-gray-600 ">
            {/* image and title */}
            <div className="flex items-center gap-3 w-1/2 sm:w-auto group flex-1 max-w-84">

                <img className="w-10 h-10 rounded-full ring-1 ring-offset-1 ring-[var(--primary-color)]" src={song.image} alt={song.title} />
                <div className="flex flex-col w-full h-full justify-start items-start text-sm ">
                    <p className="font-bold line-clamp-1 text-gray-600 group-hover:text-white dark:text-white">{song.title}</p>
                    {song.artist && <p className="line-clamp-1 text-gray-400 group-hover:text-white dark:text-white">{song.artist?.name}</p>}
                </div>
            </div>

            {/* time, play, and Add to Favorites */}
            <div className="flex sm:mr-5 *:mx-3 w-44 text-gray-500 md:w-84 justify-between group-hover:text-white dark:text-white items-center text-xs sm:text-sm">
                <p>{song.duration}</p>
                <p>{song.noOfPlay}</p>
                <LikeUnlike isLiked={isLiked} toggleLike={toggleLike} />
                {/* <FaRegHeart className="text-xl hover:text-red-500 cursor-pointer" /> */}
            </div>
        </div>
    )
}
