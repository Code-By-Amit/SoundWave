
import { useMutation } from "@tanstack/react-query";
import { createContext, useContext, useEffect, useRef, useState } from "react"
import { addtoRecentPlays } from "../apis/SongApi";

const SongContext = createContext()

export const SongProvider = ({ children }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(40);
    const [currentTime, setCurrentTime] = useState(0);
    const [currentSong, setCurrentSong] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token') || null);

    let audioRef = useRef(new Audio())
    let addToRecentPlays = useMutation({
        mutationKey: ['addToRecentPlays'],
        mutationFn:({id,token}) => addtoRecentPlays(id,token)
    })

    useEffect(() => {
        if (currentSong) {
            addToRecentPlays.mutate({id:currentSong._id,token})
            if (audioRef.current) {
                audioRef.current.pause(); // Pause any existing audio
                audioRef.current.src = ""
            }
            audioRef.current.src = currentSong.url

            const audio = audioRef.current
            const handelMetaData = () => setDuration(audio.duration)
            const handelTimeUpdate = () => setCurrentTime(audio.currentTime)

            audio.addEventListener('loadedmetadata', handelMetaData);
            audio.addEventListener('timeupdate', handelTimeUpdate);

            audio.play()
            setIsPlaying(true)

            return () => {
                audio.removeEventListener('loadedmetadata', handelMetaData);
                audio.removeEventListener('timeupdate', handelTimeUpdate);
                audio.pause();
                audio.src = "";
            }
        }
    }, [currentSong])

    useEffect(() => {
        if (audioRef.current) {
            isPlaying ? audioRef.current.play() : audioRef.current.pause()
        }
    }, [isPlaying])


    const seek = (seekTo) => {
        if (audioRef.current) {
            let newTime = parseFloat(seekTo);
            audioRef.current.currentTime = newTime
            setCurrentTime(newTime)
        }
    }

    const adjustVolume = (volume) => {
        if (audioRef.current) {
            const newVolume = volume / 100
            audioRef.current.volume = newVolume
            setVolume(newVolume * 100)
        }
    }

    return (
        <SongContext.Provider value={{ isPlaying, setIsPlaying, volume, adjustVolume, currentSong, currentTime, duration, seek, setCurrentSong }}>
            {children}
        </SongContext.Provider>
    )
}

export const useSong = () => useContext(SongContext)