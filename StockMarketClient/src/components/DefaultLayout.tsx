import { useStateContext } from "../contexts/ContextProvider"
import { Navigate, Outlet } from 'react-router-dom'

export default function DefaultLayout() {
    const {user, token} = useStateContext();

    if (!token) {
        return <Navigate to='/login'/>
    }
    return (
        <div>
            <Outlet/>
        </div>
    )
}