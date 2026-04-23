import { FiMinus, FiPlus } from "react-icons/fi";
import {
    removeFromCart,
    increaseQty,
    decreaseQty
} from "../store/CartStore";

export default function CartItems({ cartItems, setCartItems }) {

    const handleRemove = (id) => {
        removeFromCart(id);
    };

    const handleIncrease = (id) => {
        increaseQty(id);
    };

    const handleDecrease = (id) => {
        decreaseQty(id);
    };

    return (
        <div className="space-y-4">
            {cartItems.map((item) => (
                <div
                    key={item.id}
                    className="bg-[#1c0f09] p-4 rounded-lg border border-[#ffffff10]"
                >
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

                        {/* LEFT */}
                        <div className="flex gap-4 flex-1">
                            <img
                                src={item.images?.thumbnail || item.images?.[0]}
                                className="w-20 h-20 object-cover rounded-md"
                            />

                            <div>
                                <h3 className="font-semibold text-sm md:text-base">
                                    {item.name}
                                </h3>

                                <p className="text-xs text-gray-400">
                                    {item.desc}
                                </p>

                                <button
                                    onClick={() => removeFromCart(item.id)}
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

                            <div className="flex items-center gap-3">
                                <button
                                    onClick={() => decreaseQty(item.id)}
                                    className="w-9 h-9 flex items-center justify-center border border-gray-600 rounded-full"
                                >
                                    <FiMinus />
                                </button>

                                <span>{item.qty}</span>

                                <button
                                    onClick={() => increaseQty(item.id)}
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