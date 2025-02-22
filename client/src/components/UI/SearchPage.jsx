import { useQuery } from '@tanstack/react-query';
import React from 'react'
import { useParams } from 'react-router-dom'
import { searchSong } from '../../apis/SongApi';
import { SongBar } from './SongBar';
import { Loader } from './Loader';
import { useSong } from '../../context/SongContext';

export const SearchPage = () => {
    const { search } = useParams();
    const {playSong} = useSong()

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['search', search],
        queryFn: () => searchSong(search)
    })

    const setSongHandler = (song) => {
        if (song) {
            playSong(song)
        }
    }
    
    if (isLoading) return <div className='w-full h-full flex justify-center items-center'><Loader /></div>
    if (isError) return <div className='w-full h-full flex justify-center items-center'> <Error errors={[error]} /> </div>
    
    console.log(data)
    return (
        <>
        <div className='p-4 h-full'>
        <h1 className='text-2xl font-bold m-4'>Search Results</h1>
            {
                data?.songs.map((song) => {
                    return <SongBar key={song._id} song={song} setSongHandler={setSongHandler} />
                })
            }
            </div>
        </>
    )
}
