import axios from 'axios'

const api = axios.create({
    baseURL:"http://localhost:3000/songs"
})

export const fetchSong =async () => api.get('/').then(res=>res.data);