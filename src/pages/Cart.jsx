// import { FiMinus, FiPlus } from "react-icons/fi";
import { useCart } from "../context/CartContext";
import Breadcrumb from "../components/Breadcrumb";
import CartItems from "../components/CartItems";
import OrderSummary from "../components/OrderSummary";

export default function Cart() {
    const { cartItems } = useCart();

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
                    <CartItems />
                </div>

                {/* RIGHT - SUMMARY */}
                <OrderSummary cartItems={cartItems} />

            </div>
        </div>
    );
}