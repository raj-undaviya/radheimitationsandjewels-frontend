import heroImg from "../assets/necklace.png";
import CollectionsSection from "../components/CollectionsSection.jsx";
import SubscribeSection from "../components/SubscribeSection.jsx";
import JewelleryInquiry from "../components/JewelleryInquiry.jsx";
import { Link } from "react-router-dom";

export default function Home() {
    return (
        <>
            {/* HERO */}
            <section
                className="relative w-full min-h-screen text-white bg-black flex items-center"
                style={{
                    backgroundImage: `url(${heroImg})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center top",
                    backgroundRepeat: "no-repeat",
                }}
            >

                {/* Dark overlay */}
                <div className="absolute inset-0 bg-black/60 pointer-events-none"></div>

                {/* CENTER CONTAINER */}
                <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-20">

                    <p className="text-[#EC5B13] tracking-[3px] text-xs sm:text-sm mb-4">
                        THE GRAND OPUS
                    </p>

                    <h1
                        className="font-serif leading-tight mb-6 text-4xl sm:text-5xl md:text-6xl animate-fadeUp"
                        style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                        Masterpieces of <br />
                        Indian Craftsmanship
                    </h1>

                    <p className="text-gray-300 text-sm sm:text-base mb-8 max-w-md">
                        Discover a world where every jewel tells a timeless story of
                        heritage, love, and unmatched artistry.
                    </p>

                    <div className="flex flex-col sm:flex-row">
                        <Link
                            to="/collections"
                            className="bg-[#EC5B13] hover:bg-orange-600 px-6 py-3 text-sm font-medium inline-block text-center"
                        >
                            VIEW ALL COLLECTIONS
                        </Link>
                        
                    </div>

                </div>

            </section>
            {/* COLLECTIONS COMPONNET */}
            <CollectionsSection />

            {/* JEWELLERYInquiry COMPONNET */}
            <JewelleryInquiry />

            {/* SUBSCRIBE COMPONETS */}
            <SubscribeSection />
        </>
    );
}