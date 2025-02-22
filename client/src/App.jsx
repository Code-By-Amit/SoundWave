import { useState } from 'react'

import { Routes, Route } from 'react-router-dom'
import { MainLayout } from './components/Layout/MainLayout'
import { Home } from './Pages/Home'
import { Playlist } from './Pages/Playlist'
import { Favourates } from './Pages/Favourites'
import { RightLayout } from './components/Layout/RightLayout'
import { Explore } from './Pages/Explore'
import { LoginPage } from './Pages/LoginPage'
import { SignUpPage } from './Pages/SignUpPage'
import { UploadSongPage } from './Pages/UploadSongPage'
import { RecentPlaysPage } from './Pages/RecentPlaysPage'
import { AllSongs } from './Pages/AllSongs'
import { AllPlaylist } from './Pages/AllPlaylist'
import { AllArtist } from './Pages/AllArtist'
import { PlayBar } from './components/UI/PlayBar'
import { PlaylistPage } from './Pages/PlaylistPage'
import { ArtistPage } from './Pages/ArtistPage'
import { CreateEditPlaylist } from './components/CreateEditPlaylist'
import { UploadEditSong } from './components/uploadEditSong'
import { EditUserProfile } from './components/EditUserProfile'
import { CreateArtistForm } from './components/CreateArtistForm'
import { RequestForm } from './components/RequestForm'
import { SearchPage } from './components/UI/SearchPage'
import { authUser } from './context/AuthUserContext'
import { NotLoggedInPage } from './components/NotLoggedInPage'

function App() {
  const { user } = authUser();

  return (
    <>
      <Routes>
        <Route path='/login' element={<LoginPage />} />
        <Route path='/signup' element={<SignUpPage />} />
        <Route path='/' element={<MainLayout />}>
          <Route element={<RightLayout />} >
            <Route index element={<Home />} />
            <Route path='/playlist' element={user ? <Playlist /> : <NotLoggedInPage />} />
            <Route path='/explore' element={<Explore />} />
            <Route path='/favourites' element={user ? <Favourates /> : <NotLoggedInPage />} />
            <Route path='/recent' element={user ? <RecentPlaysPage /> : <NotLoggedInPage />} />
            <Route path='/uploads' element={user ? <UploadSongPage /> : <NotLoggedInPage />} />
            <Route path='/all-songs' element={<AllSongs />} />
            <Route path='/all-playlist' element={<AllPlaylist />} />
            <Route path='/all-artist' element={<AllArtist />} />
            <Route path='/playlist-page/:id' element={<PlaylistPage />} />
            <Route path='/artist-page/:id' element={<ArtistPage />} />
            <Route path='/create-playlist' element={user ? <CreateEditPlaylist /> : <NotLoggedInPage />} />
            <Route path='/upload-song' element={user ? <UploadEditSong /> : <NotLoggedInPage />} />
            <Route path='/edit-profile' element={user ? <EditUserProfile /> : <NotLoggedInPage />} />
            <Route path='/create-artist' element={user ? <CreateArtistForm /> : <NotLoggedInPage />} />
            <Route path='/request-form' element={<RequestForm />} />
            <Route path='/search/:search' element={<SearchPage />} />
          </Route>
        </Route>
      </Routes>
      <PlayBar />
    </>
  )
}

export default App
