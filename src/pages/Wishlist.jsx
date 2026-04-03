import { FiHeart } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import Breadcrumb from "../components/Breadcrumb";
import { useEffect, useState } from "react";

export default function Wishlist() {
    const navigate = useNavigate();

    const [wishlist, setWishlist] = useState([]);

    useEffect(() => {
        const storedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
        setWishlist(storedWishlist);
    }, []);

    const toggleWishlist = (product) => {
        let updatedWishlist;

        const exists = wishlist.find((item) => item.id === product.id);

        if (exists) {
            updatedWishlist = wishlist.filter((item) => item.id !== product.id);
        } else {
            updatedWishlist = [...wishlist, product];
        }

        setWishlist(updatedWishlist);
        localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
    };

    return (
        <div className="min-h-screen bg-[#1c0f09] text-white px-6 md:px-16 py-12">
            {/*  MOBILE BREADCRUMB */}
            <div className="block lg:hidden mb-4">
                <Breadcrumb customLast="Wishlist" />
            </div>
            {/* TITLE */}
            {/*  TITLE + DESKTOP BREADCRUMB */}
            <div className="mb-6">

                {/* DESKTOP BREADCRUMB */}
                <div className="hidden lg:block mb-3">
                    <Breadcrumb customLast="Wishlist" />
                </div>

                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

                    {/* LEFT SIDE */}
                    <div className="max-w-xl">
                        <h1 className="text-3xl sm:text-4xl font-bold leading-tight">
                            My Wishlist
                        </h1>

                        <p className="text-gray-400 mt-2 text-sm sm:text-base">
                            Keep track of your favorite obsidian and gold handcrafted pieces.
                        </p>
                    </div>

                    {/* BUTTON */}
                    <button className="bg-orange-500 px-4 sm:px-5 py-2 sm:py-3 rounded-md font-semibold hover:bg-orange-600 transition w-full md:w-auto">
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

                {wishlist.map((product) => (
                    <div
                        key={product.id}
                        className="bg-[#24130c] p-4 rounded-xl shadow-lg hover:scale-105 transition duration-300 border border-[#ffffff0d]"
                    >

                        {/* IMAGE */}
                        <div className="relative">
                            <img
                                src={
                                    Array.isArray(product.images)
                                        ? product.images[0]
                                        : product.images?.thumbnail
                                }
                                alt={product.name}
                                className="rounded-lg w-full h-48 object-cover"
                            />

                            {/* REMOVE */}
                            <button
                                onClick={() => toggleWishlist(product)}
                                className="absolute top-2 right-2 p-2 rounded-full bg-orange-500 text-white"
                            >
                                <FiHeart />
                            </button>
                        </div>

                        {/* INFO */}
                        <h3 className="mt-4 font-semibold text-sm">
                            {product.name}
                        </h3>

                        <p className="text-orange-400 font-semibold">
                            ₹{product.price.toLocaleString()}
                        </p>

                        {/* ACTIONS */}
                        <div className="mt-4 flex flex-col gap-2">

                            <button
                                onClick={() => navigate(`/product/${product.id}`)}
                                className="bg-[#2f1a12] py-2 rounded-md text-sm hover:bg-[#3b2017]"
                            >
                                View Details
                            </button>

                            <button className="bg-orange-500 py-2 rounded-md text-sm font-semibold hover:bg-orange-600">
                                Add to Cart
                            </button>

                        </div>

                    </div>
                ))}

            </div>
        </div>
    );
}