import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";

import API from "../api/axiosInstance";
import { loginUserAPI, AddToCartAPI } from "../api/api";

export default function Login() {

    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();

    const {
        register,
        handleSubmit,
        formState: { errors, isValid }
    } = useForm({ mode: "onChange" });

    const [remember, setRemember] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const onSubmit = async (data) => {
        try {
            setLoading(true);

            const payload = {
                email: data.email,
                password: data.password
            };

            const response = await API.post(
                loginUserAPI(),
                payload
            );

            console.log("FULL RESPONSE:", response.data);

            // ✅ CORRECT TOKEN PATH (IMPORTANT FIX)
            const token = response.data?.data?.token;

            if (!token) {
                alert("Token not found in response");
                return;
            }

            // ✅ SAVE TOKEN
            localStorage.setItem("token", token);

            // ✅ SAVE USER
            localStorage.setItem("user", JSON.stringify({
                email: data.email
            }));

            // ✅ AUTO ADD TO CART
            const pending = JSON.parse(localStorage.getItem("pendingCart"));

            if (pending) {
                try {
                    await API.post(AddToCartAPI(), {
                        product: pending.id,
                        quantity: 1,
                    });

                    localStorage.removeItem("pendingCart");

                    console.log("Auto added to cart");

                } catch (err) {
                    console.log("Auto add failed", err);
                }
            }

            // ✅ REDIRECT BACK
            const from = location.state?.from || "/";
            navigate(from);

        } catch (error) {
            console.log("LOGIN ERROR:", error.response?.data);

            const msg =
                error?.response?.data?.errors?.email?.[0] ||
                error?.response?.data?.message ||
                "Login failed";

            alert(msg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#1c0f09] px-4">

            <div className="w-full max-w-md bg-[#2a140c] rounded-2xl p-8 shadow-2xl border border-[#3b2017]">

                <h2 className="text-3xl font-bold text-center text-white mb-2">
                    Welcome Back
                </h2>

                <p className="text-gray-400 text-center text-sm mb-6">
                    Sign in to access your wishlist and orders
                </p>

                <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>

                    {/* EMAIL */}
                    <div>
                        <label className="text-xs text-gray-400">Email Address</label>

                        <input
                            type="email"
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

                    {/* PASSWORD */}
                    <div>
                        <label className="text-xs text-gray-400">Password</label>

                        <div className="relative">

                            <input
                                type={showPassword ? "text" : "password"}
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
                                className="absolute right-3 top-3 text-gray-400 hover:text-orange-400"
                            >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>

                        </div>

                        <p className="text-red-500 text-xs">{errors.password?.message}</p>
                    </div>

                    {/* REMEMBER */}
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

                    {/* BUTTON */}
                    <button
                        disabled={!isValid || loading}
                        type="submit"
                        className={`w-full py-3 rounded-lg font-semibold transition
                        ${isValid
                                ? "bg-gradient-to-r from-orange-400 to-orange-600 hover:opacity-90"
                                : "bg-gray-600 cursor-not-allowed"}`}
                    >
                        {loading ? (
                            <div className="flex items-center justify-center gap-2">
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                Signing In...
                            </div>
                        ) : (
                            "Sign In →"
                        )}
                    </button>

                </form>

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