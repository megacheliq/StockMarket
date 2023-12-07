import { LoginForm } from "@/components/forms/LoginForm";
import { ModeToggle } from "@/components/mode-toggle";

export default function Login() {
    return (
        <>
            <div className="absolute top-0 right-0 p-4">
                <ModeToggle/>
            </div>
            <div className="grid grid-cols-2 h-[100vh]">
                <div className="bg-custombl w-[100%] flex flex-col items-start justify-between p-24 text-white font-semibold">
                    <p className="text-6xl">StockMarket</p>
                    <p className="text-4xl mb-12">Инвестируй в будущее с уверенностью</p>
                </div>
                <LoginForm/>
            </div>
        </>
    )
}