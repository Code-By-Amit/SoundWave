import React from 'react'
import { PlaylistCard } from '../components/UI/PlaylistCard'
import { SongCard } from '../components/UI/SongCard'
import { SongBar } from '../components/UI/SongBar'
import { NavLink } from 'react-router-dom'
import { SongTable } from '../components/UI/SongTable/SongTable'
import { ArtistCard } from '../components/UI/ArtistCard'
import { SeeAllButton } from '../components/UI/SeeAllButton'
export const Explore = () => {
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
          <ArtistCard imgSrc="https://lastfm.freetls.fastly.net/i/u/ar0/ad7e05685bef8909f27c0d95bf79425c.jpg" name="Arijit Singh" />
          <ArtistCard imgSrc="https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcT1TTQyxyfeUJ936sqEsO65oAjq2yKqAh9APswkZyzR3ie0hewtz8r3ZsLq3hdLjYgP2ac2tTvqeV2caa63MqpVKEDO3De_d9Cz0KEA2Q" name="Atif Aslam" />
          <ArtistCard imgSrc="https://c.ndtvimg.com/2022-08/2huc1t4_kishore-kumar_625x300_04_August_22.jpg" name="Kihsor Kumar" />
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
          <h1 className='font-bold text-2xl mx-4 dark:text-white'>Playlists</h1>
          <SeeAllButton to="/all-playlist" />
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






    </>
  )
}
