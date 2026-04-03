import { FiMail } from "react-icons/fi";

export default function SubscribeSection() {
    return (
        <section className="w-full bg-linear-to-r from-[#120704] via-[#1a0b06] to-[#120704] py-20 text-white">

            <div className="max-w-4xl mx-auto px-6 text-center">

                {/* Icon */}
                <div className="flex justify-center mb-6">
                    <div className="border border-[#EC5B13] p-3 rounded-sm">
                        <FiMail className="text-[#EC5B13] text-2xl hover:text-white" />
                    </div>
                </div>

                {/* Heading */}
                <h2
                    className="text-3xl md:text-4xl font-serif mb-4"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                >
                    Join the Circle of Elegance
                </h2>

                {/* Description */}
                <p className="text-gray-400 mb-10 max-w-2xl mx-auto">
                    Subscribe to receive exclusive previews of our new collections
                    and private event invitations.
                </p>

                {/* Form */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">

                    <input
                        type="email"
                        placeholder="Your email address"
                        className="bg-black/60 border border-gray-700 px-6 py-3 w-full sm:w-105 text-gray-300 hover:border-[#EC5B13] outline-none"
                    />

                    <button className="bg-[#EC5B13] hover:bg-[#d94e0f] px-8 py-3 text-sm tracking-wider">
                        SUBSCRIBE
                    </button>

                </div>

            </div>

        </section>
    );
}