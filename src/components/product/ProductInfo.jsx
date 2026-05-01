import { useNavigate } from "react-router-dom";

import API from "../../api/axiosInstance";
import { AddToCartAPI } from "../../api/api"; // ✅ FIXED PATH
import toast from "react-hot-toast";

export default function ProductInfo({ product }) {

    const navigate = useNavigate();

    // ✅ ADD TO CART (API BASED)
    const addToCart = async (product) => {

        const token = localStorage.getItem("token");

        if (!token) {
            toast.error("Please login first");
            navigate("/login");
            return false;
        }

        if (!product || !product.id) {
            toast.error("Invalid product");
            return false;
        }

        try {
            await API.post(AddToCartAPI(), {
                product: product.id,
                quantity: 1,
            });

            window.dispatchEvent(new Event("cartUpdated"));

            return true; // ✅ success

        } catch (err) {
            if (err.response) {
                toast.error(err.response.data.message || "Failed to add to cart");
            } else {
                toast.error("Server not reachable");
            }
            return false; // ❌ failed
        }
    };

    // SKELETON LOADER
    if (!product) {
        return (
            <div className="flex flex-col justify-center animate-pulse">
                <div className="h-8 w-3/4 bg-gray-700 rounded mb-4"></div>
                <div className="h-4 w-1/2 bg-gray-700 rounded mb-6"></div>
            </div>
        );
    }

    return (
        <div className="flex flex-col justify-center">

            <h1 className="text-3xl font-semibold mb-4">
                {product.name}
            </h1>

            <p className="text-gray-400 mb-6">
                {product.description}
            </p>

            <h2 className="text-2xl font-bold mb-6">
                ₹{product.price}
            </h2>

            <div className="flex gap-4">

                <button
                    onClick={() => addToCart(product)}
                    className="bg-orange-500 px-8 py-3 rounded-xl font-semibold hover:bg-orange-600 transition cursor-pointer"
                >
                    ADD TO CART
                </button>

                <button
                    onClick={async () => {
                        await addToCart(product);
                        navigate("/checkout");
                    }}
                    className="border border-orange-500 px-8 py-3 rounded-xl font-semibold hover:bg-orange-500 transition cursor-pointer">
                    BUY NOW
                </button>

            </div>

        </div>
    );
}