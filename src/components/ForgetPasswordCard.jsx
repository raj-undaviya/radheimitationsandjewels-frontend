import React from "react";
import resetImg from "../assets/images/ResetPass.png";
// import { useNavigate } from "react-router-dom";

const ForgetPasswordCard = ({
    mode = "email",
    title = mode === "email" ? "Reset Your Access" : "Create New Password",
    subtitle =
    mode === "email"
        ? "Enter your registered email. We'll send you a reset link."
        : "Enter your new password below.",
    onSubmit,
    onLoginClick,
    image = resetImg,
}) => {
    return (
        <div className="max-w-5xl w-full bg-linear-to-br from-[#1a0f0a] to-[#2b140a] rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row">

            {/* LEFT IMAGE */}
            <div className="md:w-1/2 hidden md:flex items-center justify-center bg-black/40 object-cover">
                <img
                    src={image}
                    alt="Reset Illustration"
                    className="w-full h-auto object-contain"
                />
            </div>

            {/* RIGHT FORM */}
            <div className="md:w-1/2 w-full p-8 sm:p-12 text-white">
                <h1 className="text-3xl sm:text-4xl font-bold mb-2">
                    {title.split(" ").slice(0, -1).join(" ")}{" "}
                    <span className="text-orange-500">
                        {title.split(" ").slice(-1)}
                    </span>
                </h1>

                <p className="text-gray-400 text-sm mb-8">
                    {subtitle}
                </p>

                <form
                    onSubmit={(e) => {
                        e.preventDefault();

                        if (mode === "email") {
                            const email = e.target.email.value;

                            if (!email) {
                                alert("Email is required");
                                return;
                            }

                            onSubmit && onSubmit({ email });

                        } else {
                            const password = e.target.password.value;
                            const confirmPassword = e.target.confirmPassword.value;

                            if (password.length < 6) {
                                alert("Password must be at least 6 characters");
                                return;
                            }

                            if (password !== confirmPassword) {
                                alert("Passwords do not match");
                                return;
                            }

                            onSubmit && onSubmit({ password });
                        }
                    }}
                >
                    {/* EMAIL OR PASSWORD FIELDS */}
                    {mode === "email" ? (
                        <div className="mb-6">
                            <label className="block text-sm mb-2 text-gray-300">
                                Email Address
                            </label>
                            <input
                                type="email"
                                name="email"
                                required
                                placeholder="name@example.com"
                                className="w-full px-4 py-3 rounded-lg bg-black/60 border border-gray-700 focus:ring-2 focus:ring-orange-500"
                            />
                        </div>
                    ) : (
                        <>
                            <div className="mb-6">
                                <label className="block text-sm mb-2 text-gray-300">
                                    New Password
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    required
                                    placeholder="Enter new password"
                                    className="w-full px-4 py-3 rounded-lg bg-black/60 border border-gray-700 focus:ring-2 focus:ring-orange-500"
                                />
                            </div>

                            <div className="mb-6">
                                <label className="block text-sm mb-2 text-gray-300">
                                    Confirm Password
                                </label>
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    required
                                    placeholder="Confirm password"
                                    className="w-full px-4 py-3 rounded-lg bg-black/60 border border-gray-700 focus:ring-2 focus:ring-orange-500"
                                />
                            </div>
                        </>
                    )}

                    {/* Button */}
                    <button
                        type="submit"
                        className="w-full bg-orange-500 hover:bg-orange-600 transition duration-300 py-3 rounded-lg font-semibold flex items-center justify-center gap-2"
                    >
                        {mode === "email" ? "Send Reset Link →" : "Reset Password →"}
                    </button>
                </form>

                {/* FOOTER */}
                <div className="mt-6 text-center text-sm text-gray-400">
                    Remember your password?{" "}
                    <span
                        onClick={onLoginClick}
                        className="text-orange-500 cursor-pointer hover:underline"
                    >
                        Log In
                    </span>
                </div>

                <div className="mt-6 text-center text-xs text-gray-600 tracking-widest">
                    SECURE VERIFICATION
                </div>
            </div>
        </div>
    );
};

export default ForgetPasswordCard;