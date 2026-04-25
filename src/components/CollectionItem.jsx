// home page collection component

import { motion } from "framer-motion";
import { LuSparkles } from "react-icons/lu";
import { Link } from "react-router-dom";

//using width layout
export default function CollectionItem({ Items, reverse }) {

    const { description, category_image_url, name, id } = Items;

    // console.log(Items, "items")

    const textAnimation = {
        hidden: { opacity: 0, x: reverse ? 40 : -40 },
        show: { opacity: 1, x: 0 },
    };

    const imageAnimation = {
        hidden: { opacity: 0, x: reverse ? 40 : -40 },
        show: { opacity: 1, x: 0 },
    };

    return (
        <div
            className={`flex flex-col md:flex-row ${reverse ? "md:flex-row-reverse" : ""} items-center gap-12 md:gap-24 overflow-hidden`}
        >

            {/* IMAGE (always first on mobile) */}
            <motion.div
                className="w-full md:w-1/2"
                variants={imageAnimation}
                initial="hidden"
                whileInView="show"
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
            >
                <img
                    src={category_image_url}
                    alt={name}
                    className="w-full max-w-md mx-auto rounded-lg object-cover hover:scale-105 transition duration-700"
                />

            </motion.div>

            {/* TEXT */}
            <motion.div
                className="w-full md:w-1/2 max-w-md"
                variants={textAnimation}
                initial="hidden"
                whileInView="show"
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
            >
                <h2 className="text-4xl font-serif mb-3 italic text-white">
                    {name}
                </h2>

                <p className="text-[#EC5B13] text-xs tracking-[4px] mb-6">
                    COLLECTION
                </p>

                <p className="text-gray-400 text-sm leading-relaxed mb-8">
                    {description}
                </p>

                <ul className="space-y-3 text-sm text-gray-300 mb-8">
                    <li className="flex items-center gap-2">
                        <LuSparkles className="text-orange-500 text-lg" />
                        <span>Intricate Filigree Work</span>
                    </li>

                    <li className="flex items-center gap-2">
                        <LuSparkles className="text-orange-500 text-lg" />
                        <span>Customized Regional Designs</span>
                    </li>
                </ul>

                {/* <Link
                    to="/collections"
                    className="text-sm text-white tracking-wide hover:text-[#EC5B13] transition"
                >
                    EXPLORE {title.toUpperCase()} →
                </Link> */}

                <Link to={`/collections/${name.toLowerCase()}`}
                    className="text-sm text-white tracking-wide hover:text-[#EC5B13] transition">
                    EXPLORE {name.toUpperCase()} →
                </Link>
            </motion.div>
        </div>
    );
}