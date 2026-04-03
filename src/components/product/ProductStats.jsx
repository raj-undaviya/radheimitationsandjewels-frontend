export default function ProductStats({ product }) {
    const stats = [
        { label: "CUT GRADE", value: product.cut },
        { label: "CLARITY", value: product.clarity },
        { label: "WEIGHT", value: product.weight },
    ];

    return (
        <div className="grid grid-cols-3 gap-4 mt-6">
            {stats.map((item, i) => (
                <div key={i} className="bg-[#111] p-4 rounded-xl text-center border border-[#2a1a14]">
                    <p className="text-xs text-gray-400">{item.label}</p>
                    <p className="font-semibold">{item.value}</p>
                </div>
            ))}
        </div>
    );
}