import React from 'react'
import { FaHeart } from 'react-icons/fa'
import { motion } from 'framer-motion';
import { authUser } from '../context/AuthUserContext';
import toast from 'react-hot-toast';

export const LikeUnlike = ({ toggleLike, isLiked }) => {
  const {user} = authUser();
  return (
    <div onClick={(e) => {
      e.stopPropagation()
      if(user){
        toggleLike()
      }else{
        toast.error("Please Login to Like Song")
      }
    }} className={`likes select-none flex flex-col justify-center items-center hover:scale-110 active:scale-110 transition ease-in-out duration-300 gap-1 p-2 md:p-4 cursor-pointer`}>
      <p>{isLiked ? <FaHeart size={30} fill='red' color='red' /> : <FaHeart className='text-gray-400 dark:text-gray-50' size={30} />}</p>
    </div>
  )
}

