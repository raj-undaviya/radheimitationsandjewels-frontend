import { Mail, Lock, ArrowRight, User } from "lucide-react";
import { useState, useEffect } from "react";
import { FaGithub } from "react-icons/fa";
// import { FcGoogle } from "react-icons/fc";
import { SiGoogle } from "react-icons/si";
import loginSound from "../assets/sound/Ephemeral_Bloom.mp3";

export default function Login() {
    const [tab, setTab] = useState("login");

    //play sound when component mounts
    useEffect(() => {
        const audio = new Audio(loginSound);
        audio.volume = 0.5;

        //play sound
        audio.play().catch(() => {
            //user first click play
            const handleFirstClick = () => {
                audio.play().catch(err => console.log("Audio failed:", err));
                window.removeEventListener("click", handleFirstClick);
            };
            window.addEventListener("click", handleFirstClick);
        });

    }, []);

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#0F0F10] px-2">

            <div className="w-full max-w-md bg-[#121214] border border-white/5 p-7 shadow-2xl">

                {/* Logo */}
                {/* <div className="text-center mb-4">
                    <div className="mx-auto w-12 h-12 bg-[#272521] border border-[#453F33] rounded-full flex items-center justify-center mb-2">
                        <div className="w-5 h-5 border-2 border-[#C9B582] rotate-45 rounded-sm cursor-pointer"></div>
                    </div>
                    <h1 style={{ fontFamily: "'High-Contrast Serif', serif" }} className="text-[#C9B582] tracking-[0.20em] text-2xl mt-4 ">
                        LUMIÈRE
                    </h1>
                </div> */}
                {/* Logo */}
                <div className="text-center mb-4">
                    <div className="group mx-auto w-12 h-12 bg-[#272521] border border-[#453F33] rounded-full flex items-center justify-center mb-2 transition-all duration-300 hover:scale-110 hover:border-[#C9B582] hover:shadow-[0_0_10px_#C9B582]">
                        <div className="w-5 h-5 border-2 border-[#C9B582] rotate-45 rounded-sm transition-transform duration-300 group-hover:rotate-135"></div>
                    </div>

                    <h1
                        style={{ fontFamily: "'High-Contrast Serif', serif" }}
                        className="text-[#C9B582] tracking-[0.20em] text-2xl mt-4 transition-all duration-300 hover:text-[#e5d3a0]"
                    >
                        LUMIÈRE
                    </h1>
                </div>

                {/* Heading */}
                <h2 className="text-[#F2F2F2] text-2xl font-semibold text-center" style={{ fontFamily: "'Playfair Display', serif" }}>
                    Welcome Back
                </h2>

                <p className="text-[#86868E] text-sm text-center mb-6 tracking-[0.10rem]" style={{ fontFamily: "'Inter', sans-serif" }}>
                    Enter your credentials to access your account
                </p>

                {/* Tabs LOGIN & REGISTER Buttons*/}
                <div className="flex py-4 justify-center items-center bg-[#111] overflow-hidden mb-6 ">
                    <button
                        onClick={() => setTab("login")}
                        className={`flex-1 h-6 text-[10px] tracking-[0.10rem] ${tab === "login"
                            ? "bg-[#C9B582] text-[#0F0F10] font-semibold"
                            : "text-[#A0A0A9]"
                            }`}
                    >
                        LOGIN
                    </button>

                    <button
                        onClick={() => setTab("register")}
                        className={`flex-1 h-6 text-[10px] tracking-[0.10rem] ${tab === "register"
                            ? "bg-[#C9B582] text-[#0F0F10] font-semibold"
                            : "text-[#A0A0A9]"
                            }`}
                    >
                        REGISTER
                    </button>
                </div>

                {/* conditional tabs */}
                {/* Form content */}
                <div className="space-y-4">
                    {tab === "login" && (
                        <>
                            {/* LOGIN FORM */}
                            <div className="flex h-10 items-center gap-3 bg-[#111] border border-white/5 px-3 py-3 mb-4 hover:border-[#6D634B] ">
                                <Mail size={18} className="text-[#A1A1AA]" />
                                <input
                                    type="email"
                                    placeholder="Email address"
                                    className="bg-transparent outline-none text-white w-full text-sm"
                                    required
                                />
                            </div>

                            <div className="flex h-10 items-center gap-3 bg-[#111] border border-white/5 px-3 py-3 mb-5 hover:border-[#6D634B] ">
                                <Lock size={18} className="text-[#A1A1AA]" />
                                <input
                                    type="password"
                                    placeholder="Password"
                                    className="bg-transparent outline-none text-white w-full text-sm"
                                    required
                                />
                            </div>

                            <button className="w-full bg-[#c8b07a] text-[#0F0F10] text-[12px] py-3 flex items-center justify-center gap-4 hover:bg-[#d7c48f] tracking-[0.10rem] transition">
                                SIGN IN
                                <ArrowRight size={18} />
                            </button>
                        </>
                    )}

                    {tab === "register" && (
                        <>
                            {/* REGISTER FORM */}
                            <div className="flex h-10 items-center gap-3 bg-[#111] border border-white/5 px-3 py-3 hover:border-[#6D634B] ">
                                <User size={18} className="text-[#A1A1AA]" />
                                <input
                                    type="text"
                                    placeholder="Full Name"
                                    className="bg-transparent outline-none text-white w-full text-sm"
                                    required
                                />
                            </div>

                            <div className="flex h-10 items-center gap-3 bg-[#111] border border-white/5 px-3 py-3 hover:border-[#6D634B] ">
                                <Mail size={18} className="text-[#A1A1AA]" />
                                <input
                                    type="email"
                                    placeholder="Email address"
                                    className="bg-transparent outline-none text-white w-full text-sm"
                                    required
                                />
                            </div>

                            <div className="flex h-10 items-center gap-3 bg-[#111] border border-white/5 px-3 py-3 hover:border-[#6D634B] ">
                                <Lock size={18} className="text-[#A1A1AA]" />
                                <input
                                    type="password"
                                    placeholder="Create Password"
                                    className="bg-transparent outline-none text-white w-full text-sm"
                                    required
                                />
                            </div>

                            <button className="w-full bg-[#C9B582] text-[#0F0F10] text-[13px] py-3 flex items-center justify-center gap-3 hover:bg-[#d7c48f] tracking-[0.10rem] transition">
                                CREATE ACCOUNT
                                <ArrowRight size={18} />
                            </button>
                        </>
                    )}
                </div>

                {/* Divider */}
                <div className="flex items-center gap-3 my-8 text-[#A1A1AA] text-[10px] tracking-[0.10rem]">
                    <div className="flex-1 h-px bg-white/10"></div>
                    OR CONTINUE WITH
                    <div className="flex-1 h-px bg-white/10"></div>
                </div>

                {/* Social */}
                <div className="flex gap-3">
                    <button className="flex-1 h-10 flex items-center justify-center gap-4 bg-[#111] border border-[#2B2B2C] text-[#F2F2F2] text-[10px] hover:bg-[#1F1F20] tracking-[0.10rem]">
                        <FaGithub size={20} />
                        GITHUB
                    </button>

                    <button className="flex-1 h-10 flex items-center justify-center gap-4 bg-[#111] border border-[#2B2B2C] text-[#F2F2F2] text-[10px] hover:bg-[#1F1F20] tracking-[0.10rem] font-semibold">
                        {/* <FcGoogle size={22} color="#FFFFFF"/> */}
                        <SiGoogle size={18} color="#FFFFFF" />
                        GOOGLE
                    </button>
                </div>

            </div>
        </div>
    );
}