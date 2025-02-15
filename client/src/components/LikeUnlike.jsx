import React from 'react'
import { FaHeart } from 'react-icons/fa'
import { motion } from 'framer-motion';

export const LikeUnlike = ({ toggleLike, isLiked }) => {
  return (
    <div onClick={(e) => {
      e.stopPropagation()
      toggleLike()
    }} className={`likes select-none flex flex-col justify-center items-center gap-1 p-4 cursor-pointer`}>
      <p>{isLiked ? <FaHeart size={30} fill='red' color='red' /> : <FaHeart className='text-gray-400' size={30} />}</p>
    </div>
  )
}

