import {Outlet, Navigate} from 'react-router-dom'
import { useStateContext } from '../contexts/ContextProvider'
import { ThemeProvider } from "@/components/theme-provider"
import { ModeToggle } from "@/components/mode-toggle";

export default function GuestLayout() {
    const {token} = useStateContext();
    if (token) {
        return <Navigate to='/'/>
    }

    return (
        <ThemeProvider storageKey="vite-ui-theme">
            <div className="absolute top-0 right-0 p-4">
                <ModeToggle/>
            </div>
            <div className="grid grid-cols-2 h-[100vh]">
                <div className="bg-custombl w-[100%] flex flex-col items-start justify-between p-24 text-white font-semibold">
                    <p className="text-6xl">StockMarket</p>
                    <p className="text-4xl mb-12">Инвестируй в будущее с уверенностью</p>
                </div>
                <Outlet/>
            </div>
            
        </ThemeProvider>
    )
}