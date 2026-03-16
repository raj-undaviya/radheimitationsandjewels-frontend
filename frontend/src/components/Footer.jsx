import { FaGlobe, FaCommentDots, FaFacebookF } from "react-icons/fa";
import logo from "../assets/Logo.png";

export default function Footer() {
    return (
        <footer className="bg-[#0b0503] text-gray-300 px-6 md:px-12 py-12">

            <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-10 border-b border-gray-700 pb-10">

                {/* Brand */}
                {/* <div className="col-span-2 md:col-span-1 text-center md:text-left">
                    <div className="flex items-center gap-3 mb-4">
                        <img
                            src={logo}
                            alt="Radhe Imitations & Jewels"
                            className="h-12 w-auto object-contain"
                        />
                        <h2 className="text-white text-xl font-semibold tracking-widest font-serif">
                            RADHE IMITATIONS & JEWELS
                        </h2>
                    </div>

                    <p className="text-sm text-gray-400 max-w-sm">
                        India's most loved jewelry brand, crafting dreams into reality since
                        1994.
                    </p>
                </div> */}

                <div className="col-span-2 md:col-span-1 flex flex-col items-center text-center">

                    <img
                        src={logo}
                        alt="Radhe Imitations & Jewels"
                        className="h-25 w-auto object-contain mb-4 hover:scale-105 transition duration-300"
                    />

                    <p className="text-sm text-gray-400 max-w-sm">
                        India's most loved jewelry brand, crafting dreams into reality since 1994.
                    </p>

                </div>

                {/* Company */}
                <div>
                    <h3 className="text-sm font-semibold text-white mb-4 tracking-widest">
                        COMPANY
                    </h3>

                    <ul className="space-y-2 text-sm">
                        <li>About Us</li>
                        <li>Careers</li>
                        <li>Investor Relations</li>
                    </ul>
                </div>

                {/* Support */}
                <div>
                    <h3 className="text-sm font-semibold text-white mb-4 tracking-widest">
                        SUPPORT
                    </h3>

                    <ul className="space-y-2 text-sm">
                        <li>Diamond Guide</li>
                        <li>Gold Rate</li>
                        <li>Find a Store</li>
                    </ul>
                </div>

                {/* Social */}
                <div className="col-span-2 md:col-span-1 text-center md:text-left">
                    <h3 className="text-sm font-semibold text-white mb-4 tracking-widest">
                        SOCIAL
                    </h3>

                    <div className="flex justify-center md:justify-start gap-6 text-lg">
                        <FaGlobe className="hover:text-[#EC5B13] hover:scale-105 transition duration-300 cursor-pointer" />
                        <FaCommentDots className="hover:text-[#EC5B13] hover:scale-105 transition duration-300 cursor-pointer" />
                        <FaFacebookF className="hover:text-[#EC5B13] hover:scale-105 transition duration-300 cursor-pointer" />
                    </div>
                </div>

            </div>

            {/* Bottom */}
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-center items-center pt-6  text-gray-500 gap-3">

                <p className="text-[10px] md:text-xs">© 2024 TITAN COMPANY LIMITED. ALL RIGHTS RESERVED.</p>

                <div className="flex gap-6 text-xs">
                    <span>PRIVACY POLICY</span>
                    <span>TERMS OF USE</span>
                </div>

            </div>

        </footer>
    );
}