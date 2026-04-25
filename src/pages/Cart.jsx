import { useEffect, useState } from "react";
import Breadcrumb from "../components/Breadcrumb";
import CartItems from "../components/CartItems";
import OrderSummary from "../components/OrderSummary";
import API from "../api/axiosInstance";
import { GetCartAPI } from "../api/api";

export default function Cart() {
    const [loading, setLoading] = useState(true);

    const [cartItems, setCartItems] = useState([]);

   const fetchCart = async () => {
    try {
        setLoading(true); // ✅ START LOADING

        const res = await API.get(GetCartAPI());

        const items = res.data?.data?.items || [];

        const formatted = items.map(item => ({
            id: item.id,
            name: item.product_details.name,
            price: Number(item.price),
            qty: item.quantity,
            image: item.product_details.image,
        }));

        setCartItems(formatted);

    } catch (err) {
        console.log(err);
    } finally {
        setLoading(false); // ✅ STOP LOADING
    }
};

    useEffect(() => {
        fetchCart();
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

                    <CartItems
                        cartItems={cartItems}
                        refreshCart={fetchCart}
                        loading={loading}
                    />
                </div>

                <OrderSummary
                    subtotal={subtotal}
                    tax={tax}
                    total={total}
                />

            </div>
        </div>
    );
}