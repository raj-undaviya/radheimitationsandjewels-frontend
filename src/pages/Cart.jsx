import { useEffect, useState } from "react";
import Breadcrumb from "../components/Breadcrumb";
import CartItems from "../components/CartItems";
import OrderSummary from "../components/OrderSummary";

export default function Cart() {
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
        setCartItems(storedCart);
    }, []);

    const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
    const tax = Math.round(subtotal * 0.03);
    const total = subtotal + tax;

    return (
        <div className="min-h-screen bg-black text-white px-4 md:px-12 py-10">

            <Breadcrumb customLast="Cart" />

            <h1 className="text-2xl md:text-4xl font-bold text-orange-500 mb-2">
                Your Shopping Bag
            </h1>

            <p className="text-gray-400 mb-8">
                You have {cartItems.length} items in your cart.
            </p>

            <div className="grid lg:grid-cols-3 gap-8">

                <div className="lg:col-span-2 space-y-4">

                    <div className="hidden md:grid grid-cols-4 text-gray-400 text-sm border-b border-gray-700 pb-2">
                        <span>PRODUCT</span>
                        <span>PRICE</span>
                        <span>QUANTITY</span>
                        <span className="text-right">TOTAL</span>
                    </div>

                    <CartItems cartItems={cartItems} setCartItems={setCartItems} />
                </div>

                <OrderSummary cartItems={cartItems} />

            </div>
        </div>
    );
}