import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import { MainLayout } from './components/Layout/MainLayout'
import { Home } from './Pages/Home'
import { Playlist } from './Pages/Playlist'
import { Favourates } from './Pages/Favourites'
import { RightLayout } from './components/Layout/RightLayout'
import { Explore } from './Pages/Explore'
import { LoginPage } from './Pages/LoginPage'
import { SignUpPage } from './Pages/SignUpPage'

function App() {

  return (
    <Routes>
      <Route path='/login' element={<LoginPage/>} />
      <Route path='/signup' element={<SignUpPage/>} />
      <Route path='/' element={<MainLayout />}>
        <Route element={<RightLayout />} >
          <Route index element={<Home />} />
          <Route path='/playlist' element={<Playlist />} />
          <Route path='/favourites' element={<Favourates />} />
          <Route path='/explore' element={<Explore />} />
        </Route>
      </Route>
    </Routes>
  )
}

export default App
