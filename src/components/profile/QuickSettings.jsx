import { useNavigate } from "react-router-dom";

export default function QuickSettings() {

    const navigate = useNavigate();

    const handleLogout = () => {
        // ✅ Remove user + token
        localStorage.removeItem("user");
        localStorage.removeItem("token");

        // 🔥 Notify app (optional but good)
        window.dispatchEvent(new Event("userUpdated"));

        // ✅ Redirect
        navigate("/login");
    };

    return (
        <div className="bg-[#1c0f09] p-5 rounded-xl border border-[#ffffff10]">

            <h3 className="font-semibold mb-4">Quick Settings</h3>

            <button
                onClick={handleLogout}
                className="w-full bg-red-500 py-2 rounded-md hover:bg-red-600"
            >
                Sign Out
            </button>

        </div>
    );
}