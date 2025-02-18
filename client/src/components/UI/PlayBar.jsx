import React, { useEffect, useRef, useState } from 'react'
import { FaPause, FaPlay, FaRegHeart } from 'react-icons/fa'
import { FaVolumeHigh } from 'react-icons/fa6'
import { IoPlaySkipBackSharp, IoPlaySkipForwardSharp } from 'react-icons/io5'
import { useSong } from '../../context/SongContext'

export const PlayBar = () => {
    const { isPlaying, setIsPlaying, volume, adjustVolume, currentSong, currentTime, duration, seek, playPrevious,playForward } = useSong();

    const formatTime = (time) => {
        if (isNaN(time) || time === Infinity) return "0:00";
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    };

    return (
        <div className={`absolute bottom-1.5 w-[99%]  rounded-t-lg z-50 bg-[var(--primary-color)] m-1 mb-0 p-3 pt-4 h-22 md:flex justify-between transition-transform ease-in-out duration-1000 items-center ${currentSong ? "translate-y-0" : "translate-y-full"} `}>
            <div className='flex w-full items-center'>

                {/* Music Data  */}
                <div className='flex  text-white'>
                    <div className='w-10 h-10 rounded overflow-hidden ring-1 mr-2 ring-offset-1 ring-white'>
                        <img className='w-full h-full object-cover' src={currentSong?.songImg} alt={currentSong?.title} />
                    </div>
                    <div className='flex'>
                        <div className='h-full align-text-top leading-1 md:w-44'>
                            <h1 className='font-bold text-sm text-nowrap overflow-clip'>{currentSong?.title}</h1>
                            <p className='text-xs w-16 overflow-clip text-nowrap'>{currentSong?.artist ? currentSong?.artist : '-'}</p>
                        </div>
                    </div>
                </div>

                {/* Controls  */}
                <div className="flex flex-col items-center flex-1">
                    <div className='flex md:gap-4 gap-9 flex-1 text-xl mb-2 text-white justify-center items-center'>
                        <IoPlaySkipBackSharp onClick={playPrevious} className='cursor-pointer' />
                        {isPlaying ?
                            <button onClick={() => setIsPlaying(false)} className="flex items-center rounded-[50%] bg-white  justify-center p-2" >
                                <FaPause className="text-[var(--primary-color)] text-lg cursor-pointer" />
                            </button>
                            : <button onClick={() => setIsPlaying(true)} className="flex items-center rounded-[50%] bg-white justify-center p-2" >
                                <FaPlay className="text-[var(--primary-color)] text-lg cursor-pointer" />
                            </button>}
                        <IoPlaySkipForwardSharp onClick={playForward} className='cursor-pointer' />
                    </div>
                    <div className='md:w-[70%] w-[96%] mx-2 absolute bottom-1 right-0 md:static flex justify-center items-center gap-3'>
                        <p className='text-xs text-white font-semibold h-4 items-center'>{formatTime(currentTime)}</p>
                        <input type="range" className="cursor-pointer slider w-full" max={duration} value={currentTime} onChange={(e) => seek(e.target.value)} />
                        <p className='text-xs text-white font-semibold h-4 items-center'>{formatTime(duration)}</p>
                    </div>
                </div>

            </div>

            {/* Range  */}
            <div className='w-34 hidden md:flex items-center justify-center gap-2 text-white'>
                <FaVolumeHigh size={32} />
                <input type="range" className=' slider cursor-pointer w-full' value={volume} onChange={(e)=>adjustVolume(e.target.value)} />
            </div>
        </div>
    )
}
