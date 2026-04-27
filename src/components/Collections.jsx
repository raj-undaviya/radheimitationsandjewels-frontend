import { FiHeart } from "react-icons/fi";
import { useEffect, useState } from "react";

import Breadcrumb from "../components/Breadcrumb";
import { useParams, useNavigate, useLocation } from "react-router-dom";

import API from "../api/axiosInstance";
import {
    ProductSectionAPI,
    AddToCartAPI,
    AddToWishlistAPI,
    GetWishlistAPI
} from "../api/api";

import toast from "react-hot-toast";

export default function Collections() {

    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState([]);
    const [wishlist, setWishlist] = useState([]);

    const [openSort, setOpenSort] = useState(false);
    const [activeCategory, setActiveCategory] = useState("All");
    const [searchText, setSearchText] = useState("");
    const [sortOption, setSortOption] = useState("Default");

    const { collectionName } = useParams();
    const navigate = useNavigate();
    const location = useLocation();

    const title = collectionName
        ? collectionName.charAt(0).toUpperCase() + collectionName.slice(1)
        : "All Collections";

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

    // ================= FETCH WISHLIST =================
    useEffect(() => {
        const fetchWishlist = async () => {
            try {
                const res = await API.get(GetWishlistAPI());
                setWishlist(res.data.data);
            } catch (err) {
                console.log(err);
            }
        };

        fetchWishlist();
    }, []);

    // ================= CHECK IF IN WISHLIST =================
    const isInWishlist = (id) => {
        return wishlist.some(item => item.product === id);
    };

    // ================= TOGGLE WISHLIST =================
    const toggleWishlist = async (product) => {

        const token = localStorage.getItem("token");

        if (!token) {
            toast.error("Please login first");
            navigate("/login");
            return;
        }


        try {

            const exists = wishlist.find(item => item.product === product.id);

            if (exists) {
                // 🔴 REMOVE
                await API.delete(`/orders/wishlist/${exists.id}`);
                toast.success("Removed from wishlist");

            } else {
                // 🟢 ADD
                await API.post(AddToWishlistAPI(), {
                    product: product.id
                });
                toast.success("Added to wishlist");
            }

            // 🔄 refresh wishlist
            const res = await API.get(GetWishlistAPI());
            setWishlist(res.data.data);

            // 🔥 ADD THIS LINE (VERY IMPORTANT)
            window.dispatchEvent(new Event("wishlistUpdated"));

        } catch (err) {
            console.log(err);
            toast.error("Wishlist update failed");
        }
    };
    
    // ================= ADD TO CART =================
    const handleAddToCart = async (product) => {

        const token = localStorage.getItem("token");

        if (!token) {
            localStorage.setItem("pendingCart", JSON.stringify(product));

            toast.error("Please login first");

            navigate("/login", {
                state: { from: location.pathname }
            });

            return;
        }

        try {
            await API.post(AddToCartAPI(), {
                product: product.id,
                quantity: 1,
            });

            toast.success("Added to cart");

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

            {/* PRODUCTS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">

                {loading
                    ? Array.from({ length: 8 }).map((_, i) => (
                        <div key={i} className="bg-[#24130c] p-4 rounded-xl animate-pulse">
                            <div className="w-full h-48 bg-gray-700 rounded-lg"></div>
                        </div>
                    ))
                    : filteredProducts.map((product) => (
                        <div key={product.id}
                            className="relative bg-[#24130c] p-4 rounded-xl shadow-lg hover:scale-105 transition">

                            {/* ❤️ WISHLIST ICON */}
                            <button
                                onClick={() => toggleWishlist(product)}
                                className="absolute top-3 right-3 z-10 hover:scale-110 transition"
                            >
                                <FiHeart
                                    size={20}
                                    className={
                                        isInWishlist(product.id)
                                            ? "text-red-500 fill-red-500"
                                            : "text-white"
                                    }
                                />
                            </button>

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