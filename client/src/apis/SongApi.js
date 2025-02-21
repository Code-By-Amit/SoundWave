import axios from 'axios'

const api = axios.create({
    baseURL: `${import.meta.env.VITE_BACKEND_URL}/songs`
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
export const uploadSong = (data) => api.post('/',data,{withCredentials:true}).then(res=>res.data.message)
export const fetchUserUploads = () => api.get('/useruploads',{withCredentials:true}).then(res=>res.data.userUploads)
export const deleteSong = (id) => api.delete(`/delete/${id}`,{withCredentials:true}).then(res=>res.data.message)
