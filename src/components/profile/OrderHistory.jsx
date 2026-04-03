import { useNavigate } from "react-router-dom";

export default function OrderHistory() {

    const navigate = useNavigate();

    const orders = [
        {
            id: "#RI-9021",
            product: "Antique Kundan Set",
            status: "Delivered",
            price: 4500
        },
        {
            id: "#RI-8845",
            product: "Gold Plated Bangles",
            status: "Processing",
            price: 2200
        }
    ];

    // user status
    const statusColor = {
        Delivered: "text-green-400",
        Processing: "text-blue-400",
        Cancelled: "text-red-400",
        Pending: "text-yellow-400"
    };

    return (
        <div className="bg-[#1c0f09] p-5 rounded-xl border border-[#ffffff10]">

            <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold">Recent Order History</h3>
                <span
                    onClick={() => navigate("/orders")}
                    className="text-orange-400 text-sm cursor-pointer hover:underline"
                >
                    View All
                </span>
            </div>

            <div className="space-y-4 text-sm">

                {orders.map((order, index) => (
                    <div
                        key={index}
                        className={`flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 
            ${index !== orders.length - 1 ? "border-b border-[#ffffff10] pb-3" : ""}`}
                    >

                        {/* LEFT */}
                        <div>
                            <p className="text-gray-400 text-xs">{order.id}</p>
                            <p>{order.product}</p>
                        </div>

                        {/* RIGHT */}
                        <div className="flex justify-between sm:gap-6 w-full sm:w-auto">

                            <span className={statusColor[order.status] || "text-gray-400"}>
                                {order.status}
                            </span>

                            <span>₹{order.price.toLocaleString()}</span>

                        </div>

                    </div>
                ))}

            </div>



        </div>
    );
}