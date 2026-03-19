import React from "react";
import { useNavigate } from "react-router-dom";
import ForgetPasswordCard from "../components/ForgetPasswordCard";
import resetImg from "../assets/images/ResetPass.png";

const ForgetPassword = () => {
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        const email = e.target.email.value;
        console.log("Send reset link to:", email);
    };

    //  THIS FUNCTION REDIRECTS TO LOGIN
    const goToLogin = () => {
        navigate("/login");
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4">
            <ForgetPasswordCard
                image={resetImg}
                onSubmit={handleSubmit}
                onLoginClick={goToLogin}   //  PASS HERE
            />
        </div>
    );
};

export default ForgetPassword;