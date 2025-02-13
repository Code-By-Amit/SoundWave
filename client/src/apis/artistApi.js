import axios from 'axios'

const api = axios.create({
    baseURL:"http://localhost:3000/artists"
})

export const fetchSomeArtist =()=>  api.get('/?some=true').then(res=>res.data.artists)
export const fetchAllArtist = ()=> api.get('/?all=true').then(res=>res.data.artists)
export const fetchArtistById = (id)=> api.get(`/${id}`).then(res=>res.data.artist)