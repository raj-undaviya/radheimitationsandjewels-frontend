import { Outlet } from "react-router-dom";

export default function AuthLayout() {
    return (
        <div className="min-h-screen bg-[#1c0f09] flex items-center justify-center">
            <Outlet />
        </div>
    );
}