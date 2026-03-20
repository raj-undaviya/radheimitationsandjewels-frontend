import { useNavigate } from "react-router-dom";
import ForgetPasswordCard from "../components/ForgetPasswordCard";
import resetImg from "../assets/images/ResetPass.png";

export default function ResetPassword() {
    const navigate = useNavigate();

    const handleReset = ({ password }) => {
        console.log("New Password:", password);

        // 👉 TODO: Call backend API to update password

        // ✅ After success → go to login
        navigate("/login");
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4">
            <ForgetPasswordCard
                mode="reset"          // 🔥 THIS IS KEY
                image={resetImg}
                onSubmit={handleReset}
                onLoginClick={() => navigate("/login")}
            />
        </div>
    );
}