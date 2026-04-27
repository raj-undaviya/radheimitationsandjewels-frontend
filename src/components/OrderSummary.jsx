import { useNavigate, useLocation } from "react-router-dom";

export default function OrderSummary({
    subtotal = 0,
    tax = 0,
    total = 0
}) {

    const navigate = useNavigate();
    const location = useLocation();

    const isCheckoutPage = location.pathname === "/checkout";

    return (
        <div className="bg-[#1c0f09] p-3 rounded-xl border border-[#ffffff10] h-fit sticky top-24">

            <h2 className="text-xl font-semibold mb-4">
                Order Summary
            </h2>

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
                    <span>₹{tax.toLocaleString()}</span>
                </div>

                <hr className="border-gray-700" />

                <div className="flex justify-between font-bold text-lg text-orange-500">
                    <span>Total</span>
                    <span>₹{total.toLocaleString()}</span>
                </div>

            </div>

            {/* ✅ SHOW BUTTON ONLY ON CART PAGE */}
            {!isCheckoutPage && (
                <button
                    onClick={() => navigate("/checkout")}
                    className="w-full mt-6 bg-orange-500 py-3 rounded-md font-semibold hover:bg-orange-600 transition"
                >
                    Proceed to Checkout →
                </button>
            )}

        </div>
    );
}