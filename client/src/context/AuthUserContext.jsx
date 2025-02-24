import { createContext, useContext, useState } from "react";
import { QueryClient, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { fetchAuthUser, loginUser, logoutUser, signupUser } from "../apis/userApi";
const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem("token") || null)
    const queryClient = useQueryClient()

    const { data: user, isLoading } = useQuery({
        queryKey: ['authUser'],
        queryFn: () => fetchAuthUser(token),
        enabled:!!token,
        staleTime: Infinity,
        cacheTime: 2 * 60 * 60 * 1000, // 2 hours → Keep cached data for 2 hours
        refetchOnWindowFocus: false, // No unnecessary refetching when switching tabs
        refetchOnReconnect: false, // No refetching when network reconnects
        keepPreviousData: true, // Keep old data while fetching new data
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

    const logoutMutation = useMutation({
        mutationKey: ['logout'],
        mutationFn: logoutUser,
        onSuccess: () => {
            localStorage.removeItem('token')
            setToken(null)
            queryClient.removeQueries(['authUser'])
        }
    })

    const logout = () => {
        logoutMutation.mutate()
    }

    return <UserContext.Provider value={{ user, loginMutation, signupMutation, logout }}>
        {children}
    </UserContext.Provider>
}

export const authUser = () => useContext(UserContext)