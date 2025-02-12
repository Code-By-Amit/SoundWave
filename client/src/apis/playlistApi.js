import axios from 'axios'

const api = axios.create({
    baseURL: "http://localhost:3000/playlist"
})

export const fetchTopPlaylists = () => api.get('/?top=true').then(res => res.data.playlists)
export const fetchAllPlaylist = () => api.get('/?all=true').then(res => res.data.playlists)
export const fetchPlaylistById = (id) => api.get(`/${id}`).then(res => res.data.playlist)
export const fetchUserCreatedSavedPlaylist = (token) => api.get('/user-playlists/?saved=true&yours=true',
    {
        withCredentials: true,
        headers: { Authorization: `Bearer ${token}` }
    }).then(res => res.data)