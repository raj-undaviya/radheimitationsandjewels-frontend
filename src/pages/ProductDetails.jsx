import { useParams } from "react-router-dom";
// import { products } from "../data/products";

import { useEffect, useState } from "react";
import API from "../api/axiosInstance";
import { ProductGalleryAPI } from "../api/api";

import ProductGallery from "../components/product/ProductGallery";
import ProductInfo from "../components/product/ProductInfo";
import ArtOfCreation from "../components/product/ArtOfCreation";
import RelatedProducts from "../components/product/RelatedProducts";
import Breadcrumb from "../components/Breadcrumb";

export default function ProductDetails() {

    const { id } = useParams();

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setLoading(true);   // start loading
                setError(null);     // reset error

                const res = await API.get(ProductGalleryAPI(id));

                setProduct(res.data.data);

            } catch (err) {
                console.log(err);

                setError("Failed to load product"); // save error

            } finally {
                setLoading(false); // ALWAYS runs
            }
        };

        fetchProduct();
    }, [id]);
   

    if (loading) {
        return <h1 className="text-white">Loading...</h1>;
    }

    if (error) {
        return <h1 className="text-red-500">{error}</h1>;
    }

    if (!product) {
        return <h1 className="text-white">Product not found</h1>;
    }

    return (
        <div className="bg-[#0b0b0b] text-white min-h-screen px-4 sm:px-6 md:px-12 lg:px-20 py-10">

            {/* MOBILE */}
            <div className="block lg:hidden mb-6">
                <Breadcrumb customLast={product.name} />
            </div>

            <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">

                {/* LEFT */}
                <ProductGallery images={product.images} />

                {/* RIGHT */}
                <div>

                    <div className="hidden lg:block mb-6">
                        <Breadcrumb customLast={product.name} />
                    </div>

                    {/* PASS FUNCTIONS (OPTIONAL) */}
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