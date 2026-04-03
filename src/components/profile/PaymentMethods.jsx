export default function PaymentMethods() {
    return (
        <div className="bg-[#1c0f09] p-5 rounded-xl border border-[#ffffff10]">

            <h3 className="font-semibold mb-4">Payment Methods</h3>

            <div className="space-y-3">

                <div className="flex justify-between items-center bg-[#2a140c] p-3 rounded-md">
                    <span>HDFC Visa Card •••• 4290</span>
                </div>

                <div className="flex justify-between items-center bg-[#2a140c] p-3 rounded-md">
                    <span>UPI - GPay</span>
                </div>

                <button className="w-full border border-dashed border-orange-500 py-2 rounded-md text-sm">
                    + Add New Method
                </button>

            </div>
        </div>
    );
}