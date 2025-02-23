import React from 'react'
import { IoSearch } from "react-icons/io5";
import { SongCard } from '../components/UI/SongCard';
import { PlaylistCard } from '../components/UI/PlaylistCard';
import { NavLink } from 'react-router-dom';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { SongTable } from '../components/UI/SongTable/SongTable';
import { SongBar } from '../components/UI/SongBar';
import { SeeAllButton } from '../components/UI/SeeAllButton';
import { useQuery } from '@tanstack/react-query';
import { fetchTopSongs } from '../apis/SongApi';
import { fetchTopPlaylists } from '../apis/playlistApi';
import { useSong } from '../context/SongContext';
import { Loader } from '../components/UI/Loader';
import { Error } from '../components/UI/Error';

export const Home = () => {
  const { playSong } = useSong()
  // Fetch Top Songs
  const { data: songs, isLoading: loadingSongs, isError: errorSongs } = useQuery({
    queryKey: ["topSongs"],
    queryFn: fetchTopSongs,
    staleTime: 60 * 60 * 1000,  // 1 hour → Data remains fresh for 1 hour
    cacheTime: 2 * 60 * 60 * 1000, // 12 hours → Keep cached data for 2 hours
    refetchOnWindowFocus: false, // No unnecessary refetching when switching tabs
    refetchOnReconnect: false, // No refetching when network reconnects
    keepPreviousData: true, // Keep old data while fetching new data
  });

  // Fetch Playlists
  const { data: playlists, isLoading: loadingPlaylists, isError: errorPlaylists } = useQuery({
    queryKey: ["playlists"],
    queryFn: fetchTopPlaylists,
    staleTime: 60 * 60 * 1000,  // 1 hour → Data remains fresh for 1 hour
    cacheTime: 2 * 60 * 60 * 1000, // 2 hours → Keep cached data for 2 hours
    refetchOnWindowFocus: false, // No unnecessary refetching when switching tabs
    refetchOnReconnect: false, // No refetching when network reconnects
    keepPreviousData: true, // Keep old data while fetching new data
  });

  const setSongHandler = (song) => {
    if (songs) {
      playSong(song, songs)
    }
  }

  if (loadingSongs || loadingPlaylists) return <div className='w-full h-full flex justify-center items-center'><Loader /></div>
  if (errorSongs || errorPlaylists) return <div className='w-full h-full flex justify-center items-center'> <Error errors={[errorSongs,errorPlaylists]} /> </div>
  return (
    <>
      {/* Playlist Card  */}
      <div className="Playlist my-4">
        <div className='flex justify-between px-3 items-center'>
          <h1 className='font-bold text-xl md:text-2xl mx-2 md:mx-4 dark:text-white'>Top Playlist</h1>
          <SeeAllButton to="/all-playlist" />
        </div>

        {/* Enable horizontal scroll and prevent overflow */}
        <div className='playlist flex max-w-full flex-nowrap overflow-scroll gap-4 items-center justify-start p-4'>
          {
            playlists.map((playlist) => {
              return <PlaylistCard key={playlist._id} id={playlist._id} songsLength={playlist.songs.length} imgSrc={playlist.image} title={playlist.name} />
            })
          }
        </div>
      </div>


      {/* Top Songs  */}
      <div className="songs min-h-96 p-4 pb-25">
        <h1 className="text-xl md:text-2xl font-bold md:mx-4 my-1 md:my-2 dark:text-white">Top Listened</h1>

        {/* Heading for songs  */}
        <div className="song p-3 py-1 pr-1 rounded flex mx-2 md:mx-4 mb-1 transition ease-in-out duration-300 justify-between items-center space-x-4 ">
          {/* <p className="line-clamp-1 text-gray-400 text-md ">Track/Artist</p> */}
        </div>
        {
          songs.map((song) => {
            return <SongBar key={song._id} song={song} setSongHandler={setSongHandler} />
          })
        }
      </div>
    </>
  )
}
