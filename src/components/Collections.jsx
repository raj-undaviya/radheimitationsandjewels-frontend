import { FiHeart } from "react-icons/fi";
import { useEffect, useState } from "react";
import { getWishlist, updateWishlist, subscribe } from "../store/WishlistStore";
import Breadcrumb from "../components/Breadcrumb";
import { useParams, useNavigate } from "react-router-dom";

import API from "../api/axiosInstance";
import { ProductSectionAPI } from "../api/api";

export default function Collections() {

    const [loading, setLoading] = useState(true);

    const { collectionName } = useParams();
    const navigate = useNavigate();

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

    // ✅ SUBSCRIBE TO GLOBAL STORE
    useEffect(() => {
        const unsubscribe = subscribe(setWishlist);
        return () => unsubscribe();
    }, []);

    // ================= FETCH API =================
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

        updateWishlist(updated); // ✅ GLOBAL UPDATE
    };

    const isInWishlist = (id) => {
        return wishlist.some((item) => item.id === id);
    };

    // ================= CART =================
    const addToCart = (product) => {
        const cart = JSON.parse(localStorage.getItem("cart")) || [];

        const exists = cart.find((item) => item.id === product.id);

        let updated;

        if (exists) {
            updated = cart.map((item) =>
                item.id === product.id
                    ? { ...item, qty: item.qty + 1 }
                    : item
            );
        } else {
            updated = [...cart, { ...product, qty: 1 }];
        }

        localStorage.setItem("cart", JSON.stringify(updated));
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
                Keep track of your favorite obsidian and gold handcrafted pieces.
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
                        <div
                            key={i}
                            className="bg-[#24130c] p-4 rounded-xl border border-[#ffffff0d] animate-pulse"
                        >
                            {/* IMAGE */}
                            <div className="w-full h-48 bg-gray-700 rounded-lg"></div>

                            {/* TEXT */}
                            <div className="mt-4 h-4 bg-gray-700 rounded w-3/4"></div>
                            <div className="mt-2 h-4 bg-gray-700 rounded w-1/2"></div>

                            {/* BUTTONS */}
                            <div className="mt-4 space-y-2">
                                <div className="h-8 bg-gray-700 rounded"></div>
                                <div className="h-8 bg-gray-700 rounded"></div>
                            </div>
                        </div>
                    ))
                    : filteredProducts.map((product) => (
                        <div key={product.id}
                            className="bg-[#24130c] p-4 rounded-xl shadow-lg hover:scale-105 transition border border-[#ffffff0d]">

                            {/* IMAGE */}
                            <div className="relative">
                                <img
                                    src={product.images[0]?.image_url}
                                    alt={product.name}
                                    className="rounded-lg w-full h-48 object-cover"
                                />

                                {/* WISHLIST */}
                                <button
                                    onClick={() => toggleWishlist(product)}
                                    className={`absolute top-2 right-2 p-2 rounded-full transition
                        ${isInWishlist(product.id)
                                            ? "bg-orange-500 text-white"
                                            : "bg-black/50 text-gray-300"}`}
                                >
                                    <FiHeart />
                                </button>
                            </div>

                            {/* INFO */}
                            <h3 className="mt-4 font-semibold text-sm">
                                {product.name}
                            </h3>

                            <p className="text-orange-400 font-semibold">
                                ₹{Number(product.price).toLocaleString()}
                            </p>

                            {/* ACTIONS */}
                            <div className="mt-4 flex flex-col gap-2">

                                <button
                                    onClick={() => navigate(`/product/${product.id}`)}
                                    className="bg-[#2f1a12] py-2 rounded-md text-sm hover:bg-[#3b2017]"
                                >
                                    View Details
                                </button>

                                <button
                                    onClick={() => {
                                        addToCart(product);
                                        navigate("/cart");
                                    }}
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