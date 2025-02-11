import { createContext, useContext, useState } from "react";
import { QueryClient, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { fetchAuthUser, loginUser, signupUser } from "../apis/userApi";
const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem('token') || null);
 
    const queryClient = useQueryClient()

    const { data:user, isLoading } = useQuery({
        queryKey: ['authUser'],
        queryFn: () => fetchAuthUser(token),
        enabled: !!token
    })

    const loginMutation = useMutation({
        mutationKey: ['login'],
        mutationFn: async (credentials) => {
            const response = await loginUser(credentials);
            return response
        },
        onSuccess: (data) => {
            localStorage.setItem('token', data.token)
            setToken(data.token)
            queryClient.invalidateQueries(['authUser'])
        }
    })

    const signupMutation = useMutation({
        mutationKey: ['signup'],
        mutationFn: async (credentials) => {
            const response = await signupUser(credentials);
            return response
        },
        onSuccess: (data) => {
            localStorage.setItem('token', data.token)
            setToken(data.token)
            queryClient.invalidateQueries(['authUser'])
        },
    })

    const logout = ()=>{
        localStorage.removeItem('token')
        setToken(null)
        queryClient.removeQueries(['authUser'])
    }

    return <UserContext.Provider value={{ user, loginMutation, signupMutation, logout}}>
        {children}
    </UserContext.Provider>
}

export const authUser = () => useContext(UserContext)