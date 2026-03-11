import { FiMenu, FiSearch, FiShoppingBag, FiX } from "react-icons/fi";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Navbar() {

    const [menuOpen, setMenuOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const navigate = useNavigate();

    return (
        <>
            {/* NAVBAR */}
            {/* <nav className="w-full bg-black text-gray-300 px-6 md:px-12 py-5 flex items-center justify-between"> */}
            <nav className="w-full h-22.5 bg-black text-gray-300 px-6 md:px-12 flex items-center justify-between">
                {/* LEFT */}
                <div className="flex items-center gap-8">

                    {/* Hamburger */}
                    <button
                        onClick={() => setMenuOpen(true)}
                        className="text-2xl md:hidden"
                    >
                        <FiMenu />
                    </button>

                    {/* Desktop menu */}
                    {/* <div className="hidden md:flex md:gap-3 gap-12 text-xl md:text-xs tracking-[0.25em]">
                        <a href="#">COLLECTIONS</a>
                        <a href="#">BRIDAL</a>
                        <a href="#">GIFTS</a>
                    </div> */}
                    <div className="hidden md:flex gap-3 lg:gap-12 text-xs lg:text-sm xl:text-base tracking-[0.25em]">
                        <a href="#">COLLECTIONS</a>
                        <a href="#">BRIDAL</a>
                        <a href="#">GIFTS</a>
                    </div>

                </div>

                {/* LOGO */}
                <div className="absolute left-1/2 transform -translate-x-1/2">
                    <h1 className="text-2xl tracking-[0.15em] text-[#C9B582]" style={{ fontFamily: "'High-Contrast Serif', serif" }}>
                        LUMIÈRE
                    </h1>
                </div>

                {/* RIGHT */}
                <div className="flex items-center gap-6 md:gap-8">

                    <FiSearch
                        onClick={() => setSearchOpen(true)}
                        className="text-xl cursor-pointer hover:text-[#C9B582] transition"
                    />

                    <div className="relative">
                        <FiShoppingBag className="text-xl cursor-pointer" />
                        <span className="absolute -top-1 -right-1 text-[9px] bg-[#C9B582] text-black rounded-full px-1">
                            2
                        </span>
                    </div>

                    {/* Desktop Sign in */}
                    <button
                        onClick={() => navigate("/login")}
                        className="hidden md:block border border-gray-600 px-5 py-1 text-sm tracking-widest hover:border-white"
                    >
                        SIGN IN
                    </button>

                </div>

            </nav>

            {/* SEARCH PANEL */}
            <div
                className={`fixed top-0 left-0 w-full bg-black/95 backdrop-blur-md 
  border-b border-[#C9B582]/30 z-50
  transform transition-transform duration-500 ease-out
  ${searchOpen ? "translate-y-0" : "-translate-y-full"}`}
            >

                <div className="flex items-center justify-between px-6 md:px-12 py-6">

                    {/* Search input */}
                    <input
                        type="text"
                        placeholder="Search jewellery..."
                        className="w-full md:w-[70%] lg:w-[50%] bg-transparent 
      border-b border-[#C9B582] text-white text-lg 
      outline-none placeholder-gray-400 pb-2"
                    />

                    {/* Close button */}
                    <button
                        onClick={() => setSearchOpen(false)}
                        className="ml-6 text-2xl text-gray-400 hover:text-[#C9B582]"
                    >
                        <FiX />
                    </button>

                </div>

            </div>

            {/* OVERLAY */}
            {menuOpen && (
                <div
                    onClick={() => setMenuOpen(false)}
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
                ></div>
            )}

            {/* SIDE MENU */}
            <div
                className={`fixed top-0 left-0 h-full w-75 z-50
                        bg-linear-to-b from-black via-[#0f0f0f] to-[#1a1a1a]
                        border-r border-[#C9B582]/30 
                        transform transition-transform duration-500 ease-out
                        ${menuOpen ? "translate-x-0" : "-translate-x-full"}`}
            >

                {/* Close Button */}
                <button
                    className="absolute top-6 right-6 text-3xl text-gray-400 hover:text-[#C9B582] transition"
                    onClick={() => setMenuOpen(false)}
                >
                    ✕
                </button>

                {/* Menu Items */}
                <div className="flex flex-col gap-10 mt-28 pl-12 text-lg tracking-[0.25em] text-gray-200">

                    <a className="hover:text-[#C9B582] transition duration-300 cursor-pointer">
                        COLLECTIONS
                    </a>

                    <a className="hover:text-[#C9B582] transition duration-300 cursor-pointer">
                        BRIDAL
                    </a>

                    <a className="hover:text-[#C9B582] transition duration-300 cursor-pointer">
                        GIFTS
                    </a>

                    <button
                        onClick={() => navigate("/login")}
                        className="mt-6 border border-[#C9B582]/40 text-[#C9B582] px-6 py-2 w-fit
      hover:bg-[#C9B582] hover:text-black transition duration-300"
                    >
                        SIGN IN
                    </button>

                </div>
            </div>
        </>
    );
}