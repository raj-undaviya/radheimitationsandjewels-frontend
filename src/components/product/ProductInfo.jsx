import { useNavigate } from "react-router-dom";

export default function ProductInfo({ product }) {

    const navigate = useNavigate();

    // ADD TO CART
    const addToCart = (product) => {
        const cart = JSON.parse(localStorage.getItem("cart")) || [];

        const exists = cart.find((item) => item.id === product.id);

        let updated;

        if (exists) {
            updated = cart.map((item) =>
                item.id === product.id
                    ? { ...item, qty: item.qty + 1 }
                    : item
            );
        } else {
            updated = [...cart, { ...product, qty: 1 }];
        }

        localStorage.setItem("cart", JSON.stringify(updated));
        window.dispatchEvent(new Event("cartUpdated"));
    };

    // ✅ SKELETON STATE
    if (!product) {
        return (
            <div className="flex flex-col justify-center animate-pulse">

                {/* TITLE */}
                <div className="h-8 w-3/4 bg-gray-700 rounded mb-4"></div>

                {/* SUBTITLE */}
                <div className="h-4 w-1/2 bg-gray-700 rounded mb-6"></div>

                {/* DESCRIPTION */}
                <div className="space-y-2 mb-8">
                    <div className="h-3 bg-gray-700 rounded w-full"></div>
                    <div className="h-3 bg-gray-700 rounded w-5/6"></div>
                    <div className="h-3 bg-gray-700 rounded w-4/6"></div>
                </div>

                {/* BOXES */}
                <div className="grid grid-cols-3 gap-3 mb-8">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="bg-[#111] p-4 rounded-xl border border-[#2a1a14]">
                            <div className="h-3 w-1/2 bg-gray-700 rounded mb-2"></div>
                            <div className="h-4 w-2/3 bg-gray-700 rounded"></div>
                        </div>
                    ))}
                </div>

                {/* PRICE */}
                <div className="flex items-center gap-4 mb-8">
                    <div className="h-6 w-24 bg-gray-700 rounded"></div>
                    <div className="h-4 w-16 bg-gray-700 rounded"></div>
                </div>

                {/* BUTTONS */}
                <div className="flex gap-4">
                    <div className="h-12 w-40 bg-gray-700 rounded-xl"></div>
                    <div className="h-12 w-40 bg-gray-700 rounded-xl"></div>
                </div>

            </div>
        );
    }

    return (
        <div className="flex flex-col justify-center">

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold leading-tight mb-4">
                {product.name}
            </h1>

            <p className="text-orange-400 mb-6 text-sm sm:text-base">
                18K Rose Gold • 4.2 Carat GIA Certified Brilliants
            </p>

            <p className="text-gray-400 leading-relaxed mb-8 max-w-xl text-sm sm:text-base">
                {product.description}
            </p>

            <div className="grid grid-cols-3 gap-3 sm:gap-4 mb-8">

                <div className="bg-[#111] p-4 rounded-xl border border-[#2a1a14]">
                    <p className="text-xs text-gray-400">CUT GRADE</p>
                    <p className="font-semibold mt-1">{product.cut}</p>
                </div>

                <div className="bg-[#111] p-4 rounded-xl border border-[#2a1a14]">
                    <p className="text-xs text-gray-400">CLARITY</p>
                    <p className="font-semibold mt-1">{product.clarity}</p>
                </div>

                <div className="bg-[#111] p-4 rounded-xl border border-[#2a1a14]">
                    <p className="text-xs text-gray-400">GOLD WEIGHT</p>
                    <p className="font-semibold mt-1">{product.weight}</p>
                </div>

            </div>

            <div className="flex items-center gap-4 mb-8 flex-wrap">
                <h2 className="text-2xl sm:text-3xl font-bold">
                    ₹{product.price}
                </h2>

                <span className="line-through text-gray-500 text-sm">
                    ₹15,800
                </span>

                <span className="bg-orange-600 text-xs px-3 py-1 rounded-md">
                    ESTATE VALUE
                </span>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">

                <button
                    onClick={() => {
                        addToCart(product);
                        navigate("/cart");
                    }}
                    className="bg-orange-500 px-8 py-3 rounded-xl font-semibold"
                >
                    ADD TO CART
                </button>

                <button className="border border-orange-500 px-8 py-3 rounded-xl font-semibold hover:bg-orange-500 transition w-full sm:w-auto">
                    BUY NOW
                </button>

            </div>

            <p className="text-gray-500 text-xs mt-4 text-center sm:text-left">
                Complimentary Secure Global Shipping & Lifetime Warranty Included
            </p>

        </div>
    );
}