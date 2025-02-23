
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
    const [songList, setSongList] = useState(null);
    const [currentSongIndex, setCurrentSongIndex] = useState(0);

    let audioRef = useRef(new Audio())
    let addToRecentPlays = useMutation({
        mutationKey: ['addToRecentPlays'],
        mutationFn: ({ id, token }) => addtoRecentPlays(id, token)
    })

    useEffect(() => {
        if (currentSong) {
            addToRecentPlays.mutate({ id: currentSong._id, token })
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

    const playSong = (song, songs) => {
        setCurrentSong({
            _id: song?._id,
            title: song?.title,
            songImg: song?.image,
            url: song?.songUrl,
            artist: song?.artist?.name || null
        })
        setSongList(songs)
        console.log(song)
        const index = songs.findIndex(s => s._id.toString() === song._id.toString())
        setCurrentSongIndex(index)
    }

    const playForward = () => {
        if (currentSongIndex < songList.length - 1) {
            const forwardIndex = currentSongIndex + 1;
            setCurrentSongIndex((prev) => prev + 1);
            setCurrentSongByCurrentSongIndex(forwardIndex)
        } else {
            setCurrentSongIndex(0)
            setCurrentSongByCurrentSongIndex(0)
        }
    }

    const playPrevious = () => {
        if (currentSongIndex > 0) {
            const previousIndex = currentSongIndex -1;
            setCurrentSongIndex((prev) => prev - 1)
            setCurrentSongByCurrentSongIndex(previousIndex)
        } else {
            const index = songList.length -1;
            setCurrentSongIndex(songList.length - 1);
            setCurrentSongByCurrentSongIndex(index)
        }
    }

    const setCurrentSongByCurrentSongIndex = (index) =>{
         setCurrentSong({
                _id: songList[index]?._id,
                title: songList[index]?.title,
                songImg: songList[index]?.image,
                url: songList[index]?.songUrl,
                artist: songList[index]?.artist?.name || null
            })
    }

    return (
        <SongContext.Provider value={{ isPlaying, setIsPlaying, volume, adjustVolume, playSong, playPrevious, playForward, currentSong, currentTime, duration, seek, setCurrentSong }}>
            {children}
        </SongContext.Provider>
    )
}

export const useSong = () => useContext(SongContext)