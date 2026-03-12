import { motion } from "framer-motion";

export default function CollectionItem({
    title,
    subtitle,
    desc,
    img,
    reverse,
}) {

    const textAnimation = {
        hidden: { opacity: 0, x: reverse ? 80 : -80 },
        show: { opacity: 1, x: 0 }
    };

    const imageAnimation = {
        hidden: { opacity: 0, x: reverse ? -80 : 80 },
        show: { opacity: 1, x: 0 }
    };

    return (
        <div className="grid md:grid-cols-2 items-center gap-24">

            {/* TEXT */}
            <motion.div
                className={`${reverse ? "md:order-2" : ""} max-w-md`}
                variants={textAnimation}
                initial="hidden"
                whileInView="show"
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
            >

                <h2 className="text-4xl font-serif mb-3 italic text-white">
                    {title}
                </h2>

                <p className="text-[#EC5B13] text-xs tracking-[4px] mb-6">
                    {subtitle}
                </p>

                <p className="text-gray-400 text-sm leading-relaxed mb-8">
                    {desc}
                </p>

                <ul className="space-y-2 text-sm text-gray-300 mb-8">
                    <li>✦ Intricate Filigree Work</li>
                    <li>✦ Customized Regional Designs</li>
                </ul>

                <button className="text-sm tracking-wide hover:text-[#EC5B13] transition">
                    EXPLORE {title.toUpperCase()} →
                </button>

            </motion.div>


            {/* IMAGE */}
            <motion.div
                className={`${reverse ? "md:order-1" : ""}`}
                variants={imageAnimation}
                initial="hidden"
                whileInView="show"
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
            >

                <img
                    src={img}
                    alt={title}
                    className="w-full max-w-105 mx-auto rounded-lg object-cover hover:scale-105 transition duration-700"
                />

            </motion.div>

        </div>
    );
}