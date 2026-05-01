import { useEffect, useState } from "react";
import CartItems from "../components/CartItems";
import OrderSummary from "../components/OrderSummary";
import Breadcrumb from "../components/Breadcrumb";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import API from "../api/axiosInstance";
import { GetCartAPI, CreateOrderAPI, VerifyPaymentAPI } from "../api/api";

export default function Checkout() {

    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [orderData, setOrderData] = useState(null);

    const [coupon, setCoupon] = useState("");
    const [couponApplied, setCouponApplied] = useState(false);

    const [cartItems, setCartItems] = useState([]);

    const {
        register,
        handleSubmit,
        reset
    } = useForm();

    // ================= LOAD RAZORPAY =================
    const loadRazorpay = () => {
        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = "https://checkout.razorpay.com/v1/checkout.js";
            script.onload = () => resolve(true);
            script.onerror = () => resolve(false);
            document.body.appendChild(script);
        });
    };

    // ================= FETCH CART =================
    const refreshCart = async () => {
        try {
            const res = await API.get(GetCartAPI());
            const rawItems = res?.data?.data?.items || [];

            const normalized = rawItems.map(item => ({
                id: item.id,
                quantity: item.quantity ?? 1,
                product: item.product_details || item.product
            }));

            setCartItems(normalized);

        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        refreshCart();
    }, []);

    useEffect(() => {
        const savedProfile = JSON.parse(localStorage.getItem("profile"));
        if (savedProfile) {
            reset(savedProfile);
        }
    }, [reset]);

    // ================= CALCULATIONS =================
    const subtotal = cartItems.reduce(
        (acc, item) => acc + (item.product?.price || 0) * item.quantity,
        0
    );

    const tax = subtotal * 0.03;
    const total = subtotal + tax;

    // ================= PLACE ORDER =================
    const placeOrder = async (formData, paymentMethod = "online") => {
        try {
            const res = await API.post(CreateOrderAPI(), {
                address: formData.address,
                city: "Surat",
                pincode: "395003",
                payment_method: paymentMethod,
                // ✅ OPTIONAL COUPON
                ...(couponApplied && coupon ? { coupon_code: coupon } : {})
            });

            const data = res.data;

            // COD
            if (paymentMethod === "cod") {
                setOrderData(data); // optional (for order id, etc.)
                setShowSuccessModal(true);

                // optional: clear cart UI
                window.dispatchEvent(new Event("cartUpdated"));

                window.dispatchEvent(new Event("orderUpdated"));

                return;
            }

            const loaded = await loadRazorpay();
            if (!loaded) {
                alert("Razorpay SDK failed");
                return;
            }

            const options = {
                key: data.key,
                amount: data.amount * 100,
                currency: "INR",
                name: "Radhe Jewellery",
                description: `Order #${data.order_id}`,
                order_id: data.razorpay_order_id,

                handler: async function (response) {
                    try {
                        await API.post(VerifyPaymentAPI(), {
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_signature: response.razorpay_signature
                        });

                        const discount = Number(data.data?.discount_amount || 0);

                        if (discount > 0) {
                            toast.success(`🎉 Payment successful! You saved ₹${discount}`);
                        } else {
                            toast.success("🎉 Payment successful!");
                        }

                        // optional: refresh cart / clear UI
                        window.dispatchEvent(new Event("cartUpdated"));

                        window.dispatchEvent(new Event("orderUpdated"));

                    } catch (err) {
                        console.log(err);
                        toast.error("Payment verification failed ❌");
                    }
                },

                prefill: {
                    name: formData.name,
                    email: formData.email,
                    contact: formData.phone
                },

                theme: {
                    color: "#f97316"
                }
            };

            const rzp = new window.Razorpay(options);
            rzp.open();

        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="min-h-screen bg-black text-white px-4 md:px-12 py-10">

            <Breadcrumb customLast="Checkout" />

            <h1 className="text-3xl font-bold text-orange-500 mb-2">
                Checkout
            </h1>

            <p className="text-gray-400 mb-8">
                You have {cartItems.length} items in your cart.
            </p>

            <form
                onSubmit={handleSubmit((data) => placeOrder(data, "online"))}
                className="bg-[#1c0f09] rounded-2xl p-6 md:p-8 border border-[#ffffff10] shadow-xl"
            >

                {/* HEADER */}
                <div className="mb-6">
                    <h2 className="text-2xl font-semibold text-white">
                        Shipping Details
                    </h2>
                    <p className="text-gray-400 text-sm mt-1">
                        Enter your delivery information
                    </p>
                </div>

                {/* INPUT GRID */}
                <div className="grid md:grid-cols-2 gap-5">

                    {/* NAME */}
                    <div>
                        <label className="text-sm text-gray-400 mb-1 block">
                            Full Name
                        </label>
                        <input
                            {...register("name")}
                            placeholder="John Doe"
                            className="w-full px-4 py-3 bg-black border border-gray-700 rounded-lg focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none transition"
                        />
                    </div>

                    {/* EMAIL */}
                    <div>
                        <label className="text-sm text-gray-400 mb-1 block">
                            Email Address
                        </label>
                        <input
                            {...register("email")}
                            placeholder="john@example.com"
                            className="w-full px-4 py-3 bg-black border border-gray-700 rounded-lg focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none transition"
                        />
                    </div>

                    {/* PHONE */}
                    <div>
                        <label className="text-sm text-gray-400 mb-1 block">
                            Phone Number
                        </label>
                        <input
                            {...register("phone")}
                            placeholder="+91 9876543210"
                            className="w-full px-4 py-3 bg-black border border-gray-700 rounded-lg focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none transition"
                        />
                    </div>

                    {/* ADDRESS */}
                    <div className="md:col-span-2">
                        <label className="text-sm text-gray-400 mb-1 block">
                            Shipping Address
                        </label>
                        <textarea
                            {...register("address")}
                            rows={3}
                            placeholder="Street, Area, Landmark"
                            className="w-full px-4 py-3 bg-black border border-gray-700 rounded-lg focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none transition resize-none"
                        />
                    </div>

                </div>

                {/* COUPON (IMPROVED UI) */}
                <div className="mt-6 bg-[#120904] p-4 rounded-xl border border-[#ffffff10]">

                    <p className="text-sm text-gray-400 mb-3">
                        Apply Coupon
                    </p>

                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={coupon}
                            onChange={(e) => setCoupon(e.target.value)}
                            placeholder="Enter coupon code"
                            className="flex-1 px-4 py-2 bg-black border border-gray-700 rounded-md text-sm focus:border-orange-500 outline-none"
                        />

                        <button
                            type="button"
                            onClick={() => {
                                if (!coupon.trim()) {
                                    toast.error("Enter coupon code");
                                    return;
                                }
                                setCouponApplied(true);
                                toast.success("Coupon applied");
                                setCouponApplied(true);
                            }}
                            className="bg-orange-500 hover:bg-orange-600 px-4 rounded-md text-sm font-medium transition"
                        >
                            Apply
                        </button>
                    </div>

                    {couponApplied ? (
                        <p className="text-green-400 text-sm mt-2">
                            Coupon "{coupon}" applied
                        </p>
                    ) : (
                        <p className="text-gray-500 text-xs mt-2">
                            Coupon is optional
                        </p>
                    )}
                </div>

                {/* BUTTONS */}
                <div className="mt-6 space-y-3">

                    {/* ONLINE */}
                    <button className="w-full bg-orange-500 hover:bg-orange-600 py-3 rounded-lg font-semibold transition shadow-md">
                        Pay Online →
                    </button>

                    {/* COD */}
                    <button
                        type="button"
                        onClick={handleSubmit((data) => placeOrder(data, "cod"))}
                        className="w-full bg-gray-700 hover:bg-gray-800 py-3 rounded-lg font-semibold transition"
                    >
                        Cash on Delivery
                    </button>

                </div>

            </form>

            <div className="grid lg:grid-cols-3 gap-8 mt-8">

                <div className="lg:col-span-2">
                    <CartItems cartItems={cartItems} refreshCart={refreshCart} />
                </div>

                <OrderSummary
                    subtotal={subtotal}
                    tax={tax}
                    total={total}
                />

            </div>

            {showSuccessModal && (
                <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">

                    <div className="bg-[#1c0f09] p-8 rounded-2xl w-[90%] max-w-md text-center shadow-2xl border border-orange-500">

                        <h2 className="text-2xl font-bold text-orange-500 mb-4">
                            🎉 Order Placed!
                        </h2>

                        <p className="text-gray-300 mb-2">
                            Your order has been placed successfully.
                        </p>

                        <p className="text-sm text-gray-400 mb-6">
                            Payment Method: Cash on Delivery
                        </p>

                        <div className="flex gap-3 justify-center">

                            <button
                                onClick={() => {
                                    setShowSuccessModal(false);
                                    window.location.href = "/collections";
                                }}
                                className="bg-orange-500 px-4 py-2 rounded-lg font-semibold hover:bg-orange-600"
                            >
                                Continue Shopping
                            </button>

                            {/* <button
                                onClick={() => {
                                    setShowSuccessModal(false);
                                    window.location.href = "/orders";
                                }}
                                className="bg-gray-700 px-4 py-2 rounded-lg hover:bg-gray-800"
                            >
                                View Orders
                            </button> */}

                        </div>

                    </div>
                </div>
            )}

        </div>
    );
}