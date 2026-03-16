import { useState } from "react";
import { FiMenu, FiSearch, FiShoppingBag, FiX, FiHeart, FiUser } from "react-icons/fi";
import logo from "../assets/Logo.png";
import { NavLink } from "react-router-dom";

export default function Navbar() {

    const [menuOpen, setMenuOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);

    return (
        <div className="overflow-x-hidden">
            {/* NAVBAR */}
            <nav className="w-full bg-black text-gray-300">

                {/* Center container - for large display */}
                <div className="max-w-7xl mx-auto px-4 md:px-6 py-2">

                    <div className="flex items-center justify-between gap-4 p-2">

                        {/* Logo */}
                        {/* <div className="leading-tight shrink-0">
                        <h1 className="text-xl sm:text-2xl font-bold tracking-widest 
                        bg-orange-400 to-white bg-clip-text text-transparent">
                            RADHE
                        </h1>

                        <p className="text-[9px] tracking-[3px] text-white">
                            IMITATIONS & JEWELS
                        </p>
                    </div> */}
                        <div className="shrink-0 flex items-center cursor-pointer">
                            <img
                                src={logo}
                                alt="Radhe Imitations & Jewels"
                                className="h-20 md:h-12 lg:h-24 w-auto object-contain overflow-hidden"
                            />
                        </div>

                        {/* Desktop Menu */}
                        <ul className="hidden md:flex flex-1 justify-center gap-4 lg:gap-8 text-sm tracking-wider">

                            {/* <li className="hover:text-[#EC5B13]  hover:border-b-2 hover:border-[#EC5B13] pb-1 cursor-pointer text-[#94A3B8]">
                            <Link to="/">COLLECTIONS</Link>
                        </li> */}

                            <li>
                                <NavLink
                                    to="/"
                                    className={({ isActive }) =>
                                        `pb-1 cursor-pointer border-b-2 ${isActive
                                            ? "text-[#EC5B13] border-[#EC5B13]"
                                            : "border-transparent hover:text-[#EC5B13] hover:border-[#EC5B13] text-[#94A3B8]"
                                        }`
                                    }
                                >
                                    COLLECTIONS
                                </NavLink>
                            </li>

                            <li className="hover:text-[#EC5B13]  hover:border-b-2 hover:border-[#EC5B13] pb-1 cursor-pointer text-[#94A3B8]">
                                BRIDAL
                            </li>

                            <li className="hover:text-[#EC5B13] hover:border-b-2 hover:border-[#EC5B13] pb-1 cursor-pointer text-[#94A3B8]">
                                HERITAGE
                            </li>

                            <li className="hover:text-[#EC5B13] hover:border-b-2 hover:border-[#EC5B13] pb-1 cursor-pointer text-[#94A3B8]">
                                STORES
                            </li>

                        </ul>


                        {/* Right Section */}
                        <div className="flex items-center gap-3 shrink-0">

                            {/* Search bar (tablet + desktop) */}
                            <div className="hidden sm:flex items-center bg-[#FFFFFF0D] px-3 py-3 rounded-full border border-[#FFFFFF1A]">

                                <FiSearch className="text-[#94A3B8] mr-2" />

                                <input
                                    type="text"
                                    placeholder="Search..."
                                    className="bg-transparent outline-none text-sm text-gray-300 w-16 md:w-24 lg:w-40"
                                />

                            </div>


                            {/* Mobile Search Icon */}
                            <FiSearch
                                className="md:hidden text-2xl cursor-pointer"
                                onClick={() => setSearchOpen(true)}
                            />

                            {/* Icons (desktop + tablet) */}
                            <div className="hidden md:flex items-center gap-4 text-xl lg:px-6 px-0">

                                <FiHeart className="cursor-pointer hover:text-orange-400 text-[#94A3B8]" />

                                <FiShoppingBag className="cursor-pointer hover:text-orange-400 text-[#94A3B8]" />

                                <FiUser className="cursor-pointer hover:text-orange-400 text-[#94A3B8]" />

                            </div>


                            {/* Hamburger */}
                            <div className="md:hidden text-2xl cursor-pointer">
                                {menuOpen ? (
                                    <FiX onClick={() => setMenuOpen(false)} />
                                ) : (
                                    <FiMenu onClick={() => setMenuOpen(true)} />
                                )}
                            </div>
                        </div>

                    </div>
                </div>  {/* ← CLOSE THIS */}

            </nav>


            {/* Mobile Search Bar */}
            {/* {searchOpen && (

                <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 backdrop-blur-sm">

                    {/* Search Box 
                    <div className="bg-white rounded-full flex items-center px-4 py-3 mt-24 w-[90%] max-w-xl cursor-pointer shadow-lg">

                        <FiSearch className="text-gray-500 mr-3" />

                        <input
                            type="text"
                            placeholder="Search for products..."
                            className="flex-1 outline-none text-gray-700"
                            autoFocus
                        />

                        <FiX
                            className="text-xl cursor-pointer text-gray-600"
                            onClick={() => setSearchOpen(false)}
                        />

                    </div>

                </div>

            )} */}

            {/* this navbar search with X icon */}
            {/* {searchOpen && (

                <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/30 backdrop-blur-md">

                    <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-full flex items-center px-4 py-3 mt-24 w-[90%] max-w-xl shadow-xl">

                        <FiSearch className="text-gray-300 mr-3" />

                        <input
                            type="text"
                            placeholder="Search for products..."
                            className="flex-1 bg-transparent outline-none text-white placeholder-gray-400"
                            autoFocus
                        />

                        <FiX
                            className="text-xl cursor-pointer text-gray-300"
                            onClick={() => setSearchOpen(false)}
                        />

                    </div>

                </div>

            )} */}

            {
                searchOpen && (
                    <div
                        className="fixed inset-0 z-50 flex items-start justify-center bg-black/30 backdrop-blur-md"
                        onClick={() => setSearchOpen(false)} // close when clicking outside
                    >
                        <div
                            className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-full flex items-center px-4 py-3 mt-24 w-[90%] max-w-xl shadow-xl"
                            onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
                        >
                            <FiSearch className="text-gray-300 mr-3" />

                            <input
                                type="text"
                                placeholder="Search for products..."
                                className="flex-1 bg-transparent outline-none text-white placeholder-gray-400"
                                autoFocus
                            />
                        </div>
                    </div>
                )
            }

            {/* {
                menuOpen && (
                    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"></div>
                )
            } */}
            {menuOpen && (
                <div
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
                    onClick={() => setMenuOpen(false)}
                ></div>
            )}

            {/* Mobile Sidebar Menu */}
            {/* <div
                className={`fixed top-0 right-0 h-full w-64 bg-black text-white transform transition-transform duration-300 ease-in-out z-50
                ${menuOpen ? "translate-x-0" : "translate-x-full"}`}
            > */}
            <div
                className={`fixed top-0 right-0 h-full w-64 bg-black text-white transition-transform duration-300 ease-in-out z-50
                ${menuOpen ? "translate-x-0" : "translate-x-full"}`}
            >

                {/* Close button */}
                <div className="flex justify-end p-4">
                    <FiX
                        className="text-2xl cursor-pointer"
                        onClick={() => setMenuOpen(false)}
                    />
                </div>


                {/* Menu Items */}
                <ul className="flex flex-col gap-6 px-6 text-sm tracking-wider">

                    <li className="hover:text-[#EC5B13] hover:border-b hover:border-[#EC5B13] pb-1 cursor-pointer text-[#94A3B8]">COLLECTIONS</li>

                    <li className="hover:text-[#EC5B13] hover:border-b hover:border-[#EC5B13] pb-1 cursor-pointer text-[#94A3B8]">BRIDAL</li>

                    <li className="hover:text-[#EC5B13] hover:border-b hover:border-[#EC5B13] pb-1 cursor-pointer text-[#94A3B8]">HERITAGE</li>

                    <li className="hover:text-[#EC5B13] hover:border-b hover:border-[#EC5B13] pb-1 cursor-pointer text-[#94A3B8]">STORES</li>

                </ul>


                {/* Icons */}
                <div className="flex gap-6 px-6 mt-10 text-2xl justify-center">

                    <FiHeart className="text-[#94A3B8] hover:text-[#EC5B13]" />

                    <FiShoppingBag className="text-[#94A3B8] hover:text-[#EC5B13]" />

                    <FiUser className="text-[#94A3B8] hover:text-[#EC5B13]" />

                </div>

            </div>
        </div>
    );
}