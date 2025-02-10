import axios from 'axios'

const api = axios.create({
    baseURL:"http://localhost:3000/playlist"
})

export const fetchTopPlaylists =()=>  api.get('/?top=true').then(res=>res.data.playlists)