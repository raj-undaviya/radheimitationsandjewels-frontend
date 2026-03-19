import { useParams } from "react-router-dom";
import { products } from "../data/products";

import ProductGallery from "../components/product/ProductGallery";
import ProductInfo from "../components/product/ProductInfo";
import ArtOfCreation from "../components/product/ArtOfCreation";
import RelatedProducts from "../components/product/RelatedProducts";
import Breadcrumb from "../components/Breadcrumb";
import { useWishlist } from "../context/WishlistContext";
import { FiHeart } from "react-icons/fi";

export default function ProductDetails() {
    const { id } = useParams();
    const product = products.find(p => p.id === Number(id));
    const { toggleWishlist, isInWishlist } = useWishlist();

    if (!product) return <h1 className="text-white">Product not found</h1>;

    return (
        <div className="bg-[#0b0b0b] text-white min-h-screen px-4 sm:px-6 md:px-12 lg:px-20 py-10">

            {/* ✅ MOBILE + TABLET → TOP */}
            <div className="block lg:hidden mb-6">
                <Breadcrumb customLast={product.name} />
            </div>

            <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">

                {/* LEFT SIDE */}
                <ProductGallery images={product.images} />

                {/* RIGHT SIDE */}
                <div >

                    {/* ✅ DESKTOP → INSIDE RIGHT */}
                    <div className="hidden lg:block mb-6">
                        <Breadcrumb customLast={product.name} />
                    </div>

                    <ProductInfo product={product} />

                </div>

            </div>

            <div className="mt-16">
                <ArtOfCreation />
            </div>

            <div className="mt-16">
                <RelatedProducts product={product} />
            </div>

        </div>
    );
}