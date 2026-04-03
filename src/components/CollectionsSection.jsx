import CollectionItem from "./CollectionItem";
import { useEffect, useState } from "react";
import API from "../api/axiosInstance";
import { CollectionAPI } from "../api/api";

export default function CollectionsSection() {

    const [collections, setCollections] = useState([]);

    //image FUNCTION 
    // const getImageUrl = (url) => {
    //     if (!url) return "";

    //     if (url.includes("drive.google.com")) {
    //         const fileId = url.split("/d/")[1]?.split("/")[0];

    //         return `https://drive.google.com/thumbnail?id=${fileId}`;
    //     }

    //     return url;
    // };

    useEffect(() => {
        const fetchCollections = async () => {
            try {
                const res = await API.get(CollectionAPI());

                setCollections(res.data.data);

            } catch (err) {
                console.log("ERROR:", err);
            }
        };

        fetchCollections();
    }, []);

    return (
        <section className="bg-[#0a0301] md:py-32 overflow-x-hidden">

            <div className="max-w-7xl mx-auto px-6 space-y-20 md:space-y-36">

                {collections.slice(0, 3).map((item, index) => {
                    // const imageUrl = getImageUrl(item.category_image);
                    // console.log('image url', imageUrl);


                    return (
                        <CollectionItem
                            Items = {item}
                            key={item.id}
                            // title={item.name}
                            subtitle="COLLECTION"
                            // desc={item.description}
                            // img={item.category_image}
                            reverse={index % 2 !== 0}
                        />
                    );
                })}

            </div>

        </section>
    );
}