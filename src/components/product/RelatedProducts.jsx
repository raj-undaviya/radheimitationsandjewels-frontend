import { products } from "../../data/products";
import { useNavigate } from "react-router-dom";

export default function RelatedProducts({ product }) {

    const navigate = useNavigate();

    if (!product) return null;

    const getSmartRelatedProducts = () => {

        const currentPrice = product.price;

        const sameCategory = products.filter(
            p => p.category === product.category && p.id !== product.id
        );

        const similarPrice = products.filter(p => {
            return (
                p.id !== product.id &&
                Math.abs(p.price - currentPrice) <= 2000 &&
                p.category !== product.category
            );
        });

        const others = products.filter(
            p => p.id !== product.id &&
                p.category !== product.category
        );

        const final = [
            ...sameCategory,
            ...similarPrice,
            ...others
        ];

        return [...new Map(final.map(item => [item.id, item])).values()].slice(0, 4);
    };

    const related = getSmartRelatedProducts();

    return (
        <section className="mt-20">

            {/* 🔥 TITLE */}
            <h2 className="text-xl sm:text-2xl font-medium text-gray-200 mb-8">
                Complete the Aura Ensemble
            </h2>

            {/* 🔥 GRID */}
            <div className="
                grid 
                grid-cols-2 
                sm:grid-cols-2 
                md:grid-cols-3 
                lg:grid-cols-4 
                gap-5
            ">

                {related.map((item) => (

                    <div
                        key={item.id}
                        onClick={() => navigate(`/product/${item.id}`)}
                        className="group cursor-pointer"
                    >

                        {/* 🔥 CARD */}
                        <div className="
                            bg-[#111] 
                            border border-[#1f1f1f] 
                            rounded-xl 
                            p-3 
                            transition 
                            hover:border-orange-500/50
                        ">

                            {/* 🔥 IMAGE BOX (SQUARE FIXED) */}
                            <div className="
                                relative 
                                w-full 
                                aspect-square 
                                bg-[#0b0b0b] 
                                rounded-lg 
                                overflow-hidden
                            ">

                                <img
                                    src={item.relatedImage || item.images.thumbnail}
                                    alt={item.name}
                                    className="
                                        w-full h-full 
                                        object-cover 
                                        transition duration-300 
                                        group-hover:scale-105
                                    "
                                />

                            </div>

                        </div>

                        {/* 🔥 TEXT */}
                        <div className="mt-3 px-1">

                            <h3 className="
                                text-xs sm:text-sm 
                                text-gray-300 
                                line-clamp-1
                            ">
                                {item.name}
                            </h3>

                            <p className="
                                text-orange-500 
                                text-sm 
                                mt-1 
                                font-medium
                            ">
                                ₹{item.price}
                            </p>

                        </div>

                    </div>

                ))}

            </div>

        </section>
    );
}