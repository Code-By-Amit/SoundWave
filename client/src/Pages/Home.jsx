import React from 'react'
import { IoSearch } from "react-icons/io5";
import { SongCard } from '../components/UI/SongCard';
import { PlaylistCard } from '../components/UI/PlaylistCard';
import { NavLink } from 'react-router-dom';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { SongTable } from '../components/UI/SongTable/SongTable';
import { SongBar } from '../components/UI/SongBar';

export const Home = () => {
  return (
    <>

      {/* Songs Cards  */}
      <div className="Songs my-4">
        <div className="flex justify-between px-3 items-center">
          <h1 className="font-bold text-2xl mx-4 dark:text-white">Top Songs</h1>
          <NavLink to="/songs">
            <button className="text-gray-600 dark:text-gray-400 md:mx-4 hover:text-[var(--primary-color)] cursor-pointer">
              View All
            </button>
          </NavLink>
        </div>

        {/* Enable horizontal scroll */}
        <div className="songscards flex max-w-full overflow-x-auto items-center gap-4 p-4 justify-start">
          <SongCard imgSrc="https://c.saavncdn.com/527/My-Name-Is-Khan-Hindi-2010-20190617160533-500x500.jpg" title='Sajdaa (From "My Name Is Khan")' />
          <SongCard imgSrc="https://i.scdn.co/image/ab67616d0000b27344aa56e23e3a89802e6c6347" title='Dildara (Stand By me)' />
          <SongCard imgSrc="https://i.ytimg.com/vi/O8h4GU95aZA/maxresdefault.jpg" title='Mitwa' />
          <SongCard imgSrc="https://res.cloudinary.com/dk6waforl/image/upload/v1722673827/apna-bana-le-lyrics_hcp6le.webp" title='Aapna Banale Piya tu jo sath merer to ye jaha so lage muje' />
          <SongCard imgSrc="https://res.cloudinary.com/dk6waforl/image/upload/v1722673827/apna-bana-le-lyrics_hcp6le.webp" title='Aapna Banale Piya tu jo sath merer to ye jaha so lage muje' />
          <SongCard imgSrc="https://res.cloudinary.com/dk6waforl/image/upload/v1722673827/apna-bana-le-lyrics_hcp6le.webp" title='Aapna Banale Piya tu jo sath merer to ye jaha so lage muje' />
          <SongCard imgSrc="https://res.cloudinary.com/dk6waforl/image/upload/v1722673827/apna-bana-le-lyrics_hcp6le.webp" title='Aapna Banale Piya tu jo sath merer to ye jaha so lage muje' />
          <SongCard imgSrc="https://res.cloudinary.com/dk6waforl/image/upload/v1722673827/apna-bana-le-lyrics_hcp6le.webp" title='Aapna Banale Piya tu jo sath merer to ye jaha so lage muje' />
          <SongCard imgSrc="https://res.cloudinary.com/dk6waforl/image/upload/v1722673827/apna-bana-le-lyrics_hcp6le.webp" title='Aapna Banale Piya tu jo sath merer to ye jaha so lage muje' />
          <SongCard imgSrc="https://res.cloudinary.com/dk6waforl/image/upload/v1722673827/apna-bana-le-lyrics_hcp6le.webp" title='Aapna Banale Piya tu jo sath merer to ye jaha so lage muje' />
        </div>
      </div>


      {/* Playlist Card  */}
      <div className="Playlist my-4">
        <div className='flex justify-between px-3 items-center'>
          <h1 className='font-bold text-2xl mx-4 dark:text-white'>Top Playlist</h1>
          <NavLink to="/playlist">
            <button className='text-gray-600 mx-4 dark:text-gray-400 md:mx-4 hover:text-[var(--primary-color)] cursor-pointer'>View All</button>
          </NavLink>
        </div>

        {/* Enable horizontal scroll and prevent overflow */}
        <div className='playlist flex max-w-full flex-nowrap gap-4 items-center justify-start p-4'>
          <PlaylistCard imgSrc="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTTcOlodFZ-BbjcvK_kTkhO4G6a38b7QP6-Q&s" title="My Playlist" />
          <PlaylistCard imgSrc="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTTcOlodFZ-BbjcvK_kTkhO4G6a38b7QP6-Q&s" title="My Playlist" />
          <PlaylistCard imgSrc="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTTcOlodFZ-BbjcvK_kTkhO4G6a38b7QP6-Q&s" title="My Playlist" />
          <PlaylistCard imgSrc="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTTcOlodFZ-BbjcvK_kTkhO4G6a38b7QP6-Q&s" title="My Playlist" />
          <PlaylistCard imgSrc="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTTcOlodFZ-BbjcvK_kTkhO4G6a38b7QP6-Q&s" title="My Playlist" />
          <PlaylistCard imgSrc="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTTcOlodFZ-BbjcvK_kTkhO4G6a38b7QP6-Q&s" title="My Playlist" />
          <PlaylistCard imgSrc="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTTcOlodFZ-BbjcvK_kTkhO4G6a38b7QP6-Q&s" title="My Playlist" />
          <PlaylistCard imgSrc="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTTcOlodFZ-BbjcvK_kTkhO4G6a38b7QP6-Q&s" title="My Playlist" />
          <PlaylistCard imgSrc="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTTcOlodFZ-BbjcvK_kTkhO4G6a38b7QP6-Q&s" title="My Playlist" />
        </div>
      </div>



      {/* Top Songs  */}
      {/* <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <SongTable />
        </div> */}

      {/* Top Songs  */}
      <div className="songs min-h-96">
        <h1 className="text-2xl font-bold mx-7 my-4 dark:text-white">Top Songs</h1>

        {/* Heading for songs  */}
        <div className="song p-3 py-1  pr-1 rounded flex mx-2 md:mx-4 mb-1 transition ease-in-out duration-300 justify-between items-center space-x-4 ">            <p className="line-clamp-1 text-gray-400  ">Track/Artist</p>
          <div className="flex sm:mr-1 md:*:mx-3 *:mx-1 text-gray-400  w-44 md:w-91 justify-between items-center text-xs sm:text-sm">
            <p>Duration</p>
            <p>Play's</p>
            <p>Favourate</p>
          </div>
        </div>

        <SongBar imgSrc="https://i.scdn.co/image/ab67616d0000b27344aa56e23e3a89802e6c6347" title="Dildara(Stand By Me)" artist="Arijit Singh" duration="3:12" noOfPlay="1434" />
        <SongBar imgSrc="https://c.saavncdn.com/527/My-Name-Is-Khan-Hindi-2010-20190617160533-500x500.jpg" duration="5:03" title='Sajda (From "My Name is Khan")' noOfPlay="1201" />
        <SongBar imgSrc="https://i.scdn.co/image/ab67616d0000b27344aa56e23e3a89802e6c6347" duration="3:33" title="Dildara (Stand By me)" noOfPlay="1101" />
        <SongBar imgSrc="https://i.ytimg.com/vi/O8h4GU95aZA/maxresdefault.jpg" duration="4:43" title="Mitwa" noOfPlay="1233201" artist="Shafqat Amanat Ali" />
        <SongBar imgSrc="https://res.cloudinary.com/dk6waforl/image/upload/v1722673827/apna-bana-le-lyrics_hcp6le.webp" duration="3:12" title="Aapna Banale Piya tu jo sath merer to ye jaha so lage muje" noOfPlay="9201" artist="Arijit Sing" />
      </div>
    </>
  )
}
