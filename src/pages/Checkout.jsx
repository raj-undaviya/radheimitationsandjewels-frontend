import { useEffect, useState } from "react";
import CartItems from "../components/CartItems";
import OrderSummary from "../components/OrderSummary";
import Breadcrumb from "../components/Breadcrumb";
import { useForm } from "react-hook-form";

export default function Checkout() {

    // CART STATE 
    const [cartItems, setCartItems] = useState([]);

    // REACT HOOK FORM
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm();

    // LOAD CART
    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
        setCartItems(storedCart);
    }, []);

    // LOAD PROFILE
    useEffect(() => {
        const savedProfile = JSON.parse(localStorage.getItem("profile"));
        if (savedProfile) {
            reset(savedProfile);
        }
    }, [reset]);

    // CLEAR CART
    const clearCart = () => {
        setCartItems([]);
        localStorage.setItem("cart", JSON.stringify([]));
        window.dispatchEvent(new Event("cartUpdated"));
    };

    // FORM SUBMIT
    const onSubmit = (data) => {
        console.log("User Details:", data);

        // Save profile
        localStorage.setItem("profile", JSON.stringify(data));

        alert("Profile saved! Now you can proceed to payment.");
    };

    return (
        <div className="min-h-screen bg-black text-white px-4 md:px-12 py-10">

            <Breadcrumb customLast="Checkout" />

            <h1 className="text-3xl md:text-4xl font-bold text-orange-500 mb-2">
                Checkout
            </h1>

            <p className="text-gray-400 mb-8">
                You have {cartItems.length} items in your cart.
            </p>

            <div className="space-y-8">

                {/* 🔥 PROFILE FORM */}
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="bg-[#1c0f09] rounded-xl p-6 border border-[#ffffff10]"
                >
                    <h2 className="text-xl font-semibold mb-4">Profile Detail</h2>

                    <div className="grid md:grid-cols-2 gap-4">

                        {/* NAME */}
                        <div>
                            <input
                                type="text"
                                placeholder="Full Name"
                                {...register("name", { required: "Name is required" })}
                                className="w-full px-4 py-3 bg-black border border-gray-700 rounded-md"
                            />
                            <p className="text-red-500 text-xs">{errors.name?.message}</p>
                        </div>

                        {/* EMAIL */}
                        <div>
                            <input
                                type="email"
                                placeholder="Email"
                                {...register("email", {
                                    required: "Email is required",
                                    pattern: {
                                        value: /\S+@\S+\.\S+/,
                                        message: "Invalid email"
                                    }
                                })}
                                className="w-full px-4 py-3 bg-black border border-gray-700 rounded-md"
                            />
                            <p className="text-red-500 text-xs">{errors.email?.message}</p>
                        </div>

                        {/* PHONE */}
                        <div>
                            <input
                                type="text"
                                placeholder="Phone Number"
                                {...register("phone", {
                                    required: "Phone is required",
                                    minLength: {
                                        value: 10,
                                        message: "Minimum 10 digits"
                                    }
                                })}
                                className="w-full px-4 py-3 bg-black border border-gray-700 rounded-md"
                            />
                            <p className="text-red-500 text-xs">{errors.phone?.message}</p>
                        </div>

                        {/* ADDRESS */}
                        <div className="md:col-span-2">
                            <input
                                type="text"
                                placeholder="Shipping Address"
                                {...register("address", { required: "Address is required" })}
                                className="w-full px-4 py-3 bg-black border border-gray-700 rounded-md"
                            />
                            <p className="text-red-500 text-xs">{errors.address?.message}</p>
                        </div>

                    </div>

                    {/* ✅ SUBMIT BUTTON (IMPORTANT FIX) */}
                    <button
                        type="submit"
                        className="w-full mt-6 bg-orange-500 py-3 rounded-md font-semibold hover:bg-orange-600 transition"
                    >
                        Save Details
                    </button>

                </form>

                {/* 🔥 CART + SUMMARY */}
                <div className="grid lg:grid-cols-3 gap-8">

                    {/* LEFT */}
                    <div className="lg:col-span-2 bg-[#1c0f09] rounded-xl p-6 border border-[#ffffff10]">

                        <div className="hidden md:grid grid-cols-4 text-gray-400 text-sm border-b border-gray-700 pb-2 mb-4">
                            <span>PRODUCT</span>
                            <span>PRICE</span>
                            <span>QUANTITY</span>
                            <span className="text-right">TOTAL</span>
                        </div>

                        <CartItems cartItems={cartItems} setCartItems={setCartItems} />

                        <div className="flex justify-between mt-6 text-sm text-gray-400">

                            <span className="cursor-pointer hover:text-white">
                                ← Continue Shopping
                            </span>

                            <span
                                onClick={clearCart}
                                className="cursor-pointer hover:text-red-400"
                            >
                                Clear Cart
                            </span>

                        </div>

                    </div>

                    {/* RIGHT */}
                    <div className="bg-[#1c0f09] rounded-xl md:p-3 border border-[#ffffff10] h-fit">

                        {/* 🔥 PASS BUTTON CONTROL */}
                        <OrderSummary cartItems={cartItems} />

                    </div>

                </div>

            </div>

        </div>
    );
}