import axios from 'axios'

const api = axios.create({
    baseURL: `${import.meta.env.VITE_BACKEND_URL}/auth`,
    withCredentials: true
})


export const loginUser = (data) => api.post('/login', data, {}).then(res => res.data)
export const signupUser = (data) => api.post('/signup', data, {}).then(res => res.data)
export const logoutUser = () => api.post('/logout', {}, {}).then(res => res.data)
export const updateUserProfile = (data,token) => api.patch('/update', data, { headers: { Authorization: `Bearer ${token}` } }).then(res => res.data)
export const fetchAuthUser = (token) => api.get('/me', { headers: { Authorization: `Bearer ${token}` } }).then((res => res.data.user))