import { useEffect, useState } from "react";
import API from "../../api/axiosInstance";
import { getPoliciesAPI, getPolicyByTypeAPI } from "../../api/api";

export default function TermsComponent() {
    const [policies, setPolicies] = useState([]);
    const [selectedPolicy, setSelectedPolicy] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPolicies = async () => {
            try {
                const res = await API.get(getPoliciesAPI());
                const list = res.data?.data || [];

                setPolicies(list);

                if (list.length > 0) {
                    fetchPolicyDetails(list[0].policy_type);
                }
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchPolicies();
    }, []);

    const fetchPolicyDetails = async (type) => {
        try {
            const res = await API.get(getPolicyByTypeAPI(type));
            setSelectedPolicy(res.data?.data);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="bg-black text-white min-h-screen py-16 sm:py-20">

            {/* 🔥 CENTERED CONTAINER */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* HEADER */}
                <div className="text-center mb-12 sm:mb-16">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl text-[#f97316] font-serif">
                        Policies
                    </h1>
                </div>

                {/* 🔥 MOBILE SIDEBAR (SCROLLABLE) */}
                <div className="md:hidden mb-6 overflow-x-auto">
                    <div className="flex gap-4 whitespace-nowrap">

                        {loading ? (
                            [...Array(4)].map((_, i) => (
                                <div
                                    key={i}
                                    className="h-4 w-24 bg-gray-800 rounded animate-pulse"
                                ></div>
                            ))
                        ) : (
                            policies.map((item) => (
                                <button
                                    key={item.id}
                                    onClick={() =>
                                        fetchPolicyDetails(item.policy_type)
                                    }
                                    className={`px-3 py-1 rounded-full text-sm ${selectedPolicy?.policy_type === item.policy_type
                                        ? "bg-[#f97316] text-white"
                                        : "bg-gray-800 text-gray-400"
                                        }`}
                                >
                                    {item.title}
                                </button>
                            ))
                        )}

                    </div>
                </div>

                {/* GRID */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">

                    {/* DESKTOP SIDEBAR */}
                    <div className="hidden md:block">
                        <div className="sticky top-28 space-y-4 text-gray-400">

                            {loading ? (
                                [...Array(4)].map((_, i) => (
                                    <div
                                        key={i}
                                        className="h-4 w-3/4 bg-gray-800 rounded animate-pulse"
                                    ></div>
                                ))
                            ) : (
                                policies.map((item) => (
                                    <p
                                        key={item.id}
                                        onClick={() =>
                                            fetchPolicyDetails(item.policy_type)
                                        }
                                        className={`cursor-pointer hover:text-white transition ${selectedPolicy?.policy_type === item.policy_type
                                            ? "text-[#f97316]"
                                            : ""
                                            }`}
                                    >
                                        {item.title}
                                    </p>
                                ))
                            )}

                        </div>
                    </div>

                    {/* CONTENT */}
                    <div className="md:col-span-3">

                        {loading ? (
                            <div className="space-y-6 animate-pulse">
                                <div className="h-6 w-1/2 bg-gray-700 rounded"></div>
                                <div className="h-4 w-1/4 bg-gray-800 rounded"></div>

                                <div className="space-y-3">
                                    <div className="h-4 bg-gray-800 rounded"></div>
                                    <div className="h-4 bg-gray-800 rounded"></div>
                                    <div className="h-4 bg-gray-800 rounded"></div>
                                    <div className="h-4 bg-gray-800 rounded w-5/6"></div>
                                </div>
                            </div>
                        ) : !selectedPolicy ? (
                            <p>No policy selected</p>
                        ) : (
                            <div>

                                <h2 className="text-xl sm:text-2xl text-[#f97316] mb-4">
                                    {selectedPolicy.title}
                                </h2>

                                <p className="text-gray-400 mb-6 text-sm">
                                    {selectedPolicy.last_updated}
                                </p>

                                <div className="relative group">

                                    {/* Glow Border */}
                                    <div className="absolute inset-0 rounded-2xl bg-linear-to-r from-[#f97316]/20 to-transparent opacity-0 group-hover:opacity-100 blur-xl transition duration-500"></div>

                                    {/* Content Card */}
                                    <div className="relative bg-[#0d0d0d] border border-[#1a1a1a] rounded-2xl p-5 sm:p-6 md:p-8 
        text-gray-300 leading-8 text-[15px] sm:text-base
        shadow-[0_0_30px_rgba(0,0,0,0.6)] 
        hover:border-[#f97316]/40 transition duration-300">

                                        {/* Content */}
                                        <div className="space-y-4">

                                            {/* If backend sends plain text */}
                                            <p className="text-gray-300 whitespace-pre-line">
                                                {selectedPolicy.content}
                                            </p>

                                        </div>

                                    </div>
                                </div>

                            </div>
                        )}

                    </div>

                </div>
            </div>
        </div>
    );
}