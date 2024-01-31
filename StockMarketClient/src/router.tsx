import { createBrowserRouter, Navigate } from "react-router-dom";
import NotFound from "./views/NotFound";
import DefaultLayout from "./components/DefaultLayout";
import GuestLayout from "./components/GuestLayout";
import Login from "./views/Login";
import SignUp from "./views/SignUp";
import DashBoard from "./views/DashBoard";
import StockList from "./components/pages/stocklist";
import StockInfo from "./components/pages/stockinfo";
import Portfolio from "./components/pages/portfolioList";

const router = createBrowserRouter([
    {
        path: '/',
        element: <DefaultLayout/>,
        children: [
            {
                path: '/',
                element: <Navigate to='/dashboard'/>
            },
            {
                path: '/dashboard',
                element: <DashBoard/>,
                children: [
                    {
                        path: '/dashboard/all',
                        element: <StockList/>,
                    },
                    {
                        path: '/dashboard/all/:symbol',
                        element: <StockInfo/>
                    },
                    {
                        path: '/dashboard/portfolio',
                        element: <Portfolio/>
                    }
                ]
            }
        ]
    },
    {
        path: '/',
        element: <GuestLayout/>,
        children: [
            {
                path: '/login',
                element: <Login/>
            },
            {
                path: '/signup',
                element: <SignUp/>
            }
        ]
    },
    {
        path: '*',
        element: <NotFound/>
    }
])

export default router;