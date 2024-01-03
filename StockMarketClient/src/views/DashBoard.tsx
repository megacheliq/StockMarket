import { UserNav } from "@/components/user-nav";
import { MainNav } from "@/components/dashboard-main-nav";
import { Outlet } from "react-router-dom";

export default function DashBoard() {
    return (
        <>
            <div className="hidden flex-col md:flex">
                <div className="border-b">
                    <div className="flex h-16 items-center px-4">
                        <MainNav className="mx-6"/>
                        <div className="ml-auto flex items-center space-x-4">
                            <UserNav />
                        </div>
                    </div>
                </div>
                <div className="flex-1 space-y-4 p-8 pt-6">
                    <div className="flex items-center justify-between space-y-2">
                        <Outlet/>
                    </div>
                </div>
            </div>
        </>
    )
}