import { Link } from "react-router-dom";
import { FiFilter } from "react-icons/fi";
import { BsGrid3X3Gap } from "react-icons/bs";
import { HiOutlineBars3 } from "react-icons/hi2";

export default function CollectionsHeader() {
    return (
        <div className="bg-black text-white px-6 md:px-12 lg:px-20 pt-16 pb-10">

            {/* Breadcrumb */}
            <div className="text-xs tracking-[0.3em] text-gray-400 mb-8">
                <Link to="/" className="hover:text-white">HOME</Link>
                <span className="mx-3 text-gray-600">›</span>
                <span className="text-[#C9B582]">COLLECTIONS</span>
            </div>

            {/* Title + Controls */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">

                {/* Left Content */}
                <div className="max-w-2xl">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif mb-6">
                        All Collections
                    </h1>

                    <p className="text-gray-400 text-sm md:text-base leading-relaxed">
                        Explore our complete range of masterfully crafted jewelry, from
                        timeless engagement rings to contemporary statement pieces.
                    </p>
                </div>

                {/* Right Controls */}
                <div className="flex items-center gap-4">

                    {/* Filter */}
                    <button className="flex items-center gap-3 border border-gray-700 px-6 py-3 text-sm tracking-widest hover:border-white transition">
                        <FiFilter />
                        FILTER
                    </button>

                    {/* Grid */}
                    <button className="p-3 bg-[#C9B582] text-black">
                        <BsGrid3X3Gap />
                    </button>

                    {/* List */}
                    <button className="p-3 border border-gray-700">
                        <HiOutlineBars3 />
                    </button>

                </div>

            </div>

        </div>
    );
}