import { Link } from "react-router-dom";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function Register() {

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors, isValid }
    } = useForm({ mode: "onChange" });

    const [showPassword, setShowPassword] = useState(false);

    const password = watch("password");

    const onSubmit = (data) => {
        console.log("User Data:", data);
        alert("Registration Successful...");
    };

    const getStrength = () => {
        if (!password) return "";

        if (password.length < 6) return "Weak";
        if (password.length < 10) return "Medium";
        return "Strong";
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#1c0f09] px-4">

            <div className="w-full max-w-md bg-[#2a140c] rounded-3xl p-8 shadow-2xl border border-[#3b2017]">

                {/* Title */}
                <h2 className="text-3xl font-bold text-center text-white mb-2">
                    Create Your Account
                </h2>

                <p className="text-gray-400 text-center text-sm mb-6">
                    Join our inner circle for exclusive access to bespoke imitation jewels
                </p>

                {/* Form */}
                <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>

                    {/* First + Last Name */}
                    <div className="grid grid-cols-2 gap-4">

                        <div>
                            <label className="text-xs text-gray-400">First Name</label>
                            <input
                                type="text"
                                placeholder="Aarav"
                                {...register("firstName", { required: "First name required" })}
                                className="w-full mt-1 px-3 py-2 bg-[#1c0f09] border border-[#3b2017] rounded-md text-sm text-white outline-none focus:border-orange-500"
                            />
                            <p className="text-red-500 text-xs">{errors.firstName?.message}</p>
                        </div>

                        <div>
                            <label className="text-xs text-gray-400">Last Name</label>
                            <input
                                type="text"
                                placeholder="Sharma"
                                {...register("lastName", { required: "Last name required" })}
                                className="w-full mt-1 px-3 py-2 bg-[#1c0f09] border border-[#3b2017] rounded-md text-sm text-white outline-none focus:border-orange-500"
                            />
                            <p className="text-red-500 text-xs">{errors.lastName?.message}</p>
                        </div>

                    </div>

                    {/* Username */}
                    <div>
                        <label className="text-xs text-gray-400">Username</label>
                        <input
                            type="text"
                            placeholder="aarav_jewels"
                            {...register("username", { required: "Username required" })}
                            className="w-full mt-1 px-3 py-2 bg-[#1c0f09] border border-[#3b2017] rounded-md text-sm text-white outline-none focus:border-orange-500"
                        />
                        <p className="text-red-500 text-xs">{errors.username?.message}</p>
                    </div>

                    {/* Email */}
                    <div>
                        <label className="text-xs text-gray-400">Email Address</label>
                        <input
                            type="email"
                            placeholder="aarav@luxury.com"
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

                    {/* Phone */}
                    <div>
                        <label className="text-xs text-gray-400">Phone Number</label>
                        <input
                            type="tel"
                            placeholder="+91 98765 43210"
                            {...register("phone", {
                                required: "Phone required",
                                pattern: {
                                    value: /^[0-9]{10}$/,
                                    message: "Enter valid 10 digit phone"
                                }
                            })}
                            className="w-full mt-1 px-3 py-2 bg-[#1c0f09] border border-[#3b2017] rounded-md text-sm text-white outline-none focus:border-orange-500"
                        />
                        <p className="text-red-500 text-xs">{errors.phone?.message}</p>
                    </div>

                    {/* Password */}
                    <div className="grid grid-cols-2 gap-4">

                        <div>
                            <label className="text-xs text-gray-400">Password</label>
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
                            <p className="text-red-500 text-xs">{errors.password?.message}</p>

                            {password && (
                                <p className="text-xs text-orange-400 mt-1">
                                    Strength: {getStrength()}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="text-xs text-gray-400">Confirm Password</label>
                            <input
                                type="password"
                                placeholder="******"
                                {...register("confirmPassword", {
                                    validate: value =>
                                        value === password || "Passwords do not match"
                                })}
                                className="w-full mt-1 px-3 py-2 bg-[#1c0f09] border border-[#3b2017] rounded-md text-sm text-white outline-none focus:border-orange-500"
                            />
                            <p className="text-red-500 text-xs">
                                {errors.confirmPassword?.message}
                            </p>
                        </div>

                    </div>

                    {/* Button */}
                    <button
                        disabled={!isValid}
                        type="submit"
                        className={`w-full mt-4 py-3 rounded-lg font-semibold transition
                            ${isValid
                                ? "bg-linear-to-r from-orange-400 to-orange-600 hover:opacity-90"
                                : "bg-gray-600 cursor-not-allowed"}`}
                    >
                        <Link to="/login">
                            Initialize Membership →
                        </Link>
                    </button>

                </form>

                {/* Login Link */}
                <p className="text-gray-400 text-center text-sm mt-6">
                    Already have an account?{" "}
                    <Link to="/login" className="text-orange-500 hover:underline">
                        Sign In
                    </Link>
                </p>

            </div>
        </div>
    );
}