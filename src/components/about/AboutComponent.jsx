import aboutus1 from "../../assets/images/aboutus1.png";
import ourstory from "../../assets/images/ourstory.png";
import craft1 from "../../assets/images/craft1.png";
import craft2 from "../../assets/images/craft2.png";
import mastergem2 from "../../assets/images/mastergem2.png";

import { FaGem } from "react-icons/fa";
import { MdVerified } from "react-icons/md";

export default function AboutComponent() {
    return (
        <div className="bg-black text-white font-serif">

            {/* HERO */}
            <section className="relative h-[90vh] flex items-center justify-center text-center text-white overflow-hidden">

                {/* BACKGROUND IMAGE */}
                <img
                    src={aboutus1}
                    alt="about us"
                    className="absolute inset-0 w-full h-full object-cover"
                />

                {/* DARK OVERLAY */}
                <div className="absolute inset-0 bg-black/70"></div>

                {/* BLUR LAYER (IMPORTANT) */}
                <div className="absolute inset-0 backdrop-blur-xs"></div>

                {/* CONTENT */}
                <div className="relative z-10 max-w-3xl px-6">

                    <p className="text-xs tracking-widest text-orange-400 mb-3">
                        Est. 2026
                    </p>

                    <h1 className="text-4xl md:text-6xl font-serif leading-tight">
                        The Legacy of Brilliance
                    </h1>

                    <p className="text-gray-300 mt-4 text-sm md:text-base">
                        For four decades, we have defined the intersection of timeless heritage
                        and digital-era precision, crafting artifacts that whisper stories of royalty.
                    </p>

                    {/* SCROLL INDICATOR */}
                    <div className="mt-10 flex flex-col items-center text-xs text-orange-400">
                        <span>Scroll to Explore</span>

                        <div className="w-px h-10 bg-orange-400 mt-2"></div>
                    </div>

                </div>

            </section>

            {/* STORY */}
            <section className="bg-black text-white px-6 md:px-20 py-20">

                <div className="grid md:grid-cols-2 gap-12 items-center">

                    {/* LEFT IMAGE */}
                    <div className="relative">
                        <div className="border border-[#1a1a1a] p-3">
                            <img
                                src={ourstory}
                                alt="story"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>

                    {/* RIGHT CONTENT */}
                    <div>

                        <h2 className="text-3xl md:text-4xl font-serif text-[#f97316] mb-4">
                            Our Story
                        </h2>

                        {/* ORANGE LINE */}
                        <div className="w-10 h-[2px] bg-[#f97316] mb-6"></div>

                        <p className="text-gray-400 text-sm leading-7 mb-5">
                            Born in the heart of artisanal traditions, Radhe Imitations & Jewels
                            began with a singular vision: to make the opulence of the royal vaults
                            accessible to the modern connoisseur.
                        </p>

                        <p className="text-gray-400 text-sm leading-7 mb-8">
                            What started as a small atelier of master craftsmen has evolved into
                            a globally recognized hallmark of imitation jewelry that rivals the
                            finest natural gemstones in clarity, weight, and soul.
                        </p>

                    </div>

                </div>
            </section>

            {/* CRAFT */}
            <section className="bg-[#0a0a0a] text-white px-6 md:px-20 ">

                {/* HEADER */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-serif">Craftsmanship</h2>
                    <p className="text-xs text-orange-400 tracking-widest mt-2">
                        Precision in Every Facet
                    </p>
                </div>

                {/* TOP GRID */}
                <div className="grid md:grid-cols-2 gap-6">

                    {/* LEFT BIG IMAGE */}
                    <div className="relative border border-[#1a1a1a] h-[320px] md:h-[360px] overflow-hidden group">
                        <img
                            src={craft1}
                            alt=""
                            className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                        />

                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>

                        <div className="absolute bottom-6 left-6">
                            <h3 className="text-2xl text-orange-400 font-serif">
                                Conceptual Artistry
                            </h3>
                            <p className="text-gray-300 text-sm mt-2 max-w-sm">
                                Every piece begins as a hand-drawn blueprint, merging classical motifs.
                            </p>
                        </div>
                    </div>

                    {/* RIGHT CARD */}
                    <div className="group border border-[#1a1a1a] p-8 bg-black hover:border-orange-400/40 transition flex flex-col justify-center">

                        {/* ICON */}
                        <div className="w-14 h-14 flex items-center justify-center rounded-full bg-orange-400/10 mb-5 transition group-hover:bg-orange-400/20">
                            <FaGem className="text-orange-400 text-2xl icon-glow" />
                        </div>

                        <h3 className="text-xl font-serif mb-3">The Polish</h3>

                        <p className="text-gray-400 text-sm leading-6">
                            Our signature multi-stage polishing ensures a mirror-like finish that captures light.
                        </p>
                    </div>

                </div>

                {/* SECOND ROW */}
                <div className="grid md:grid-cols-3 gap-6 mt-6">

                    {/* LEFT CARD */}
                    <div className="group border border-[#1a1a1a] p-8 bg-black hover:border-orange-400/40 transition flex flex-col justify-center">

                        {/* ICON */}
                        <div className="w-14 h-14 flex items-center justify-center rounded-full bg-orange-400/10 mb-5 transition group-hover:bg-orange-400/20">
                            <MdVerified className="text-orange-400 text-2xl icon-glow" />
                        </div>

                        <h3 className="text-xl font-serif mb-3">Vault Security</h3>

                        <p className="text-gray-400 text-sm leading-6">
                            Every creation is assigned a unique serial number and stored securely.
                        </p>
                    </div>

                    {/* RIGHT BIG IMAGE */}
                    <div className="relative md:col-span-2 border border-[#1a1a1a] h-[320px] md:h-[360px] overflow-hidden group">
                        <img
                            src={craft2}
                            alt=""
                            className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                        />

                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>

                        <div className="absolute bottom-6 left-6">
                            <h3 className="text-2xl text-orange-400 font-serif">
                                Metallurgical Excellence
                            </h3>
                            <p className="text-gray-300 text-sm mt-2 max-w-sm">
                                Using advanced alloy techniques, we achieve perfect balance and durability.
                            </p>
                        </div>
                    </div>

                </div>

            </section>

            {/* GEM */}
            <section className="bg-black text-white px-6 md:px-20 py-20 overflow-hidden">

                <div className="grid md:grid-cols-2 gap-16 items-center">

                    {/* LEFT TEXT */}
                    <div>
                        <h2 className="text-4xl md:text-5xl font-serif mb-10">
                            Master Gem-Setting
                        </h2>

                        <div className="space-y-8 text-gray-400 text-sm">

                            <div>
                                <span className="text-orange-400 mr-3">01</span>
                                <span className="text-orange-400">Micro-Pavé Technique</span>
                                <p className="mt-2 ml-8">
                                    Individual stones are set under high-power magnification.
                                </p>
                            </div>

                            <div>
                                <span className="text-orange-400 mr-3">02</span>
                                <span className="text-orange-400">Invisible Setting</span>
                                <p className="mt-2 ml-8">
                                    Settings vanish from sight, allowing gems to float.
                                </p>
                            </div>

                            <div>
                                <span className="text-orange-400 mr-3">03</span>
                                <span className="text-orange-400">Tension Balance</span>
                                <p className="mt-2 ml-8">
                                    Structural equilibrium ensures durability and elegance.
                                </p>
                            </div>

                        </div>
                    </div>

                    {/* RIGHT VISUAL */}
                    <div className="relative flex justify-center items-center">

                        {/* ROTATING DIAMOND BACKGROUND */}
                        <div className="diamond-bg"></div>

                        {/* GLOW LAYER */}
                        <div className="glow-ring"></div>

                        {/* MAIN IMAGE */}
                        <div className="cut-shape relative z-10 overflow-hidden">
                            <img
                                src={mastergem2}
                                alt=""
                                className="w-full h-full object-cover hover:scale-110 transition duration-700"
                            />
                        </div>

                    </div>

                </div>

            </section>

            {/* STATS */}
            <section className="bg-black px-6 md:px-20 py-24">

                <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">

                    {/* ITEM */}
                    <div className="group">
                        <h3 className="
        text-4xl md:text-6xl 
        font-semibold 
        text-orange-400 
        drop-shadow-[0_0_10px_rgba(249,115,22,0.5)]
        group-hover:scale-110
        transition duration-300
      ">
                            40+
                        </h3>

                        <p className="text-gray-500 text-xs tracking-widest mt-3 uppercase">
                            Years Experience
                        </p>
                    </div>

                    {/* ITEM */}
                    <div className="group">
                        <h3 className="
        text-4xl md:text-6xl 
        font-semibold 
        text-orange-400 
        drop-shadow-[0_0_10px_rgba(249,115,22,0.5)]
        group-hover:scale-110
        transition duration-300
      ">
                            12K
                        </h3>

                        <p className="text-gray-500 text-xs tracking-widest mt-3 uppercase">
                            Masterpieces Crafted
                        </p>
                    </div>

                    {/* ITEM */}
                    <div className="group">
                        <h3 className="
        text-4xl md:text-6xl 
        font-semibold 
        text-orange-400 
        drop-shadow-[0_0_10px_rgba(249,115,22,0.5)]
        group-hover:scale-110
        transition duration-300
      ">
                            15
                        </h3>

                        <p className="text-gray-500 text-xs tracking-widest mt-3 uppercase">
                            Global Boutiques
                        </p>
                    </div>

                    {/* ITEM */}
                    <div className="group">
                        <h3 className="
        text-4xl md:text-6xl 
        font-semibold 
        text-orange-400 
        drop-shadow-[0_0_10px_rgba(249,115,22,0.5)]
        group-hover:scale-110
        transition duration-300
      ">
                            100%
                        </h3>

                        <p className="text-gray-500 text-xs tracking-widest mt-3 uppercase">
                            Artisanal Sourcing
                        </p>
                    </div>

                </div>

            </section>

        </div>
    );
}