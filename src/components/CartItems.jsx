import { FiMinus, FiPlus } from "react-icons/fi";
import API from "../api/axiosInstance";
import { RemoveCartItemAPI, UpdateCartItemAPI } from "../api/api";
import toast from "react-hot-toast";

export default function CartItems({ cartItems, refreshCart }) {

    // REMOVE
    const handleRemove = async (id) => {
        await API.delete(RemoveCartItemAPI(id));
        toast.success("Removed");
        refreshCart();
        window.dispatchEvent(new Event("cartUpdated"));
    };

    // INCREASE
    const handleIncrease = async (item) => {
        await API.put(UpdateCartItemAPI(item.id), {
            quantity: item.quantity + 1
        });
        refreshCart();
    };

    // DECREASE
    const handleDecrease = async (item) => {
        if (item.quantity <= 1) return;

        await API.put(UpdateCartItemAPI(item.id), {
            quantity: item.quantity - 1
        });
        refreshCart();
    };

    return (
        <div className="space-y-4">

            {cartItems.map(item => {

                const { product, quantity } = item;

                return (
                    <div key={item.id} className="bg-[#1c0f09] p-4 rounded-lg">

                        <div className="flex justify-between items-center">

                            {/* LEFT */}
                            <div className="flex gap-4">

                                <img
                                    src={product?.image}
                                    className="w-20 h-20 rounded"
                                />

                                <div>
                                    <h3>{product?.name}</h3>
                                    <button onClick={() => handleRemove(item.id)} className="text-red-400 text-sm">
                                        Remove
                                    </button>
                                </div>

                            </div>

                            {/* RIGHT */}
                            <div className="flex items-center gap-6">

                                <span>₹{product?.price?.toLocaleString()}</span>

                                <div className="flex gap-2 items-center">
                                    <button onClick={() => handleDecrease(item)}><FiMinus /></button>
                                    <span>{quantity}</span>
                                    <button onClick={() => handleIncrease(item)}><FiPlus /></button>
                                </div>

                                <span className="text-orange-500 font-bold">
                                    ₹{((product?.price || 0) * quantity).toLocaleString()}
                                </span>

                            </div>

                        </div>

                    </div>
                );
            })}

        </div>
    );
}