export default function TermsComponent() {
    return (
        <div className="bg-black text-white min-h-screen py-20">

            <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-0">

                {/* HEADER */}
                <div className="text-center mb-20">
                    <h1 className="text-5xl font-serif text-[#f97316] tracking-wide">
                        Terms & Conditions
                    </h1>

                    <p className="text-gray-400 text-xs tracking-widest mt-4">
                        LAST UPDATED: OCTOBER 2024
                    </p>

                    <div className="w-14 h-0.5 bg-[#f97316] mx-auto mt-4"></div>
                </div>

                <div className="grid md:grid-cols-4 gap-16">

                    {/* SIDEBAR */}
                    <div className="hidden md:block">
                        <div className="sticky top-28 text-sm text-gray-400 space-y-5">

                            <p className="text-[#f97316] font-semibold uppercase tracking-wide">
                                On this page
                            </p>

                            <ul className="space-y-3">
                                {[
                                    "01 User Agreement",
                                    "02 Intellectual Property",
                                    "03 Limitation of Liability",
                                    "04 Product Authenticity"
                                ].map((item, i) => (
                                    <li
                                        key={i}
                                        className="hover:text-white cursor-pointer transition"
                                    >
                                        {item}
                                    </li>
                                ))}
                            </ul>

                        </div>
                    </div>

                    {/* CONTENT */}
                    <div className="md:col-span-3 space-y-16">

                        {/* 01 */}
                        <div>
                            <h2 className="text-2xl font-serif text-[#f97316] mb-4 flex items-center gap-3">
                                <span className="text-sm">{'01'}</span>
                                User Agreement
                            </h2>

                            <div className="bg-[#0d0d0d] border border-[#1a1a1a] rounded-xl p-6 text-gray-300 text-sm leading-7 shadow-[0_0_30px_rgba(0,0,0,0.5)] hover:border-[#f97316]/40 transition">
                                By accessing Radhe Imitations & Jewels, you agree to these Terms.
                                This platform is intended for consultation and acquisition of curated collections.
                                <br /><br />
                                Users must be at least 18 years old. Unauthorized access may result in termination.
                            </div>
                        </div>

                        {/* 02 */}
                        <div>
                            <h2 className="text-2xl font-serif text-[#f97316] mb-4 flex items-center gap-3">
                                <span className="text-sm">{'02'}</span>
                                Intellectual Property
                            </h2>

                            <div className="bg-[#0d0d0d] border border-[#1a1a1a] rounded-xl p-6 text-gray-300 text-sm leading-7 shadow-[0_0_30px_rgba(0,0,0,0.5)] hover:border-[#f97316]/40 transition">

                                Every design and digital asset is exclusive property of Radhe Imitations & Jewels.

                                <ul className="list-disc ml-5 mt-4 space-y-2">
                                    <li>Reproduction is strictly prohibited</li>
                                    <li>All assets are copyright protected</li>
                                    <li>Brand logos are registered trademarks</li>
                                </ul>

                            </div>
                        </div>

                        {/* 03 */}
                        <div>
                            <h2 className="text-2xl font-serif text-[#f97316] mb-4 flex items-center gap-3">
                                <span className="text-sm">{'03'}</span>
                                Limitation of Liability
                            </h2>

                            <div className="bg-[#0d0d0d] border border-[#1a1a1a] rounded-xl p-6 text-gray-300 text-sm leading-7 shadow-[0_0_30px_rgba(0,0,0,0.5)] hover:border-[#f97316]/40 transition">
                                We are not liable for indirect or incidental damages arising from platform use.
                                Visual variations may occur depending on device display.
                            </div>
                        </div>

                        {/* 04 */}
                        <div>
                            <h2 className="text-2xl font-serif text-[#f97316] mb-4 flex items-center gap-3">
                                <span className="text-sm">{'04'}</span>
                                Product Authenticity
                            </h2>

                            <div className="bg-[#0d0d0d] border border-[#1a1a1a] rounded-xl p-6 text-gray-300 text-sm leading-7 shadow-[0_0_30px_rgba(0,0,0,0.5)] hover:border-[#f97316]/40 transition">
                                We ensure premium craftsmanship. Minor variations may occur due to materials.
                            </div>
                        </div>

                    </div>

                </div>

            </div>
        </div>
    );
}