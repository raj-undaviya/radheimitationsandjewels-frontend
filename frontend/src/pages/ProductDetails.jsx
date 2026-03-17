import { useParams } from "react-router-dom";
import { products } from "../data/products";

import ProductGallery from "../components/product/ProductGallery";
import ProductInfo from "../components/product/ProductInfo";
import ArtOfCreation from "../components/product/ArtOfCreation";
import RelatedProducts from "../components/product/RelatedProducts";

export default function ProductDetails() {
    const { id } = useParams();
    const product = products.find(p => p.id === Number(id));

    if (!product) return <h1 className="text-white">Product not found</h1>;

    return (
        <div className="bg-[#0b0b0b] text-white min-h-screen px-4 sm:px-6 md:px-12 lg:px-20 py-10">

            <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">

                <ProductGallery images={product.images} />

                <ProductInfo product={product} />

            </div>

            <div className="mt-16">
                <ArtOfCreation />
            </div>

            <div className="mt-16">
                <RelatedProducts category={product.category} id={product.id} />
            </div>

        </div>
    );
}