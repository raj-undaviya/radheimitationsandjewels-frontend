import { FiHeart } from "react-icons/fi";
import { useEffect, useState } from "react";
import { getWishlist, updateWishlist, subscribe } from "../store/WishlistStore";
import Breadcrumb from "../components/Breadcrumb";
import { useParams, useNavigate, useLocation } from "react-router-dom";

import API from "../api/axiosInstance";
import { ProductSectionAPI, AddToCartAPI } from "../api/api";
import toast from "react-hot-toast";

export default function Collections() {

    const [loading, setLoading] = useState(true);

    const { collectionName } = useParams();
    const navigate = useNavigate();
    const location = useLocation();

    const title = collectionName
        ? collectionName.charAt(0).toUpperCase() + collectionName.slice(1)
        : "All Collections";

    // ✅ GLOBAL WISHLIST STATE
    const [wishlist, setWishlist] = useState(getWishlist());

    const [products, setProducts] = useState([]);
    const [openSort, setOpenSort] = useState(false);
    const [activeCategory, setActiveCategory] = useState("All");
    const [searchText, setSearchText] = useState("");
    const [sortOption, setSortOption] = useState("Default");

    // ================= SUBSCRIBE =================
    useEffect(() => {
        const unsubscribe = subscribe(setWishlist);
        return () => unsubscribe();
    }, []);

    // ================= FETCH PRODUCTS =================
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                const res = await API.get(ProductSectionAPI());
                setProducts(res.data.data);
            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    // ================= WISHLIST =================
    const toggleWishlist = (product) => {
        const exists = wishlist.find((item) => item.id === product.id);

        let updated;

        if (exists) {
            updated = wishlist.filter((item) => item.id !== product.id);
        } else {
            updated = [...wishlist, product];
        }

        updateWishlist(updated);
    };

    const isInWishlist = (id) => {
        return wishlist.some((item) => item.id === id);
    };

    // ================= ADD TO CART (🔥 MAIN FIX) =================
    // ================= ADD TO CART =================
    const handleAddToCart = async (product) => {

        const token = localStorage.getItem("token");

        // ❌ NOT LOGGED IN
        if (!token) {
            localStorage.setItem("pendingCart", JSON.stringify(product));

            toast.error("Please login first");

            navigate("/login", {
                state: { from: location.pathname }
            });

            return;
        }

        // ✅ LOGGED IN → CALL API
        try {
            await API.post(AddToCartAPI(), {
                product: product.id,
                quantity: 1,
            });

            toast.success("Added to cart");

            // 🔥🔥🔥 ADD THIS LINE (VERY IMPORTANT)
            window.dispatchEvent(new Event("cartUpdated"));

            navigate("/cart");

        } catch (err) {
            console.log(err);
            toast.error("Failed to add to cart");
        }
    };

    // ================= FILTER =================
    let filteredProducts = products.filter((product) => {
        const matchesCategory = activeCategory === "All";

        const matchesSearch =
            product.name.toLowerCase().includes(searchText.toLowerCase());

        return matchesCategory && matchesSearch;
    });

    // ================= SORT =================
    if (sortOption === "Low") {
        filteredProducts.sort((a, b) => Number(a.price) - Number(b.price));
    }

    if (sortOption === "High") {
        filteredProducts.sort((a, b) => Number(b.price) - Number(a.price));
    }

    const totalCount = filteredProducts.length;

    return (
        <div className="min-h-screen bg-[#1c0f09] text-white px-6 md:px-16 py-12">

            <Breadcrumb customLast={title} />

            <h1 className="text-4xl font-bold mb-2 capitalize">
                {title}
            </h1>

            <p className="text-gray-400 mb-10">
                Keep track of your favorite handcrafted pieces.
            </p>

            {/* FILTER */}
            <div className="border-b border-[#3b2017] pb-4 mb-8">

                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

                    {/* CATEGORY */}
                    <div className="flex gap-6 text-sm font-medium overflow-x-auto whitespace-nowrap">

                        {["All", "Necklaces", "Rings", "Bangles", "Earrings"].map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={activeCategory === cat
                                    ? "text-orange-500 border-b-2 border-orange-500 pb-1"
                                    : "hover:text-orange-400"}
                            >
                                {cat} {cat === "All" && `(${totalCount})`}
                            </button>
                        ))}

                    </div>

                    {/* SORT + SEARCH */}
                    <div className="flex items-center gap-4 mt-4">

                        {/* SORT */}
                        <div className="relative">
                            <div
                                onClick={() => setOpenSort(!openSort)}
                                className="flex items-center gap-2 text-sm text-gray-300 cursor-pointer hover:text-white"
                            >
                                <span>Sort by</span>
                                <span>▼</span>
                            </div>

                            {openSort && (
                                <div className="absolute left-0 mt-2 w-44 bg-[#24130c] border border-[#3b2017] rounded-lg shadow-lg z-50">

                                    <button onClick={() => { setSortOption("Default"); setOpenSort(false); }}
                                        className="block w-full text-left px-4 py-2 hover:bg-[#3b2017]">
                                        Default
                                    </button>

                                    <button onClick={() => { setSortOption("Low"); setOpenSort(false); }}
                                        className="block w-full text-left px-4 py-2 hover:bg-[#3b2017]">
                                        Price: Low to High
                                    </button>

                                    <button onClick={() => { setSortOption("High"); setOpenSort(false); }}
                                        className="block w-full text-left px-4 py-2 hover:bg-[#3b2017]">
                                        Price: High to Low
                                    </button>

                                </div>
                            )}
                        </div>

                        {/* SEARCH */}
                        <input
                            type="text"
                            placeholder="Search jewelry..."
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                            className="bg-[#2a140c] px-4 py-2 rounded-md border border-[#3b2017] outline-none text-sm"
                        />

                    </div>

                </div>
            </div>

            {/* PRODUCTS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">

                {loading
                    ? Array.from({ length: 8 }).map((_, i) => (
                        <div key={i} className="bg-[#24130c] p-4 rounded-xl animate-pulse">
                            <div className="w-full h-48 bg-gray-700 rounded-lg"></div>
                            <div className="mt-4 h-4 bg-gray-700 rounded w-3/4"></div>
                            <div className="mt-2 h-4 bg-gray-700 rounded w-1/2"></div>
                        </div>
                    ))
                    : filteredProducts.map((product) => (
                        <div key={product.id}
                            className="bg-[#24130c] p-4 rounded-xl shadow-lg hover:scale-105 transition">

                            <img
                                src={product.images[0]?.image_url}
                                className="rounded-lg w-full h-48 object-cover"
                            />

                            <h3 className="mt-4 font-semibold text-sm">
                                {product.name}
                            </h3>

                            <p className="text-orange-400 font-semibold">
                                ₹{Number(product.price).toLocaleString()}
                            </p>

                            <div className="mt-4 flex flex-col gap-2">

                                <button
                                    onClick={() => navigate(`/product/${product.id}`)}
                                    className="bg-[#2f1a12] py-2 rounded-md text-sm"
                                >
                                    View Details
                                </button>

                                <button
                                    onClick={() => handleAddToCart(product)}
                                    className="bg-orange-500 py-2 rounded-md text-sm font-semibold hover:bg-orange-600"
                                >
                                    Add to Cart
                                </button>

                            </div>

                        </div>
                    ))
                }

            </div>

        </div>
    );
}