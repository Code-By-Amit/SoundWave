import axios from 'axios'

const api = axios.create({
    baseURL: "http://localhost:3000/auth"
})

export const loginUser = (data) => api.post('/login', data).then(res => res.data)
export const signupUser = (data) => api.post('/signup', data).then(res => res.data)

export const fetchAuthUser = (token) => api.get('/me',
    {
        withCredentials: true,
        headers: { Authorization: `Bearer ${token}` }
    }).then((res =>{
        return res.data.user
    } ))