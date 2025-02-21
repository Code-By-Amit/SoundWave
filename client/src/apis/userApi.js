import axios from 'axios'

const api = axios.create({
    baseURL: `${import.meta.env.VITE_BACKEND_URL}/auth`
})

export const loginUser = (data) => api.post('/login', data,{withCredentials:true}).then(res => res.data)
export const signupUser = (data) => api.post('/signup', data,{withCredentials:true}).then(res => res.data)
export const logoutUser = () => api.post('/logout',{},{withCredentials:true}).then(res => res.data)
export const updateUserProfile = (data) => api.patch('/update',data,{withCredentials:true}).then(res => res.data)
export const fetchAuthUser = () => api.get('/me',{ withCredentials: true, }).then((res => res.data.user))