import { useEffect, useState, useRef } from "react";
import { FiMenu, FiSearch, FiShoppingBag, FiX, FiHeart, FiUser } from "react-icons/fi";
import logo from "../assets/Logo.png";
import { NavLink, useNavigate } from "react-router-dom";
import { GetWishlistAPI, GetCartAPI, SearchAPI } from "../api/api";
import API from "../api/axiosInstance";

export default function Navbar() {

    const [wishlist, setWishlist] = useState([]);
    const [cartCount, setCartCount] = useState(0);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [searchLoading, setSearchLoading] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);

    const searchRef = useRef(null);
    const navigate = useNavigate();

    // ─── Cart ──────────────────────────────────────────────
    const fetchCartCount = async () => {
        try {
            const res = await API.get(GetCartAPI());
            setCartCount(res.data?.data?.items?.length || 0);
        } catch (err) { console.log(err); }
    };

    useEffect(() => {
        fetchCartCount();
        window.addEventListener("cartUpdated", fetchCartCount);
        return () => window.removeEventListener("cartUpdated", fetchCartCount);
    }, []);

    // ─── Wishlist ──────────────────────────────────────────
    useEffect(() => {
        const fetchWishlist = async () => {
            try {
                const res = await API.get(GetWishlistAPI());
                setWishlist(res.data.data);
            } catch (err) { console.log(err); }
        };
        fetchWishlist();
        window.addEventListener("wishlistUpdated", fetchWishlist);
        return () => window.removeEventListener("wishlistUpdated", fetchWishlist);
    }, []);

    // ─── Search ────────────────────────────────────────────
    const handleSearch = async (value) => {
        if (!value.trim()) {
            setSearchResults([]);
            return;
        }
        try {
            setSearchLoading(true);
            const res = await API.get(SearchAPI(value));
            setSearchResults(res.data?.products || []);
        } catch (err) {
            console.log(err);
        } finally {
            setSearchLoading(false);
        }
    };

    useEffect(() => {
        const delay = setTimeout(() => handleSearch(searchQuery), 400);
        return () => clearTimeout(delay);
    }, [searchQuery]);

    // ─── Close dropdown on outside click ──────────────────
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (searchRef.current && !searchRef.current.contains(e.target)) {
                setSearchQuery("");
                setSearchResults([]);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // ─── Block body scroll when mobile search open ─────────
    useEffect(() => {
        document.body.style.overflow = searchOpen ? "hidden" : "auto";
        return () => (document.body.style.overflow = "auto");
    }, [searchOpen]);

    const menuItems = [
        { name: "COLLECTIONS", path: "/" },
        { name: "ABOUT US", path: "/aboutus" },
        { name: "CONTACT US", path: "/contact" },
        { name: "POLICIES", path: "/terms" }
    ];

    return (
        // ✅ FIX 1: overflow-x-clip instead of overflow-x-hidden
        // overflow-x-hidden creates stacking context that clips dropdowns
        <div className="overflow-x-clip">

            <nav className="w-full bg-black text-gray-300">
                <div className="max-w-7xl mx-auto px-3 md:px-4 lg:px-6 py-2">
                    <div className="flex items-center justify-between gap-4 p-2">

                        {/* Logo */}
                        <div className="shrink-0 flex items-center cursor-pointer">
                            <img src={logo} className="h-14 md:h-16 lg:h-20" />
                        </div>

                        {/* Desktop Menu */}
                        <ul className="hidden lg:flex flex-1 justify-center gap-4 xl:gap-8 text-xs xl:text-sm tracking-wide">
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

                            {/* ✅ FIX 2: Outer relative wrapper for correct dropdown anchoring */}
                            <div ref={searchRef} className="hidden lg:flex relative z-[999]">

                                {/* Search Input */}
                                <div className="flex items-center bg-[#FFFFFF0D] px-3 py-3 rounded-full border border-[#FFFFFF1A]">
                                    <FiSearch className="text-[#94A3B8] mr-2" />
                                    <input
                                        type="text"
                                        placeholder="Search..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="bg-transparent outline-none text-sm text-gray-300 w-12 md:w-20 lg:w-32 xl:w-40"
                                    />
                                    {/* ✅ Clear button */}
                                    {searchQuery && (
                                        <FiX
                                            className="text-gray-400 cursor-pointer hover:text-white ml-1"
                                            onClick={() => { setSearchQuery(""); setSearchResults([]); }}
                                        />
                                    )}
                                </div>

                                {/* ✅ FIX 3: Dropdown anchored to outer relative wrapper */}
                                {searchQuery && (
                                    <div className="absolute top-[110%] right-0
                                        w-[300px] xl:w-[380px]
                                        bg-black/95 backdrop-blur-md
                                        border border-white/10
                                        rounded-xl shadow-2xl
                                        max-h-[350px] overflow-y-auto">

                                        {searchLoading ? (
                                            <p className="p-3 text-gray-400 text-sm text-center">Searching...</p>
                                        ) : searchResults.length === 0 ? (
                                            <p className="p-3 text-gray-400 text-sm text-center">No results found</p>
                                        ) : (
                                            searchResults.map((item) => (
                                                <div
                                                    key={item.id}
                                                    onClick={() => {
                                                        navigate(`/product/${item.id}`);
                                                        setSearchQuery("");
                                                        setSearchResults([]);
                                                    }}
                                                    className="flex items-center gap-3 p-3 hover:bg-white/10 cursor-pointer transition border-b border-white/5 last:border-0"
                                                >
                                                    <img
                                                        src={item.images?.[0]?.image_url || "/placeholder.png"}
                                                        className="w-12 h-12 rounded-lg object-cover shrink-0"
                                                    />
                                                    <div className="flex flex-col min-w-0">
                                                        <span className="text-sm text-white truncate">{item.name}</span>
                                                        <span className="text-xs text-[#EC5B13] mt-0.5">₹{item.price}</span>
                                                    </div>
                                                </div>
                                            ))
                                        )}
                                    </div>
                                )}
                            </div>

                            {/* Mobile Search Icon */}
                            <FiSearch
                                className="lg:hidden text-2xl cursor-pointer"
                                onClick={() => setSearchOpen(true)}
                            />

                            {/* Desktop Icons */}
                            <div className="hidden lg:flex items-center gap-3 xl:gap-4 text-lg xl:text-xl px-2 xl:px-6">
                                <div onClick={() => navigate("/wishlist")} className="relative cursor-pointer">
                                    <FiHeart className="hover:text-orange-400 text-[#94A3B8] text-xl" />
                                    {wishlist.length > 0 && (
                                        <span className="absolute -top-2 -right-2 bg-orange-500 text-xs px-1.5 rounded-full">{wishlist.length}</span>
                                    )}
                                </div>
                                <div onClick={() => navigate("/cart")} className="relative cursor-pointer">
                                    <FiShoppingBag className="hover:text-orange-400 text-[#94A3B8]" />
                                    {cartCount > 0 && (
                                        <span className="absolute -top-2 -right-2 bg-orange-500 text-xs px-1.5 rounded-full">{cartCount}</span>
                                    )}
                                </div>
                                <div onClick={() => navigate("/profile")} className="cursor-pointer hover:text-orange-400 text-[#94A3B8]">
                                    <FiUser />
                                </div>
                            </div>

                            {/* Hamburger */}
                            <div className="lg:hidden text-2xl cursor-pointer">
                                {menuOpen
                                    ? <FiX onClick={() => setMenuOpen(false)} />
                                    : <FiMenu onClick={() => setMenuOpen(true)} />
                                }
                            </div>

                        </div>
                    </div>
                </div>
            </nav>

            {/* ── MOBILE SEARCH OVERLAY ── */}
            {searchOpen && (
                <div
                    className="fixed inset-0 z-50 bg-black/40 backdrop-blur-md flex justify-center px-4 pt-20"
                    onClick={() => setSearchOpen(false)}
                >
                    <div className="w-full max-w-md" onClick={(e) => e.stopPropagation()}>

                        {/* Search Bar */}
                        <div className="flex items-center w-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-full px-4 py-3 shadow-lg">
                            <FiSearch className="text-gray-400 mr-2 shrink-0" />
                            <input
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search..."
                                className="flex-1 bg-transparent outline-none text-white"
                                autoFocus
                            />
                            {searchQuery && (
                                <FiX
                                    className="cursor-pointer text-gray-400 mr-2"
                                    onClick={() => { setSearchQuery(""); setSearchResults([]); }}
                                />
                            )}
                            <FiX
                                className="cursor-pointer text-gray-400"
                                onClick={() => setSearchOpen(false)}
                            />
                        </div>

                        {/* Mobile Results */}
                        {searchQuery && (
                            <div className="mt-3 w-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden max-h-[60vh] overflow-y-auto">
                                {searchLoading ? (
                                    <p className="p-4 text-gray-400 text-center">Searching...</p>
                                ) : searchResults.length === 0 ? (
                                    <p className="p-4 text-gray-400 text-center">No results found</p>
                                ) : (
                                    searchResults.map((item) => (
                                        <div
                                            key={item.id}
                                            onClick={() => {
                                                navigate(`/product/${item.id}`);
                                                setSearchOpen(false);
                                                setSearchQuery("");
                                                setSearchResults([]);
                                            }}
                                            className="flex items-center gap-3 p-3 border-b border-white/10 hover:bg-white/10 cursor-pointer last:border-0"
                                        >
                                            <img
                                                src={item.images?.[0]?.image_url || "/placeholder.png"}
                                                className="w-12 h-12 rounded-lg object-cover shrink-0"
                                            />
                                            <div>
                                                <p className="text-white text-sm">{item.name}</p>
                                                <p className="text-[#EC5B13] text-xs mt-0.5">₹{item.price}</p>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Dark bg when sidebar open */}
            {menuOpen && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40" onClick={() => setMenuOpen(false)} />
            )}

            {/* Mobile Sidebar */}
            <div className={`fixed top-0 right-0 h-full w-64 bg-black text-white transition-transform duration-300 ease-in-out z-50 ${menuOpen ? "translate-x-0" : "translate-x-full"}`}>
                <div className="flex justify-end p-4" />
                <ul className="flex flex-col gap-6 px-6 text-sm tracking-wider">
                    {menuItems.map((item) => (
                        <li key={item.name}>
                            <NavLink
                                to={item.path}
                                onClick={() => setMenuOpen(false)}
                                className={({ isActive }) =>
                                    `pb-1 cursor-pointer border-b ${isActive ? "text-[#EC5B13] border-[#EC5B13]" : "border-transparent text-[#94A3B8] hover:text-[#EC5B13]"}`
                                }
                            >
                                {item.name}
                            </NavLink>
                        </li>
                    ))}
                </ul>
                <div className="flex gap-6 px-6 mt-10 text-2xl justify-center">
                    <div onClick={() => { navigate("/wishlist"); setMenuOpen(false); }} className="relative cursor-pointer">
                        <FiHeart className="text-[#94A3B8] hover:text-[#EC5B13]" />
                        {wishlist.length > 0 && <span className="absolute -top-2 -right-2 bg-orange-500 text-xs px-1.5 rounded-full">{wishlist.length}</span>}
                    </div>
                    <div onClick={() => { navigate("/cart"); setMenuOpen(false); }} className="relative cursor-pointer">
                        <FiShoppingBag className="text-[#94A3B8] hover:text-[#EC5B13]" />
                        {cartCount > 0 && <span className="absolute -top-2 -right-2 bg-orange-500 text-xs px-1.5 rounded-full">{cartCount}</span>}
                    </div>
                    <div onClick={() => { navigate("/profile"); setMenuOpen(false); }} className="cursor-pointer text-[#94A3B8] hover:text-[#EC5B13]">
                        <FiUser />
                    </div>
                </div>
            </div>

        </div>
    );
}