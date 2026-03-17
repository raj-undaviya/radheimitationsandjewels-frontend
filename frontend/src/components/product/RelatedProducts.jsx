import { products } from "../../data/products";
import { useNavigate } from "react-router-dom";

export default function RelatedProducts({ category, id }) {

    const navigate = useNavigate();

    const related = products.filter(
        p => p.category === category && p.id !== id
    );

    return (
        <section className="mt-24">

            <h2 className="text-2xl mb-8">
                Complete the Aura Ensemble
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

                {related.map(product => (

                    <div
                        key={product.id}
                        onClick={() => navigate(`/product/${product.id}`)}
                        className="bg-[#24130c] p-4 rounded-lg cursor-pointer hover:scale-105 transition"
                    >

                        <img
                            src={product.images[0]}
                            className="rounded-md"
                        />

                        <h3 className="mt-3 text-sm">
                            {product.name}
                        </h3>

                        <p className="text-orange-400">
                            {product.price}
                        </p>

                    </div>

                ))}

            </div>

        </section>
    );
}