import { useNavigate } from "react-router-dom";
import { Clock } from "lucide-react";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

import API from "../../api/axiosInstance";
import { GetOrdersAPI } from "../../api/api";

export default function OrderHistory() {

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    // helper
    const capitalize = (text) =>
        text?.charAt(0).toUpperCase() + text?.slice(1);

    useEffect(() => {

        const fetchOrders = async () => {
            try {
                setLoading(true);

                const res = await API.get(GetOrdersAPI());

                const apiOrders = (res.data?.data || [])
                    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
                    .slice(0, 5);

                const formatted = apiOrders.map(order => ({
                    id: "#RI-" + order.id,
                    product: order.items
                        ?.map(i => i.product_details?.name)
                        .filter(Boolean)
                        .join(", ") || "Unknown Product",
                    date: new Date(order.created_at).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric"
                    }),
                    status: capitalize(order.status),
                    price: order.total_amount
                }));

                setOrders(formatted);

            } catch (err) {
                console.log(err);
                toast.error("Failed to load orders");
            } finally {
                setLoading(false); // ✅ IMPORTANT
            }
        };

        // initial load
        fetchOrders();

        // listen for updates
        const handleUpdate = () => fetchOrders();

        window.addEventListener("orderUpdated", handleUpdate);

        return () => {
            window.removeEventListener("orderUpdated", handleUpdate);
        };

    }, []);

    const statusStyle = {
        Delivered: "bg-green-500/20 text-green-400",
        Processing: "bg-blue-500/20 text-blue-400",
        Cancelled: "bg-red-500/20 text-red-400",
        Pending: "bg-yellow-500/20 text-yellow-400",
        Confirmed: "bg-purple-500/20 text-purple-400" // ✅ FIXED
    };

    // ================= SKELETON =================
    if (loading) {
        return (
            <div className="bg-[#1c0f09] p-5 rounded-2xl border border-[#ffffff10] animate-pulse">

                <div className="flex justify-between items-center mb-4">
                    <div className="h-4 w-40 bg-gray-700 rounded"></div>
                    <div className="h-4 w-16 bg-gray-700 rounded"></div>
                </div>

                <div className="overflow-hidden rounded-xl border border-[#ffffff10]">

                    <div className="grid grid-cols-4 bg-[#2a1208] px-4 py-3">
                        <div className="h-3 bg-gray-700 rounded w-16"></div>
                        <div className="h-3 bg-gray-700 rounded w-20"></div>
                        <div className="h-3 bg-gray-700 rounded w-16"></div>
                        <div className="h-3 bg-gray-700 rounded w-16 ml-auto"></div>
                    </div>

                    {[1, 2].map((_, i) => (
                        <div
                            key={i}
                            className="grid grid-cols-4 items-center px-4 py-4 border-b border-[#ffffff10]"
                        >
                            <div className="h-3 bg-gray-700 rounded w-20"></div>

                            <div className="space-y-2">
                                <div className="h-3 bg-gray-700 rounded w-32"></div>
                                <div className="h-2 bg-gray-700 rounded w-20"></div>
                            </div>

                            <div className="h-6 bg-gray-700 rounded-full w-20"></div>

                            <div className="h-3 bg-gray-700 rounded w-16 ml-auto"></div>
                        </div>
                    ))}

                </div>

            </div>
        );
    }

    return (
        <div className="bg-[#1c0f09] p-5 rounded-2xl border border-[#ffffff10]">

            {/* HEADER */}
            <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold flex items-center gap-2">
                    <Clock size={18} className="text-orange-400" />
                    Recent Order History
                </h3>

                <span
                    onClick={() => navigate("/orders")}
                    className="text-orange-400 text-sm cursor-pointer hover:underline"
                >
                    View All
                </span>
            </div>

            {/* TABLE */}
            <div className="overflow-hidden rounded-xl border border-[#ffffff10]">

                {/* HEADER */}
                <div className="grid grid-cols-[1fr_2fr_1.2fr_1fr] bg-[#2a1208] text-xs text-gray-400 px-4 py-3">
                    <span>Order ID</span>
                    <span>Product</span>
                    <span>Status</span>
                    <span className="text-right">Total</span>
                </div>

                {/* BODY */}
                {orders.length === 0 ? (
                    <div className="text-center py-6 text-gray-400">
                        No orders found
                    </div>
                ) : (
                    orders.map((order) => (
                        <div
                            key={order.id}
                            className="grid grid-cols-[1fr_2fr_1.2fr_1fr] items-center px-4 py-4 text-sm border-b border-[#ffffff10] hover:bg-[#2a1208] transition"
                        >

                            {/* ORDER ID */}
                            <span className="text-gray-400 text-xs">
                                {order.id}
                            </span>

                            {/* PRODUCT */}
                            <div>
                                <p>{order.product}</p>
                                <p className="text-gray-500 text-xs">
                                    {order.date}
                                </p>
                            </div>

                            {/* STATUS */}
                            <span
                                className={`px-2 py-1 rounded-full text-xs w-fit ${statusStyle[order.status] || "bg-gray-500/20 text-gray-300"}`}
                            >
                                {order.status}
                            </span>

                            {/* PRICE */}
                            <span className="text-right font-medium">
                                ₹{Number(order.price || 0).toLocaleString()}
                            </span>

                        </div>
                    ))
                )}

            </div>

        </div>
    );
}