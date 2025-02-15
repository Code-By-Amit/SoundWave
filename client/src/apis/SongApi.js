import axios from 'axios'

const api = axios.create({
    baseURL: "http://localhost:3000/songs"
})

export const fetchSong = () => api.get('/').then(res => res.data.songs);
export const fetchTopSongs = () => api.get('/?top=true').then(res => res.data.songs)
export const fetchSomeSongs = () => api.get('/?some=true').then(res => res.data.songs)
export const addtoRecentPlays = (id, token) =>
    api.post(`/recent/${id}`, {}, {
        withCredentials: true,
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).then(res => res.data.message);

export const getRecentPlays = (token) => api.get('/recent', { withCredentials: true, headers: { Authorization: `Bearer ${token}` } }).then(res => res.data.recentSong)
export const fetchFavourates = (token) => api.get('/favourates', { withCredentials: true, headers: { Authorization: `Bearer ${token}` } }).then(res => res.data.favourates)
export const likeUnlikeSong = (id, token) => api.post(`/like/${id}`,{}, { withCredentials: true, headers: { Authorization: `Bearer ${token}` } }).then(res => res.data.message)