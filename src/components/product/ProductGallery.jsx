import { useState, useEffect, useRef } from "react";

export default function ProductGallery({ images }) {

    // ✅ Support both structures
    const galleryImages = Array.isArray(images)
        ? images
        : images?.gallery || [];

    const [index, setIndex] = useState(0);
    const [zoomStyle, setZoomStyle] = useState({});
    const startX = useRef(0);

    // Reset index when images change
    useEffect(() => {
        setIndex(0);
    }, [galleryImages]);

    // Auto slide
    useEffect(() => {
        if (!galleryImages.length) return;

        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % galleryImages.length);
        }, 4000);

        return () => clearInterval(interval);
    }, [galleryImages]);

    // Zoom (desktop only)
    const handleMouseMove = (e) => {
        if (window.innerWidth < 768) return;

        const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
        const x = ((e.clientX - left) / width) * 100;
        const y = ((e.clientY - top) / height) * 100;

        setZoomStyle({
            transformOrigin: `${x}% ${y}%`,
            transform: "scale(1.5)",
        });
    };

    const resetZoom = () => {
        setZoomStyle({ transform: "scale(1)" });
    };

    // Swipe support
    const handleTouchStart = (e) => {
        startX.current = e.touches[0].clientX;
    };

    const handleTouchEnd = (e) => {
        const endX = e.changedTouches[0].clientX;

        if (startX.current - endX > 50) {
            setIndex((prev) => (prev + 1) % galleryImages.length);
        } else if (endX - startX.current > 50) {
            setIndex((prev) =>
                prev === 0 ? galleryImages.length - 1 : prev - 1
            );
        }
    };

    if (!galleryImages.length) {
        return <p className="text-gray-400">No images available</p>;
    }

    return (
        <div className="w-full max-w-xl mx-auto overflow-hidden">

            {/* 🔥 MAIN IMAGE */}
            <div
                className="w-full max-w-fullaspect-square bg-[#111] rounded-xl overflow-hidden shadow-xl flex items-center justify-center"
                onMouseMove={handleMouseMove}
                onMouseLeave={resetZoom}
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
            >
                <img
                    src={galleryImages[index]}
                    alt="product"
                    className="w-full h-full object-cover rounded-xl transition duration-300"
                    style={window.innerWidth >= 768 ? zoomStyle : {}}
                />
            </div>

            {/* 🔹 DOTS */}
            <div className="flex justify-center gap-2 mt-3">
                {galleryImages.map((_, i) => (
                    <div
                        key={i}
                        className={`w-2 h-2 rounded-full ${index === i ? "bg-orange-500 scale-110" : "bg-gray-600"
                            }`}
                    />
                ))}
            </div>

            {/* 🔥 THUMBNAILS (SCROLL FIXED) */}
            <div className="flex gap-3 mt-4 overflow-x-auto max-w-full px-1 scrollbar-hide">
                {galleryImages.map((img, i) => (
                    <div
                        key={i}
                        onClick={() => setIndex(i)}
                        className={`
                min-w-16 h-16
                sm:min-w-20 sm:h-20
                md:min-w-24 md:h-24
                rounded-sm cursor-pointer shrink-0 transition-all duration-200
                border-2
                ${index === i
                                ? "border-orange-500"
                                : "border-transparent hover:border-orange-400"
                            }
            `}
                    >
                        <img
                            src={img}
                            alt="thumb"
                            className="w-full h-full object-cover rounded-sm"
                        />
                    </div>
                ))}
            </div>

        </div>
    );
}