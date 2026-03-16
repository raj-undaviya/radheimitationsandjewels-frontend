import CollectionItem from "./CollectionItem";

import rivaah from "../assets/rivaah.png";
import mia from "../assets/mia.png";
import aveer from "../assets/aveer.png";

export default function CollectionsSection() {

    const collections = [
        {
            title: "Rivaah",
            subtitle: "THE BRIDAL SOUL",
            desc: "Handcrafted for the modern bride who cherishes her roots.Rivaah brings together the diverse wedding traditions ofIndia with exquisite gold and diamond sets designed for youronce-in -a - lifetime moments.",
            img: rivaah,
            reverse: false,
        },
        {
            title: "Mia",
            subtitle: "MODERN ELEGANCE",
            desc: "Designed for the woman of today. Mia offers versatile chic jewelry.",
            img: mia,
            reverse: true,
        },
        {
            title: "Aveeer",
            subtitle: "TIMELESS HERITAGE",
            desc: "A tribute to the royal grandeur with traditional motifs.",
            img: aveer,
            reverse: false,
        },
    ];

    return (
        <section className="bg-[#0a0301] md:py-32">

            <div className="max-w-7xl mx-auto px-6 space-y-20 md:space-y-36">

                {collections.map((item, index) => (
                    <CollectionItem key={index} {...item} />
                ))}

            </div>

        </section>
    );
}