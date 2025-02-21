import React from 'react'
import { PlaylistCard } from '../components/UI/PlaylistCard'
import { SongCard } from '../components/UI/SongCard'
import { SongBar } from '../components/UI/SongBar'
import { NavLink } from 'react-router-dom'
import { SongTable } from '../components/UI/SongTable/SongTable'
import { ArtistCard } from '../components/UI/ArtistCard'
import { SeeAllButton } from '../components/UI/SeeAllButton'
import { fetchTopPlaylists } from '../apis/playlistApi'
import { useQuery } from '@tanstack/react-query'
import { fetchSomeSongs } from '../apis/SongApi'
import { fetchSomeArtist } from '../apis/artistApi'
import { useSong } from '../context/SongContext'
import { Loader } from '../components/UI/Loader'
export const Explore = () => {

  const { playSong } = useSong()

  // Fetch Top Songs
  const { data: songs, isLoading: loadingSongs, isError: errorSongs } = useQuery({
    queryKey: ["someSongs"],
    queryFn: fetchSomeSongs,
    staleTime: 60 * 60 * 1000,  // 1 hour → Data remains fresh for 1 hour
    cacheTime: 2 * 60 * 60 * 1000, // 2 hours → Keep cached data for 2 hours
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

  const { data: artists, isLoading: loadingArtist, isError: errorArtist } = useQuery({
    queryKey: ["artists"],
    queryFn: fetchSomeArtist,
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

  if (loadingSongs || loadingPlaylists || loadingArtist) return <div className='w-full h-full flex justify-center items-center'><Loader /></div>
  if (errorSongs || errorPlaylists || errorArtist) return <div className='w-full h-full flex justify-center items-center'> <Error errors={[errorArtist, errorPlaylists, errorSongs]} /> </div>

  return (
    <>
      {/* Artist's Cards  */}
      <div className="Artist my-4">
        <div className="flex justify-between px-3 items-center">
          <h1 className="font-bold text-2xl mx-4 dark:text-white">Artists</h1>
          <SeeAllButton to="/all-artist" />
        </div>

        {/* Enable horizontal scroll */}
        <div className="artistcards flex max-w-full overflow-x-auto items-center md:gap-2 p-4 justify-start">

          {
            artists.map((artist) => {
              return <ArtistCard key={artist._id} id={artist._id} imgSrc={artist.image} name={artist.name} />
            })
          }
        </div>
      </div>


      {/* Songs Cards  */}
      <div className="Songs my-4">
        <div className="flex justify-between px-3 items-center">
          <h1 className="font-bold text-2xl mx-4 dark:text-white">Songs</h1>
          <SeeAllButton to="/all-songs" />
        </div>

        {/* Enable horizontal scroll */}
        <div className="songscards flex max-w-full overflow-x-auto items-center gap-4 p-4 justify-start">
          {
            songs.map((song) => {
              return <SongCard key={song._id} song={song} setSongHandler={setSongHandler} />
            })
          }
        </div>
      </div>

      {/* Playlist Card  */}
      <div className="Playlist my-4">
        <div className='flex justify-between px-3 items-center'>
          <h1 className='font-bold text-2xl mx-4 dark:text-white'>Playlists</h1>
          <SeeAllButton to="/all-playlist" />
        </div>

        {/* Enable horizontal scroll and prevent overflow */}
        <div className='playlist flex max-w-full flex-nowrap gap-4 mb-40 items-center justify-start p-4'>
          {
            playlists.map((playlist) => {
              return <PlaylistCard key={playlist._id} id={playlist._id} songsLength={playlist.songs.length} imgSrc={playlist.image} title={playlist.name} />
            })
          }
        </div>
      </div>






    </>
  )
}
