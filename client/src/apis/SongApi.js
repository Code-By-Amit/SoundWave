import axios from 'axios'

const api = axios.create({
    baseURL: `${import.meta.env.VITE_BACKEND_URL}/songs`,
    withCredentials: true
})

export const fetchSong = () => api.get('/?all=true').then(res => res.data.songs);
export const fetchTopSongs = () => api.get('/?top=true').then(res => res.data.songs)
export const fetchSomeSongs = () => api.get('/?some=true').then(res => res.data.songs)

export const addtoRecentPlays = (id, token) => api.post(`/recent/${id}`, {}, { headers: { Authorization: `Bearer ${token}` } }).then(res => res.data.message);

export const getRecentPlays = (token) => api.get('/recent', { headers: { Authorization: `Bearer ${token}` } }).then(res => res.data.recentSong)
export const fetchFavourates = (token) => api.get('/favourates', { headers: { Authorization: `Bearer ${token}` } }).then(res => res.data.favourates)
export const likeUnlikeSong = (id, token) => api.post(`/like/${id}`, {}, { headers: { Authorization: `Bearer ${token}` } }).then(res => res.data.message)
export const uploadSong = (data, token) => api.post('/', data, { headers: { Authorization: `Bearer ${token}` } }).then(res => res.data.message)
export const fetchUserUploads = (token) => api.get('/useruploads', { headers: { Authorization: `Bearer ${token}` } }).then(res => res.data.userUploads)
export const deleteSong = (id, token) => api.delete(`/delete/${id}`, { headers: { Authorization: `Bearer ${token}` } }).then(res => res.data.message)
export const searchSong = (search) => api.get(`/?search=${search}`).then(res => res.data)
