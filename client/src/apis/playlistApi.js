import axios from 'axios'

const api = axios.create({
    baseURL: `${import.meta.env.VITE_BACKEND_URL}/playlist`,
    withCredentials: true
})

export const fetchTopPlaylists = () => api.get('/?top=true').then(res => res.data.playlists)
export const fetchAllPlaylist = () => api.get('/?all=true').then(res => res.data.playlists)
export const fetchPlaylistById = (id) => api.get(`/${id}`).then(res => res.data.playlist)
export const createPlaylist = (data) => api.post('/create', data, {})

export const fetchUserCreatedSavedPlaylist = (token) => api.get('/user-playlists/?saved=true&yours=true',
    {
        withCredentials: true,
        headers: { Authorization: `Bearer ${token}` }
    }).then(res => res.data)


export const saveUnsavePlaylist = (playlistId, token) => api.patch(`/${playlistId}/toggle-save`, {}, { headers: { Authorization: `Bearer ${token}` } }).then(res => res.data)
export const deletePlaylist = (playlistId, token) => api.delete(`/${playlistId}`, { headers: { Authorization: `Bearer ${token}` } }).then(res => res.data)
export const fetchUserPlaylistNameAndID = (token) => api.get(`/user-playlists?fields=_id,name,songs`,
    {
        headers: {
            Authorization: `Bearer ${token}`
        }

    }).then(res => res.data.playlists)


export const addOrRemoveToPlaylist = (playlistID, songId, token) => api.patch(`/${playlistID}/toggle-song-save`, { songId }, { headers: { Authorization: `Bearer ${token}` } }).then(res => res.data)