import { FiHeart } from "react-icons/fi";
import { useState } from "react";
import Breadcrumb from "../components/Breadcrumb";
import { useParams, useNavigate } from "react-router-dom";
import { products } from "../data/products";
import { useWishlist } from "../context/WishlistContext";

export default function Collections() {

    const { toggleWishlist, isInWishlist } = useWishlist();

    const { collectionName } = useParams();
    const navigate = useNavigate();

    const title = collectionName
        ? collectionName.charAt(0).toUpperCase() + collectionName.slice(1)
        : "All Collections";

    const [openSort, setOpenSort] = useState(false);
    const [activeCategory, setActiveCategory] = useState("All");
    const [searchText, setSearchText] = useState("");
    const [sortOption, setSortOption] = useState("Default");

    // ✅ FILTER
    let filteredProducts = products.filter((product) => {
        const matchesCategory =
            activeCategory === "All" || product.category === activeCategory;

        const matchesSearch =
            product.name.toLowerCase().includes(searchText.toLowerCase());

        return matchesCategory && matchesSearch;
    });

    // ✅ SORT (PRO)
    if (sortOption === "Low") {
        filteredProducts.sort((a, b) => a.price - b.price);
    }

    if (sortOption === "High") {
        filteredProducts.sort((a, b) => b.price - a.price);
    }

    // ✅ COUNT
    const totalCount = filteredProducts.length;

    return (
        <div className="min-h-screen bg-[#1c0f09] text-white px-6 md:px-16 py-12">

            <Breadcrumb customLast={title} />

            {/* TITLE */}
            <h1 className="text-4xl font-bold mb-2 capitalize">
                {title}
            </h1>

            <p className="text-gray-400 mb-10">
                Keep track of your favorite obsidian and gold handcrafted pieces.
            </p>

            {/* FILTER BAR */}
            <div className="border-b border-[#3b2017] pb-4 mb-8">

                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

                    {/* CATEGORIES */}
                    <div className="flex gap-6 text-sm font-medium overflow-x-auto whitespace-nowrap">

                        <button
                            onClick={() => setActiveCategory("All")}
                            className={activeCategory === "All"
                                ? "text-orange-500 border-b-2 border-orange-500 pb-1"
                                : "hover:text-orange-400"}
                        >
                            All Items ({totalCount})
                        </button>

                        <button
                            onClick={() => setActiveCategory("Necklaces")}
                            className={activeCategory === "Necklaces"
                                ? "text-orange-500 border-b-2 border-orange-500 pb-1"
                                : "hover:text-orange-400"}
                        >
                            Necklaces
                        </button>

                        <button
                            onClick={() => setActiveCategory("Rings")}
                            className={activeCategory === "Rings"
                                ? "text-orange-500 border-b-2 border-orange-500 pb-1"
                                : "hover:text-orange-400"}
                        >
                            Rings
                        </button>

                        <button
                            onClick={() => setActiveCategory("Bangles")}
                            className={activeCategory === "Bangles"
                                ? "text-orange-500 border-b-2 border-orange-500 pb-1"
                                : "hover:text-orange-400"}
                        >
                            Bangles
                        </button>

                        <button
                            onClick={() => setActiveCategory("Earrings")}
                            className={activeCategory === "Earrings"
                                ? "text-orange-500 border-b-2 border-orange-500 pb-1"
                                : "hover:text-orange-400"}
                        >
                            Earrings
                        </button>

                    </div>

                    {/* SORT + SEARCH */}
                    <div className="flex items-center gap-4 mt-4">

                        {/* SORT */}
                        <div className="relative">
                            <div
                                onClick={() => setOpenSort(!openSort)}
                                className="flex items-center gap-2 text-[10px] md:text-sm text-gray-300 cursor-pointer hover:text-white"
                            >
                                <span>Sort by</span>
                                <span>▼</span>
                            </div>

                            {openSort && (
                                <div className="absolute left-0 mt-2 w-44 bg-[#24130c] border border-[#3b2017] rounded-lg shadow-lg z-50">

                                    <button
                                        onClick={() => { setSortOption("Default"); setOpenSort(false); }}
                                        className="block w-full text-left px-4 py-2 hover:bg-[#3b2017] text-sm"
                                    >
                                        Default
                                    </button>

                                    <button
                                        onClick={() => { setSortOption("Low"); setOpenSort(false); }}
                                        className="block w-full text-left px-4 py-2 hover:bg-[#3b2017] text-sm"
                                    >
                                        Price: Low to High
                                    </button>

                                    <button
                                        onClick={() => { setSortOption("High"); setOpenSort(false); }}
                                        className="block w-full text-left px-4 py-2 hover:bg-[#3b2017] text-sm"
                                    >
                                        Price: High to Low
                                    </button>

                                </div>
                            )}
                        </div>

                        {/* SEARCH */}
                        <input
                            type="text"
                            placeholder="Search jewelry..."
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                            className="bg-[#2a140c] px-4 py-2 rounded-md border border-[#3b2017] outline-none text-sm"
                        />

                    </div>

                </div>
            </div>

            {/* PRODUCTS GRID */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">

                {filteredProducts.map((product) => (
                    <div
                        key={product.id}
                        className="bg-[#24130c] p-4 rounded-xl shadow-lg hover:scale-105 transition duration-300 border border-[#ffffff0d]"
                    >

                        {/* IMAGE */}
                        <div className="relative">
                            <img
                                src={
                                    Array.isArray(product.images)
                                        ? product.images[0]
                                        : product.images?.thumbnail
                                }
                                alt={product.name}
                                className="rounded-lg w-full h-48 object-cover"
                            />

                            {/* ❤️ WISHLIST */}
                            <button
                                onClick={() => toggleWishlist(product)}
                                className={`absolute top-2 right-2 p-2 rounded-full transition
                                ${isInWishlist(product.id)
                                        ? "bg-orange-500 text-white scale-110"
                                        : "bg-black/50 text-gray-300 hover:scale-110"
                                    }`}
                            >
                                <FiHeart />
                            </button>
                        </div>

                        {/* INFO */}
                        <h3 className="mt-4 font-semibold text-sm">
                            {product.name}
                        </h3>

                        <p className="text-orange-400 font-semibold">
                            ₹{typeof product.price === "number"
                                ? product.price.toLocaleString()
                                : product.price}
                        </p>

                        {/* ACTIONS */}
                        <div className="mt-4 flex flex-col gap-2">

                            <button
                                onClick={() => navigate(`/product/${product.id}`)}
                                className="bg-[#2f1a12] py-2 rounded-md text-sm hover:bg-[#3b2017] transition"
                            >
                                View Details
                            </button>

                            <button className="bg-orange-500 py-2 rounded-md text-sm font-semibold hover:bg-orange-600 transition">
                                Add to Cart
                            </button>

                        </div>

                    </div>
                ))}

            </div>

        </div>
    );
}