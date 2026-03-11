import { useState } from "react";
import CollectionsHeader from "../components/CollectionsHeader";
import ProductCard from "../components/ProductCard";

const products = [
    { image: "/images/ring.png", tag: "18K GOLD", category: "RINGS", name: "Solitaire Diamond Ring", price: "$4,500" },
    { image: "/images/necklace.png", tag: "YELLOW GOLD", category: "NECKLACES", name: "Golden Horizon Necklace", price: "$1,850" },
    { image: "/images/watch.png", tag: "STEEL", category: "WATCHES", name: "Obsidian Chronograph", price: "$8,200" },
    { image: "/images/earring.jpg", tag: "WHITE GOLD", category: "EARRINGS", name: "Classic Pearl Earrings", price: "$950" },
    { image: "/images/bracelet.jpg", tag: "PLATINUM", category: "BRACELETS", name: "Diamond Tennis Bracelet", price: "$6,200" },
    { image: "/images/ring2.jpg", tag: "18K GOLD", category: "RINGS", name: "Sapphire Midnight Ring", price: "$3,800" }
];

export default function Collections() {

    const [currentPage, setCurrentPage] = useState(1);
    const [animate, setAnimate] = useState(false);

    const productsPerPage = 3;

    const indexOfLast = currentPage * productsPerPage;
    const indexOfFirst = indexOfLast - productsPerPage;

    const currentProducts = products.slice(indexOfFirst, indexOfLast);

    const totalPages = Math.ceil(products.length / productsPerPage);

    const changePage = (page) => {
        setAnimate(true);

        setTimeout(() => {
            setCurrentPage(page);
            setAnimate(false);
        }, 250);
    };

    return (
        <div className="bg-black min-h-screen text-white">

            <CollectionsHeader />

            <div className="px-6 md:px-12 lg:px-20 pb-20">

                {/* Animated Grid */}
                <div
                    className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12
                    transition-all duration-300
                    ${animate ? "opacity-0 translate-y-6" : "opacity-100 translate-y-0"}`}
                >
                    {currentProducts.map((product, index) => (
                        <ProductCard key={index} {...product} />
                    ))}
                </div>

                {/* Pagination */}
                <div className="flex justify-center items-center gap-4 mt-20">

                    <button
                        onClick={() => changePage(Math.max(currentPage - 1, 1))}
                        className="border border-gray-700 px-6 py-3 text-sm tracking-widest hover:border-white"
                    >
                        PREV
                    </button>

                    {[...Array(totalPages)].map((_, i) => (
                        <button
                            key={i}
                            onClick={() => changePage(i + 1)}
                            className={`px-5 py-3 border text-sm ${currentPage === i + 1
                                    ? "bg-[#C9B582] text-black border-[#C9B582]"
                                    : "border-gray-700 text-gray-300"
                                }`}
                        >
                            {i + 1}
                        </button>
                    ))}

                    <button
                        onClick={() => changePage(Math.min(currentPage + 1, totalPages))}
                        className="border border-gray-700 px-6 py-3 text-sm tracking-widest hover:border-white"
                    >
                        NEXT
                    </button>

                </div>

            </div>

        </div>
    );
}