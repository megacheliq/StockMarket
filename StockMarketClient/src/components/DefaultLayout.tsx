import { useStateContext } from "../contexts/ContextProvider"
import { Navigate, Outlet } from 'react-router-dom'
import { ThemeProvider } from "./theme-provider";

export default function DefaultLayout() {
    const {user, token} = useStateContext();

    if (!token) {
        return <Navigate to='/login'/>
    }
    return (
        <ThemeProvider>
            {user?.username}
            <Outlet/>
        </ThemeProvider>
    )
}