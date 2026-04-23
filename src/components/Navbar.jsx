import { useEffect, useState } from "react";
import { FiMenu, FiSearch, FiShoppingBag, FiX, FiHeart, FiUser } from "react-icons/fi";
import logo from "../assets/Logo.png";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { getWishlist, subscribe } from "../store/WishlistStore";
import { getCart, subscribeCart } from "../store/CartStore";


export default function Navbar() {

    const [wishlist, setWishlist] = useState(getWishlist());

    const [cartItems, setCartItems] = useState(getCart());

    useEffect(() => {
        const unsubscribe = subscribeCart(setCartItems);
        return () => unsubscribe();
    }, []);

    const [menuOpen, setMenuOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);

    const navigate = useNavigate();

    // PROFESSIONAL MENU STRUCTURE
    const menuItems = [
        { name: "COLLECTIONS", path: "/" },
        { name: "ABOUT US", path: "/aboutus" },
        { name: "CONTACT US", path: "/contact" },
        { name: "TERMS & CONDITIONS", path: "/termsandcondition" }
    ];

    useEffect(() => {
        const unsubscribe = subscribe(setWishlist);
        return () => unsubscribe();
    }, []);


    return (
        <div className="overflow-x-hidden">

            {/* NAVBAR */}
            <nav className="w-full bg-black text-gray-300">

                <div className="max-w-7xl mx-auto px-4 md:px-6 py-2">

                    <div className="flex items-center justify-between gap-4 p-2">

                        {/* Logo */}
                        <div className="shrink-0 flex items-center cursor-pointer">
                            <img
                                src={logo}
                                alt="Radhe Imitations & Jewels"
                                className="h-20 md:h-12 lg:h-24 w-auto object-contain"
                            />
                        </div>

                        {/* Desktop Menu */}
                        <ul className="hidden md:flex flex-1 justify-center gap-4 lg:gap-8 text-sm tracking-wider">

                            {menuItems.map((item) => (
                                <li key={item.name}>
                                    <NavLink
                                        to={item.path}
                                        className={({ isActive }) =>
                                            `pb-1 cursor-pointer border-b-2 ${isActive
                                                ? "text-[#EC5B13] border-[#EC5B13]"
                                                : "border-transparent hover:text-[#EC5B13] hover:border-[#EC5B13] text-[#94A3B8]"
                                            }`
                                        }
                                    >
                                        {item.name}
                                    </NavLink>
                                </li>
                            ))}

                        </ul>

                        {/* Right Section */}
                        <div className="flex items-center gap-3 shrink-0">

                            {/* Desktop Search */}
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

                            {/* Desktop Icons */}
                            <div className="hidden md:flex items-center gap-4 text-xl lg:px-6 px-0">

                                <div
                                    onClick={() => navigate("/wishlist")}
                                    className="relative cursor-pointer"
                                >
                                    <FiHeart className="hover:text-orange-400 text-[#94A3B8] text-xl" />

                                    {wishlist.length > 0 && (
                                        <span className="absolute -top-2 -right-2 bg-orange-500 text-xs px-1.5 rounded-full">
                                            {wishlist.length}
                                        </span>
                                    )}
                                </div>

                                <div
                                    onClick={() => navigate("/cart")}
                                    className="relative cursor-pointer"
                                >
                                    <FiShoppingBag className="hover:text-orange-400 text-[#94A3B8]" />

                                    {cartItems.length > 0 && (
                                        <span className="absolute -top-2 -right-2 bg-orange-500 text-xs px-1.5 rounded-full">
                                            {cartItems.length}
                                        </span>
                                    )}
                                </div>

                                <div
                                    onClick={() => navigate("/profile")}
                                    className="cursor-pointer hover:text-orange-400 text-[#94A3B8]"
                                >
                                    <FiUser />
                                </div>

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
                </div>

            </nav>

            {/* MOBILE SEARCH OVERLAY */}
            {searchOpen && (

                <div
                    className="fixed inset-0 z-50 flex items-start justify-center bg-black/30 backdrop-blur-md"
                    onClick={() => setSearchOpen(false)}
                >

                    <div
                        className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-full flex items-center px-4 py-3 mt-24 w-[90%] max-w-xl shadow-xl"
                        onClick={(e) => e.stopPropagation()}
                    >

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

            )}

            {/* DARK BACKGROUND WHEN MENU OPEN */}
            {menuOpen && (
                <div
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
                    onClick={() => setMenuOpen(false)}
                ></div>
            )}

            {/* MOBILE SIDEBAR */}
            <div
                className={`fixed top-0 right-0 h-full w-64 bg-black text-white transition-transform duration-300 ease-in-out z-50
                ${menuOpen ? "translate-x-0" : "translate-x-full"}`}
            >

                {/* Close Button */}
                <div className="flex justify-end p-4">
                    {/* <FiX
                        className="text-2xl cursor-pointer"
                        onClick={() => setMenuOpen(false)}
                    /> */}
                </div>

                {/* Mobile Menu */}
                <ul className="flex flex-col gap-6 px-6 text-sm tracking-wider">

                    {menuItems.map((item) => (
                        <li key={item.name}>
                            <NavLink
                                to={item.path}
                                onClick={() => setMenuOpen(false)}
                                className={({ isActive }) =>
                                    `pb-1 cursor-pointer border-b ${isActive
                                        ? "text-[#EC5B13] border-[#EC5B13]"
                                        : "border-transparent text-[#94A3B8] hover:text-[#EC5B13]"
                                    }`
                                }
                            >
                                {item.name}
                            </NavLink>
                        </li>
                    ))}

                </ul>

                {/* Mobile Icons */}
                <div className="flex gap-6 px-6 mt-10 text-2xl justify-center">

                    <div
                        onClick={() => {
                            navigate("/wishlist");
                            setMenuOpen(false); // close sidebar
                        }}
                        className="relative cursor-pointer"
                    >
                        <FiHeart className="text-[#94A3B8] hover:text-[#EC5B13]" />

                        {wishlist.length > 0 && (
                            <span className="absolute -top-2 -right-2 bg-orange-500 text-xs px-1.5 rounded-full">
                                {wishlist.length}
                            </span>
                        )}
                    </div>

                    <div
                        onClick={() => {
                            navigate("/cart");
                            setMenuOpen(false);
                        }}
                        className="relative cursor-pointer"
                    >
                        <FiShoppingBag className="text-[#94A3B8] hover:text-[#EC5B13]" />

                        {cartItems.length > 0 && (
                            <span className="absolute -top-2 -right-2 bg-orange-500 text-xs px-1.5 rounded-full">
                                {cartItems.length}
                            </span>
                        )}
                    </div>

                    <div
                        onClick={() => {
                            navigate("/profile");
                            setMenuOpen(false);
                        }}
                        className="cursor-pointer text-[#94A3B8] hover:text-[#EC5B13]"
                    >
                        <FiUser />
                    </div>

                </div>

            </div>

        </div>
    );
}