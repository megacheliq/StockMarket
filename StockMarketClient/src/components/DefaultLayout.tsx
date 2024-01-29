import { useStateContext } from "../contexts/ContextProvider"
import { Navigate, Outlet } from 'react-router-dom'
import { ThemeProvider } from "./theme-provider";
import { useEffect } from "react";
import axiosClient from "@/axios-client";

export default function DefaultLayout() {
    const {token, setUser} = useStateContext();

    if (!token) {
        return <Navigate to='/login'/>
    }

    useEffect(() => {
        axiosClient.get('/user')
            .then(({data}) => {
                setUser(data)
            })
    }, [])

    return (
        <ThemeProvider>
            <Outlet/> 
        </ThemeProvider>
    )
}