import { FiMinus, FiPlus } from "react-icons/fi";
import API from "../api/axiosInstance";
import { RemoveCartItemAPI, UpdateCartItemAPI } from "../api/api";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";

export default function CartItems({ cartItems, refreshCart, loading }) {

    const [localItems, setLocalItems] = useState(cartItems);

    const handleRemove = async (id) => {
        // ✅ instant UI update
        setLocalItems(prev => prev.filter(item => item.id !== id));

        try {
            await API.delete(RemoveCartItemAPI(id));
            toast.success("Removed");
            window.dispatchEvent(new Event("cartUpdated"));
        } catch (err) {
            toast.error("Failed");
            refreshCart(); // fallback
        }
    };

    const handleIncrease = async (item) => {
        const newQty = item.quantity + 1;

        // ✅ update UI instantly
        setLocalItems(prev =>
            prev.map(i => i.id === item.id ? { ...i, quantity: newQty } : i)
        );

        try {
            await API.put(UpdateCartItemAPI(item.id), {
                quantity: newQty
            });
        } catch {
            refreshCart(); // fallback if API fails
        }
    };

    const handleDecrease = async (item) => {
        if (item.quantity <= 1) return;

        const newQty = item.quantity - 1;

        // ✅ update UI instantly
        setLocalItems(prev =>
            prev.map(i => i.id === item.id ? { ...i, quantity: newQty } : i)
        );

        try {
            await API.put(UpdateCartItemAPI(item.id), {
                quantity: newQty
            });
        } catch {
            refreshCart();
        }
    };

    useEffect(() => {
        setLocalItems(cartItems);
    }, [cartItems]);

    if (loading) {
        return (
            <div className="space-y-4 animate-pulse">

                {[1, 2, 3].map((_, i) => (
                    <div
                        key={i}
                        className="bg-[#1c0f09] px-4 py-4 rounded-xl grid grid-cols-4 items-center gap-4"
                    >

                        {/* PRODUCT */}
                        <div className="flex items-center gap-4">
                            <div className="w-20 h-20 bg-gray-700 rounded"></div>

                            <div className="space-y-2">
                                <div className="h-3 bg-gray-700 rounded w-32"></div>
                                <div className="h-3 bg-gray-700 rounded w-16"></div>
                            </div>
                        </div>

                        {/* PRICE */}
                        <div className="h-3 bg-gray-700 rounded w-16"></div>

                        {/* QUANTITY */}
                        <div className="h-8 bg-gray-700 rounded w-24"></div>

                        {/* TOTAL */}
                        <div className="h-3 bg-gray-700 rounded w-16 ml-auto"></div>

                    </div>
                ))}

            </div>
        );
    }

    return (
        <div className="space-y-4">

            {localItems.map(item => {

                const { product, quantity } = item;

                return (
                    <div
                        key={item.id}
                        className="bg-[#1c0f09] px-4 py-4 rounded-xl grid grid-cols-4 items-center gap-4"
                    >

                        {/* PRODUCT */}
                        <div className="flex items-center gap-4">
                            <img
                                src={product?.image || "https://via.placeholder.com/80"}
                                className="w-20 h-20 rounded object-cover bg-[#2a1208]"
                            />

                            <div>
                                <h3 className="font-medium">{product?.name}</h3>
                                <button
                                    onClick={() => handleRemove(item.id)}
                                    className="text-red-400 text-sm mt-1 hover:underline"
                                >
                                    Remove
                                </button>
                            </div>
                        </div>

                        {/* PRICE */}
                        <span className="text-gray-300">
                            ₹{product?.price?.toLocaleString()}
                        </span>

                        {/* QUANTITY */}
                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => handleDecrease(item)}
                                className="w-8 h-8 flex items-center justify-center border border-gray-600 rounded hover:bg-gray-700"
                            >
                                <FiMinus size={14} />
                            </button>

                            <span className="w-6 text-center">{quantity}</span>

                            <button
                                onClick={() => handleIncrease(item)}
                                className="w-8 h-8 flex items-center justify-center border border-gray-600 rounded hover:bg-gray-700"
                            >
                                <FiPlus size={14} />
                            </button>
                        </div>

                        {/* TOTAL */}
                        <span className="text-right text-orange-500 font-semibold">
                            ₹{((product?.price || 0) * quantity).toLocaleString()}
                        </span>

                    </div>
                );
            })}
        </div>
    );
}