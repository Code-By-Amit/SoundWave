
import { createContext, useContext, useEffect, useRef, useState } from "react"

const SongContext = createContext()

export const SongProvider = ({ children }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(40);
    const [currentTime, setCurrentTime] = useState(0);
    const [currentSong, setCurrentSong] = useState({
        title:"Dildara",
        url:"https://aac.saavncdn.com/026/8f6adbb630f288113eab4753d3da5217_160.mp4",
        songImg:"https://www.makemykaraoke.com/images/detailed/19/ra_one21364025293514d5fcd07387.jpg"
    });

    let audioRef = useRef(null)

    useEffect(() => {
        if (currentSong) {
            if (audioRef.current) {
                audioRef.current.pause(); // Pause any existing audio
            }
            audioRef.current = new Audio(currentSong.url)
            console.log(audioRef.current)
            const audio = audioRef.current
            const handelMetaData = () => setDuration(audio.duration)
            const handelTimeUpdate = () => setCurrentTime(audio.currentTime)

            audio.addEventListener('loadedmetadata', handelMetaData);
            audio.addEventListener('timeupdate', handelTimeUpdate);

            return () => {
                audio.removeEventListener('loadedmetadata', handelMetaData);
                audio.removeEventListener('timeupdate', handelTimeUpdate);
            }
        }
    }, [])

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