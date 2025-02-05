import React from 'react'
import { SongRow } from './SongRow'

export const SongTable = () => {
  return (
    <table className='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'>
    <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-white'>
      <tr>
        {/* <th scope='col' className='px-6 py-4'>#</th> */}
        <th scope='col' className='px-5 py-2 md:px-8 md:py-4 flex items-center'>Track/Artist</th>
        <th scope='col' className='px-3 py-2 md:px-6 md:py-4 text-center'>Time</th>
        <th scope='col' className='px-3 py-2 md:px-6 md:py-4 text-center'>Plays</th>
        <th scope='col' className='px-3 py-2 md:px-6 md:py-4 text-center'>Add</th>
      </tr>
    </thead>
    <tbody>
        <SongRow imgSrc="https://c.saavncdn.com/527/My-Name-Is-Khan-Hindi-2010-20190617160533-500x500.jpg" duration="5:03" title='Sajda (From "My Name is Khan")' noOfPlay="1201" />
        <SongRow imgSrc="https://i.scdn.co/image/ab67616d0000b27344aa56e23e3a89802e6c6347" duration="3:33" title="Dildara (Stand By me)" noOfPlay="1101" />
        <SongRow imgSrc="https://i.ytimg.com/vi/O8h4GU95aZA/maxresdefault.jpg" duration="4:43" title="Mitwa" noOfPlay="12201" artist="Shafqat Amanat Ali" />
        <SongRow imgSrc="https://res.cloudinary.com/dk6waforl/image/upload/v1722673827/apna-bana-le-lyrics_hcp6le.webp" duration="3:12" title="Aapna Banale Piya tu jo sath merer to ye jaha so lage muje" noOfPlay="9201" artist="Arijit Sing" />
    </tbody>
  </table>
  ) 
}
