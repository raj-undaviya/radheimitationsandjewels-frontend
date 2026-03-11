export default function ProductCard({ image, tag, category, name, price }) {
    return (
        <div className="group">

            {/* Image Card */}
            <div className="relative overflow-hidden border border-[#1b1b1b]">

                <img
                    src={image}
                    alt={name}
                    className="w-full h-[420px] object-cover group-hover:scale-105 transition duration-500"
                />

                {/* Tag */}
                <span className="absolute top-4 right-4 text-xs tracking-widest bg-black/70 px-3 py-1 text-gray-300">
                    {tag}
                </span>

                {/* Hover Button */}
                {/* <div className="absolute bottom-0 left-0 w-full opacity-0 group-hover:opacity-100 transition duration-300">
                    <button className="w-full bg-[#C9B582] text-black py-4 tracking-widest text-sm">
                        ADD TO BAG
                    </button>
                </div> */}
                <div className="absolute bottom-0 left-0 w-full overflow-hidden">
                    <button
                        className="w-full
      bg-[#C9B582]
      text-black
      py-4
      tracking-widest
      text-sm
      transform
      translate-y-full
      group-hover:translate-y-0
      transition-transform
      duration-500
      ease-out
    "
                    >
                        ADD TO BAG
                    </button>
                </div>
            </div>

            {/* Product Info */}
            <div className="mt-6">

                <p className="text-xs tracking-[0.3em] text-gray-400 mb-2">
                    {category}
                </p>

                <h3 className="text-xl font-serif mb-2 text-white">
                    {name}
                </h3>

                <p className="text-[#C9B582] text-lg">
                    {price}
                </p>

            </div>

        </div>
    );
}