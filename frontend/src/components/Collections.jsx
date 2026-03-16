import { FiHeart } from "react-icons/fi";
import { useState } from "react";
import necklace1 from "../assets/images/necklace1.png";
import ring1 from "../assets/images/ring1.png";
import bangle1 from "../assets/images/bangle1.png";
import choker1 from "../assets/images/choker1.png";
import earring1 from "../assets/images/earring1.png";
import kada1 from "../assets/images/kada1.png";
import Breadcrumb from "../components/Breadcrumb";
import { useParams } from "react-router-dom";

const products = [
    {
        id: 1,
        name: "Gold Plated Kundan Necklace",
        price: "₹4,500",
        img: necklace1,
        category: "Necklaces",
    },
    {
        id: 2,
        name: "Obsidian Stone Ring",
        price: "₹1,200",
        img: ring1,
        category: "Rings",
    },
    {
        id: 3,
        name: "Temple Work Bangles",
        price: "₹3,800",
        img: bangle1,
        category: "Bangles",
    },
    {
        id: 4,
        name: "Polki Choker Set",
        price: "₹7,200",
        img: choker1,
        category: "Necklaces",
    },
    {
        id: 5,
        name: "Handcrafted Gold Studs",
        price: "₹2,100",
        img: earring1,
        category: "Earrings",
    },
    {
        id: 6,
        name: "Ethnic Bridal Kada",
        price: "₹5,500",
        img: kada1,
        category: "Bangles",
    },
];

export default function Collections() {

    const { collectionName } = useParams();

    const title = collectionName
        ? collectionName.charAt(0).toUpperCase() + collectionName.slice(1)
        : "All Collections";

    const [openSort, setOpenSort] = useState(false);
    const [activeCategory, setActiveCategory] = useState("All");
    const [searchText, setSearchText] = useState("");
    const [sortOption, setSortOption] = useState("Default");

    // Category + Search filter
    let filteredProducts = products.filter((product) => {

        const matchesCategory =
            activeCategory === "All" || product.category === activeCategory;

        const matchesSearch =
            product.name.toLowerCase().includes(searchText.toLowerCase());

        return matchesCategory && matchesSearch;

    });

    // Sorting logic
    if (sortOption === "Low") {
        filteredProducts.sort(
            (a, b) =>
                parseInt(a.price.replace(/[^0-9]/g, "")) -
                parseInt(b.price.replace(/[^0-9]/g, ""))
        );
    }

    if (sortOption === "High") {
        filteredProducts.sort(
            (a, b) =>
                parseInt(b.price.replace(/[^0-9]/g, "")) -
                parseInt(a.price.replace(/[^0-9]/g, ""))
        );
    }

    return (
        <div className="min-h-screen bg-[#1c0f09] text-white px-6 md:px-16 py-12">

            <Breadcrumb customLast={title} />

            <h1 className="text-4xl font-bold mb-2 capitalize">
                {title}
            </h1>

            <p className="text-gray-400 mb-10">
                Keep track of your favorite obsidian and gold handcrafted pieces.
            </p>

            <div className="border-b border-[#3b2017] pb-4 mb-8">

                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

                    {/* Categories */}
                    <div className="flex gap-6 text-sm font-medium overflow-x-auto whitespace-nowrap">

                        <button
                            onClick={() => setActiveCategory("All")}
                            className={activeCategory === "All"
                                ? "text-orange-500 border-b-2 border-orange-500 pb-1"
                                : "hover:text-orange-400"}
                        >
                            All Items
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

                    {/* Sort + Search */}
                    <div className="flex items-center justify-between gap-4 mt-4">

                        {/* Sort */}
                        <div className="relative">

                            <div
                                onClick={() => setOpenSort(!openSort)}
                                className="flex items-center gap-2 text-[13px] md:text-sm text-gray-300 cursor-pointer hover:text-white"
                            >
                                <span>Sort by</span>
                                <span className="text-xs">▼</span>
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

                        {/* Search */}
                        <input
                            type="text"
                            placeholder="Search jewelry..."
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                            className="bg-[#2a140c] px-4 py-2 rounded-md border border-[#3b2017] outline-none text-sm flex-1"
                        />

                    </div>

                </div>

            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">

                {filteredProducts.map((product) => (
                    <div
                        key={product.id}
                        className="bg-[#24130c] p-4 rounded-xl shadow-lg hover:scale-105 transition duration-300 border-[#FFFFFF0D]"
                    >

                        <div className="relative">
                            <img
                                src={product.img}
                                alt={product.name}
                                className="rounded-lg w-full h-48 object-cover"
                            />

                            <button className="absolute top-2 right-2 bg-black/50 p-2 rounded-full hover:bg-[#EF444499] hover:text-[#EF444499]">
                                <FiHeart />
                            </button>
                        </div>

                        <h3 className="mt-4 font-semibold text-sm">
                            {product.name}
                        </h3>

                        <p className="text-orange-400 font-semibold">
                            {product.price}
                        </p>

                        <div className="mt-4 flex flex-col gap-2">

                            <button className="bg-[#2f1a12] py-2 rounded-md text-sm hover:bg-[#3b2017] transition">
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