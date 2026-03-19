import { motion } from "framer-motion";
import art1 from "../../assets/images/art1.png";
import art2 from "../../assets/images/art2.png";
import art3 from "../../assets/images/art3.png";

export default function ArtOfCreation() {

    const items = [
        {
            title: "Micro-Pavé Setting",
            desc: "Hand-set under high-power magnification for a seamless carpet of brilliance.",
            img: art1
        },
        {
            title: "Ethical Sourcing",
            desc: "Conflict-free diamonds sourced via the Kimberley Process with full traceability.",
            img: art2
        },
        {
            title: "Bespoke Design",
            desc: "Fluid geometry designed to sit perfectly against the collarbone of any wearer.",
            img: art3
        }
    ];

    return (
        <section className="mt-24 px-4 md:px-10">

            {/* TITLE */}
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="text-center mb-12"
            >
                <h2 className="text-3xl md:text-4xl font-semibold">
                    The Art of Creation
                </h2>

                <div className="w-16 h-0.5 bg-orange-500 mx-auto mt-3 mb-4"></div>

                <p className="text-gray-400 max-w-xl mx-auto text-sm md:text-base">
                    Every Aura piece undergoes a rigorous 7-stage quality check,
                    from the initial pencil sketch to the final ultrasonic cleaning.
                </p>
            </motion.div>

            {/* CARDS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">

                {items.map((item, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.2 }}
                        viewport={{ once: true }}
                        className="
                            relative 
                            h-75 sm:h-87.5 md:h-100
                            rounded-xl 
                            overflow-hidden 
                            group 
                            cursor-pointer
                        "
                    >

                        {/* IMAGE */}
                        <img
                            src={item.img}
                            alt={item.title}
                            className="
                                w-full h-full 
                                object-cover 
                                transition duration-500 
                                group-hover:scale-110
                            "
                        />

                        {/* OVERLAY */}
                        <div className="
                            absolute inset-0 
                            bg-linear-to-t 
                            from-black/90 via-black/40 to-transparent
                        "></div>

                        {/* TEXT */}
                        <div className="absolute bottom-0 p-5">
                            <h3 className="text-white text-lg md:text-xl font-semibold mb-1">
                                {item.title}
                            </h3>

                            <p className="text-gray-300 text-sm">
                                {item.desc}
                            </p>
                        </div>

                    </motion.div>
                ))}

            </div>

        </section>
    );
}