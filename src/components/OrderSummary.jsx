import { useNavigate } from "react-router-dom";

export default function OrderSummary({
    subtotal = 0,
    tax = 0,
    total = 0
}) {

    const navigate = useNavigate();

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

            {/* COUPON */}
            <div className="mt-6">
                <p className="text-xs mb-2 text-gray-400">
                    PROMOTIONAL CODE
                </p>

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
            <button
                onClick={() => navigate("/checkout")}
                className="w-full mt-6 bg-orange-500 py-3 rounded-md font-semibold hover:bg-orange-600 transition"
            >
                Proceed to Checkout →
            </button>

        </div>
    );
}