import { FiMinus, FiPlus } from "react-icons/fi";
import API from "../api/axiosInstance";
import {
    RemoveCartItemAPI,
    UpdateCartItemAPI
} from "../api/api";
import toast from "react-hot-toast";

export default function CartItems({ cartItems, refreshCart, loading }) {

    // 🔥 REMOVE ITEM
    const handleRemove = async (id) => {
        try {
            await API.delete(RemoveCartItemAPI(id));

            toast.success("Item removed");
            refreshCart();
            window.dispatchEvent(new Event("cartUpdated"));

        } catch (err) {
            console.log(err);
            toast.error("Failed to remove item");
        }
    };

    // 🔥 INCREASE QTY
    const handleIncrease = async (item) => {
        try {
            await API.put(UpdateCartItemAPI(item.id), {
                quantity: item.qty + 1
            });

            refreshCart();
            window.dispatchEvent(new Event("cartUpdated"));

        } catch (err) {
            console.log(err);
            toast.error("Failed to update quantity");
        }
    };

    // 🔥 DECREASE QTY
    const handleDecrease = async (item) => {
        if (item.qty <= 1) return;

        try {
            await API.put(UpdateCartItemAPI(item.id), {
                quantity: item.qty - 1
            });

            refreshCart();
            window.dispatchEvent(new Event("cartUpdated"));

        } catch (err) {
            console.log(err);
            toast.error("Failed to update quantity");
        }
    };

    // 🔥 SKELETON LOADER
    if (loading) {
        return (
            <div className="space-y-4">
                {Array.from({ length: 3 }).map((_, i) => (
                    <div
                        key={i}
                        className="bg-[#1c0f09] p-4 rounded-lg border border-[#ffffff10] animate-pulse"
                    >
                        <div className="flex gap-4">

                            {/* IMAGE */}
                            <div className="w-20 h-20 bg-gray-700 rounded-md"></div>

                            {/* TEXT */}
                            <div className="flex-1 space-y-2">
                                <div className="h-4 bg-gray-700 rounded w-1/2"></div>
                                <div className="h-3 bg-gray-700 rounded w-1/3"></div>
                            </div>

                        </div>

                        {/* BOTTOM */}
                        <div className="flex justify-between mt-4">
                            <div className="h-4 bg-gray-700 rounded w-16"></div>
                            <div className="h-4 bg-gray-700 rounded w-24"></div>
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    return (
        <div className="space-y-4">

            {(cartItems || []).map((item) => (
                <div
                    key={item.id}
                    className="bg-[#1c0f09] p-4 rounded-lg border border-[#ffffff10]"
                >
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

                        {/* LEFT */}
                        <div className="flex gap-4 flex-1">

                            <img
                                src={item.image || "/no-image.png"}
                                className="w-20 h-20 object-cover rounded-md"
                            />

                            <div>
                                <h3 className="font-semibold text-sm md:text-base">
                                    {item.name}
                                </h3>

                                <button
                                    onClick={() => handleRemove(item.id)}
                                    className="text-red-400 text-xs mt-1 hover:text-red-500"
                                >
                                    Remove
                                </button>
                            </div>
                        </div>

                        {/* RIGHT */}
                        <div className="flex flex-col md:flex-row md:items-center md:gap-8 gap-3">

                            <span className="text-gray-300 text-base">
                                ₹{item.price.toLocaleString()}
                            </span>

                            {/* QTY */}
                            <div className="flex items-center gap-3">

                                <button
                                    onClick={() => handleDecrease(item)}
                                    disabled={item.qty <= 1}
                                    className={`w-9 h-9 flex items-center justify-center border rounded-full
                                        ${item.qty <= 1 ? "opacity-30 cursor-not-allowed" : "border-gray-600"}
                                    `}
                                >
                                    <FiMinus />
                                </button>

                                <span>{item.qty}</span>

                                <button
                                    onClick={() => handleIncrease(item)}
                                    className="w-9 h-9 flex items-center justify-center border border-gray-600 rounded-full"
                                >
                                    <FiPlus />
                                </button>

                            </div>

                            <span className="text-orange-500 font-bold md:text-right">
                                ₹{(item.price * item.qty).toLocaleString()}
                            </span>

                        </div>
                    </div>
                </div>
            ))}

        </div>
    );
}