import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";

export default function ProductInfo({ product }) {

    const navigate = useNavigate();
    const { addToCart } = useCart();

    return (
        <div className="flex flex-col justify-center">

            {/* ✅ BREADCRUMB */}
            {/* <Breadcrumb customLast={product.name} /> */}

            {/* TITLE */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold leading-tight mb-4">
                {product.name}
            </h1>

            {/* SUBTITLE */}
            <p className="text-orange-400 mb-6 text-sm sm:text-base">
                18K Rose Gold • 4.2 Carat GIA Certified Brilliants
            </p>

            {/* DESCRIPTION */}
            <p className="text-gray-400 leading-relaxed mb-8 max-w-xl text-sm sm:text-base">
                {product.description}
            </p>

            {/* STATS */}
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

            {/* PRICE */}
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

            {/* BUTTONS */}
            <div className="flex flex-col sm:flex-row gap-4">

                <button
                    onClick={() => {
                        console.log("Adding product:", product); // ✅ DEBUG
                        addToCart(product);   // ✅ ADD DATA
                        navigate("/cart");    // ✅ GO TO CART
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