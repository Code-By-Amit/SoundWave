import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import { MainLayout } from './components/Layout/MainLayout'
import { Home } from './Pages/Home'
import { Playlist } from './Pages/Playlist'
import { Favourates } from './Pages/Favourites'

function App() {

  return (
    <Routes>
      <Route path='/' element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path='/playlist' element={<Playlist/>}/>
        <Route path='/favourites' element={<Favourates/>} />
      </Route>
    </Routes>
  )
}

export default App
