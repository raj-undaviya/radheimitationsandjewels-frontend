import { FiHeart } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import Breadcrumb from "../components/Breadcrumb";
import { useEffect, useState } from "react";

import API from "../api/axiosInstance";
import {
    GetWishlistAPI,
    RemoveWishlistAPI
} from "../api/api";

import toast from "react-hot-toast";

export default function Wishlist() {

    const navigate = useNavigate();
    const [wishlist, setWishlist] = useState([]);

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

    // ================= REMOVE FROM WISHLIST =================
    const removeFromWishlist = async (itemId) => {
        try {
            await API.delete(RemoveWishlistAPI(itemId));

            toast.success("Removed from wishlist");

            setWishlist(prev =>
                prev.filter(item => item.id !== itemId)
            );

            window.dispatchEvent(new Event("wishlistUpdated"));

        } catch (err) {
            console.log(err);
            toast.error("Failed to remove");
        }
    };

    return (
        <div className="min-h-screen bg-[#1c0f09] text-white px-6 md:px-16 py-12">

            {/* MOBILE BREADCRUMB */}
            <div className="block lg:hidden mb-4">
                <Breadcrumb customLast="Wishlist" />
            </div>

            {/* TITLE */}
            <div className="mb-6">

                <div className="hidden lg:block mb-3">
                    <Breadcrumb customLast="Wishlist" />
                </div>

                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

                    <div className="max-w-xl">
                        <h1 className="text-3xl sm:text-4xl font-bold">
                            My Wishlist
                        </h1>

                        <p className="text-gray-400 mt-2 text-sm">
                            Keep track of your favorite handcrafted pieces.
                        </p>
                    </div>

                    <button className="bg-orange-500 px-4 py-2 rounded-md font-semibold hover:bg-orange-600 transition">
                        Move all to Cart
                    </button>

                </div>
            </div>

            {/* EMPTY STATE */}
            {wishlist.length === 0 && (
                <div className="text-center mt-20 text-gray-400">
                    <p className="text-xl">Your wishlist is empty 😢</p>
                </div>
            )}

            {/* GRID */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">

                {wishlist.map((item) => {

                    // ✅ FIX: correct data source
                    const product = item.product_details;

                    return (
                        <div
                            key={item.id}
                            className="bg-[#24130c] p-4 rounded-xl shadow-lg hover:scale-105 transition border border-[#ffffff0d]"
                        >

                            {/* IMAGE */}
                            <div className="relative">
                                <img
                                    src={product?.image}
                                    alt={product?.name}
                                    className="rounded-lg w-full h-48 object-cover"
                                />

                                {/* REMOVE BUTTON */}
                                <button
                                    onClick={() => removeFromWishlist(item.id)}
                                    className="absolute top-2 right-2 p-2 rounded-full bg-orange-500 text-white"
                                >
                                    <FiHeart />
                                </button>
                            </div>

                            {/* INFO */}
                            <h3 className="mt-4 font-semibold text-sm">
                                {product?.name}
                            </h3>

                            <p className="text-orange-400 font-semibold">
                                ₹{product?.price ? product.price.toLocaleString() : "0"}
                            </p>

                            {/* ACTIONS */}
                            <div className="mt-4 flex flex-col gap-2">

                                <button
                                    onClick={() => navigate(`/product/${product?.id}`)}
                                    className="bg-[#2f1a12] py-2 rounded-md text-sm hover:bg-[#3b2017]"
                                >
                                    View Details
                                </button>

                                <button className="bg-orange-500 py-2 rounded-md text-sm font-semibold hover:bg-orange-600">
                                    Add to Cart
                                </button>

                            </div>

                        </div>
                    );
                })}

            </div>

        </div>
    );
}