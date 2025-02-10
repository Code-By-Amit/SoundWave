import axios from 'axios'

const api = axios.create({
    baseURL:"http://localhost:3000/songs"
})

export const fetchSong = () => api.get('/').then(res=>res.data.songs);
export const fetchTopSongs = () => api.get('/?top=true').then(res=>res.data.songs)
export const fetchSomeSongs = () => api.get('/?some=true').then(res=>res.data.songs)