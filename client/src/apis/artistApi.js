import axios from 'axios'

const api = axios.create({
    baseURL: `${import.meta.env.VITE_BACKEND_URL}/artists`
})

export const fetchSomeArtist = () => api.get('/?some=true').then(res => res.data.artists)
export const fetchAllArtist = () => api.get('/?all=true').then(res => res.data.artists)
export const fetchArtistById = (id) => api.get(`/${id}`).then(res => res.data.artist)
export const createArtist = (data) => api.post('/', data, { withCredentials: true }).then(res => res.data)
export const fetchArtistNameAndID =(search) => api.get(`/?search=${search}&limit=6&fields=_id,name`).then(res => res.data)