import { Link } from "react-router-dom";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors, isValid }
    } = useForm({ mode: "onChange" });

    const [remember, setRemember] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const onSubmit = (data) => {
        console.log("Login Data:", data);

        // redirect to home page
        navigate("/");
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#1c0f09] px-4">

            <div className="w-full max-w-md bg-[#2a140c] rounded-2xl p-8 shadow-2xl border border-[#3b2017]">

                {/* Title */}
                <h2 className="text-3xl font-bold text-center text-white mb-2">
                    Welcome Back
                </h2>

                <p className="text-gray-400 text-center text-sm mb-6">
                    Sign in to access your wishlist and orders
                </p>

                {/* Form */}
                <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>

                    {/* Email */}
                    <div>
                        <label className="text-xs text-gray-400">Email Address</label>

                        <input
                            type="email"
                            placeholder="example@jewels.com"
                            {...register("email", {
                                required: "Email required",
                                pattern: {
                                    value: /\S+@\S+\.\S+/,
                                    message: "Invalid email"
                                }
                            })}
                            className="w-full mt-1 px-3 py-2 bg-[#1c0f09] border border-[#3b2017] rounded-md text-sm text-white outline-none focus:border-orange-500"
                        />

                        <p className="text-red-500 text-xs">{errors.email?.message}</p>
                    </div>

                    {/* Password */}
                    <div>

                        <label className="text-xs text-gray-400">Password</label>

                        <div className="relative">

                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="******"
                                {...register("password", {
                                    required: "Password required",
                                    minLength: {
                                        value: 6,
                                        message: "Minimum 6 characters"
                                    }
                                })}
                                className="w-full mt-1 px-3 py-2 bg-[#1c0f09] border border-[#3b2017] rounded-md text-sm text-white outline-none focus:border-orange-500"
                            />

                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-3 text-gray-400 hover:text-orange-400 "
                            >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>

                        </div>

                        <p className="text-red-500 text-xs">{errors.password?.message}</p>

                    </div>

                    {/* Remember + Forgot */}
                    <div className="flex items-center justify-between text-sm">

                        <label className="flex items-center gap-2 text-gray-400">
                            <input
                                type="checkbox"
                                checked={remember}
                                onChange={() => setRemember(!remember)}
                                className="accent-orange-500"
                            />
                            Remember Me
                        </label>

                        <Link to="/forgot-password" className="text-orange-500 hover:underline">
                            Forgot Password?
                        </Link>

                    </div>

                    {/* Button */}
                    <button
                        disabled={!isValid}
                        type="submit"
                        className={`w-full py-3 rounded-lg font-semibold transition
                        ${isValid
                                ? "bg-linear-to-r from-orange-400 to-orange-600 hover:opacity-90"
                                : "bg-gray-600 cursor-not-allowed"}`}
                    >
                        Sign In →
                    </button>

                </form>

                {/* Register Link */}
                <p className="text-gray-400 text-center text-sm mt-6">
                    Don't have an account?{" "}
                    <Link to="/register" className="text-orange-500 hover:underline">
                        Sign Up
                    </Link>
                </p>

            </div>

        </div>
    );
}