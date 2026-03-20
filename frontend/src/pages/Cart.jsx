import { FiMinus, FiPlus } from "react-icons/fi";
import { useCart } from "../context/CartContext";
import Breadcrumb from "../components/Breadcrumb";

export default function Cart() {
    const { cartItems, removeFromCart, increaseQty, decreaseQty } = useCart();

    const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
    const tax = Math.round(subtotal * 0.03);
    const total = subtotal + tax;

    return (
        <div className="min-h-screen bg-black text-white px-4 md:px-12 py-10">
            {/* ✅ BREADCRUMB */}
            <Breadcrumb customLast="Cart" />

            {/* TITLE */}
            <h1 className="text-2xl md:text-4xl font-bold text-orange-500 mb-2">
                Your Shopping Bag
            </h1>
            <p className="text-gray-400 mb-8">
                You have {cartItems.length} exquisite items in your cart.
            </p>

            {/* MAIN GRID */}
            <div className="grid lg:grid-cols-3 gap-8">

                {/* LEFT - PRODUCTS */}
                <div className="lg:col-span-2 space-y-4">

                    {/* HEADER */}
                    <div className="hidden md:grid grid-cols-4 text-gray-400 text-sm border-b border-gray-700 pb-2">
                        <span>PRODUCT</span>
                        <span>PRICE</span>
                        <span>QUANTITY</span>
                        <span className="text-right">TOTAL</span>
                    </div>

                    {/* ITEMS */}
                    {cartItems.map((item) => (
                        <div
                            key={item.id}
                            className="bg-[#1c0f09] p-4 rounded-lg border border-[#ffffff10]"
                        >

                            {/* MOBILE LAYOUT */}
                            <div className="flex flex-col gap-4 md:hidden">

                                {/* TOP: IMAGE + DETAILS */}
                                <div className="flex gap-4">
                                    <img src={item.images.thumbnail}
                                        className="w-20 h-20 object-cover rounded-md"
                                    />

                                    <div className="flex-1">
                                        <h3 className="font-semibold text-sm">{item.name}</h3>
                                        <p className="text-xs text-gray-400">{item.desc}</p>

                                        <button
                                            onClick={() => removeFromCart(item.id)}
                                            className="text-red-400 text-xs mt-1"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>

                                {/* MIDDLE: PRICE + QUANTITY */}
                                <div className="flex justify-between items-center">

                                    {/* PRICE */}
                                    <span className="text-gray-300 text-base font-medium">
                                        ₹{item.price.toLocaleString()}
                                    </span>

                                    {/* QUANTITY */}
                                    <div className="flex items-center gap-3">
                                        <button
                                            onClick={() => decreaseQty(item.id)}
                                            className="w-9 h-9 flex items-center justify-center border border-gray-600 rounded-full"
                                        >
                                            <FiMinus />
                                        </button>

                                        <span className="text-sm">{item.qty}</span>
                                        <button
                                            onClick={() => increaseQty(item.id)}
                                            className="w-9 h-9 flex items-center justify-center border border-gray-600 rounded-full"
                                        >
                                            <FiPlus />
                                        </button>
                                    </div>

                                </div>

                                {/* BOTTOM: TOTAL */}
                                <div className="flex justify-end">
                                    <span className="text-orange-500 font-bold text-lg">
                                        ₹{(item.price * item.qty).toLocaleString()}
                                    </span>
                                </div>

                            </div>

                            {/* DESKTOP LAYOUT */}
                            <div className="hidden md:grid grid-cols-4 gap-4 items-center">

                                {/* PRODUCT */}
                                <div className="flex gap-4 items-center">
                                    <img
                                        src={item.images.thumbnail}
                                        className="w-16 h-16 object-cover rounded-md"
                                    />
                                    <div>
                                        <h3 className="font-semibold">{item.name}</h3>
                                        <p className="text-xs text-gray-400">{item.desc}</p>

                                        <button
                                            onClick={() => removeFromCart(item.id)}
                                            className="text-red-400 text-xs mt-1 hover:text-red-500"
                                        >
                                            Remove
                                        </button>

                                    </div>
                                </div>

                                {/* PRICE */}
                                <div className="text-gray-300">
                                    ₹{item.price.toLocaleString()}
                                </div>

                                {/* QUANTITY */}
                                <div className="flex items-center gap-3">
                                    <button
                                        onClick={() => decreaseQty(item.id)}
                                        className="p-2 border border-gray-600 rounded-full hover:bg-orange-500"
                                    >
                                        <FiMinus />
                                    </button>

                                    <span>{item.qty}</span>

                                    <button
                                        onClick={() => increaseQty(item.id)}
                                        className="p-2 border border-gray-600 rounded-full hover:bg-orange-500"
                                    >
                                        <FiPlus />
                                    </button>
                                </div>

                                {/* TOTAL */}
                                <div className="text-right text-orange-500 font-bold">
                                    ₹{(item.price * item.qty).toLocaleString()}
                                </div>

                            </div>

                        </div>
                    ))}

                </div>

                {/* RIGHT - SUMMARY */}
                <div className="bg-[#1c0f09] p-6 rounded-xl border border-[#ffffff10] h-fit sticky top-24">

                    <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

                    <div className="space-y-3 text-sm">

                        <div className="flex justify-between">
                            <span>Subtotal</span>
                            <span>₹{subtotal.toLocaleString()}</span>
                        </div>

                        <div className="flex justify-between text-green-400">
                            <span>Shipping</span>
                            <span>FREE</span>
                        </div>

                        <div className="flex justify-between">
                            <span>Tax (3%)</span>
                            <span>₹{tax}</span>
                        </div>

                        <hr className="border-gray-700" />

                        <div className="flex justify-between font-bold text-lg text-orange-500">
                            <span>Total</span>
                            <span>₹{total.toLocaleString()}</span>
                        </div>

                    </div>

                    {/* COUPON */}
                    <div className="mt-6">
                        <p className="text-xs mb-2 text-gray-400">PROMOTIONAL CODE</p>
                        <div className="flex gap-2">
                            <input
                                type="text"
                                placeholder="Enter code"
                                className="flex-1 px-3 py-2 bg-black border border-gray-700 rounded-md text-sm"
                            />
                            <button className="bg-gray-800 px-4 rounded-md text-sm">
                                Apply
                            </button>
                        </div>
                    </div>

                    {/* BUTTON */}
                    <button className="w-full mt-6 bg-orange-500 py-3 rounded-md font-semibold hover:bg-orange-600 transition">
                        Proceed to Checkout →
                    </button>

                </div>

            </div>
        </div>
    );
}