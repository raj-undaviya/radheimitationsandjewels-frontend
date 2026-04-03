import CartItems from "../components/CartItems";
import OrderSummary from "../components/OrderSummary";
import { useCart } from "../context/CartContext";
import Breadcrumb from "../components/Breadcrumb";

export default function Checkout() {
    const { cartItems } = useCart();

    return (
        <div className="min-h-screen bg-black text-white px-4 md:px-12 py-10">
            {/* BreadCrum */}
            <Breadcrumb customLast="Checkout" />

            {/* TITLE */}
            <h1 className="text-3xl md:text-4xl font-bold text-orange-500 mb-2">
                Your Shopping Bag
            </h1>

            <p className="text-gray-400 mb-8">
                You have {cartItems.length} exquisite items in your cart.
            </p>

            {/* MAIN GRID */}
            <div className="grid lg:grid-cols-3 gap-8">

                {/* LEFT SIDE */}
                <div className="lg:col-span-2 bg-[#1c0f09] rounded-xl p-6 border border-[#ffffff10]">

                    {/* HEADER */}
                    <div className="hidden md:grid grid-cols-4 text-gray-400 text-sm border-b border-gray-700 pb-2 mb-4">
                        <span>PRODUCT</span>
                        <span>PRICE</span>
                        <span>QUANTITY</span>
                        <span className="text-right">TOTAL</span>
                    </div>

                    {/* ITEMS */}
                    <CartItems />

                    {/* FOOTER ACTIONS */}
                    <div className="flex justify-between mt-6 text-sm text-gray-400">
                        <span className="cursor-pointer hover:text-black">
                            ← Continue Shopping
                        </span>

                        <span className="cursor-pointer hover:text-black">
                            Clear Cart
                        </span>
                    </div>

                </div>

                {/* RIGHT SIDE */}
                <div className="bg-[#1c0f09] rounded-xl md:p-3 border border-[#ffffff10] h-fit">

                    <OrderSummary cartItems={cartItems} />

                </div>

            </div>

        </div>
    );
}