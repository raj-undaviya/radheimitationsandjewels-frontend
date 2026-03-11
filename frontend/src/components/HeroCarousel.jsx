import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { Link } from "react-router-dom";

import "swiper/css";
import "swiper/css/pagination";

const slides = [
    {
        img: "/images/jewel1.png",
        subtitle: "THE HERITAGE COLLECTION",
        title1: "Elegance in Every",
        title2: "Detail",
        desc: "Discover our curated selection of fine jewelry, where timeless craftsmanship meets modern sophistication.",
    },
    {
        img: "/images/jewel2.png",
        subtitle: "TIMELESS BEAUTY",
        title1: "Luxury Crafted",
        title2: "For You",
        desc: "Experience elegance with our premium handcrafted jewellery collections.",
    },
    {
        img: "/images/jewel3.jpg",
        subtitle: "SIGNATURE COLLECTION",
        title1: "Pure Gold",
        title2: "Perfection",
        desc: "A perfect blend of heritage design and modern craftsmanship.",
    },
];

export default function HeroCarousel() {
    return (
        // <div className="w-full h-screen">
        <div className="w-full h-[calc(100vh-90px)]">
            <Swiper
                modules={[Autoplay, Pagination]}
                autoplay={{ delay: 5000 }}
                // pagination={{ clickable: true }}
                loop={true}
                className="h-full"
            >
                {slides.map((slide, i) => (
                    <SwiperSlide key={i}>

                        <div
                            className="h-screen bg-cover bg-center flex items-center justify-center text-center relative"
                            style={{ backgroundImage: `url(${slide.img})` }}
                        >

                            {/* Dark overlay */}
                            <div className="absolute inset-0 bg-black/50"></div>

                            {/* Content */}
                            <div className="relative z-10 max-w-4xl px-6">

                                <p className="text-[#C9B582] tracking-[0.3em] text-xs md:text-sm mb-4">
                                    {slide.subtitle}
                                </p>

                                <h1 className="text-white text-4xl md:text-6xl lg:text-7xl font-serif">
                                    {slide.title1}
                                </h1>

                                <h2 className="text-[#C9B582] italic text-4xl md:text-6xl lg:text-7xl mt-2">
                                    {slide.title2}
                                </h2>

                                <p className="text-[#9B9BA4] mt-6 text-sm md:text-lg max-w-xl mx-auto tracking-widset">
                                    {slide.desc}
                                </p>

                                {/* <button className="mt-10 px-8 py-4 bg-[#C9B582] text-black tracking-widest hover:bg-[#d8c89e] transition">
                                    EXPLORE COLLECTION
                                </button> */}
                                <Link
                                    to="/collections"
                                    className="mt-10 inline-block px-8 py-4 bg-[#C9B582] text-black tracking-widest hover:bg-[#d8c89e] transition"
                                >
                                    EXPLORE COLLECTION
                                </Link>

                            </div>

                        </div>

                    </SwiperSlide>
                ))}
            </Swiper>

        </div>
    );
}