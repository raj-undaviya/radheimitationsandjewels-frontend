import necklace1 from "../assets/images/necklace1.png";
import ring1 from "../assets/images/ring1.png";
import bangle1 from "../assets/images/bangle1.png";
import choker1 from "../assets/images/choker1.png";
import earring1 from "../assets/images/earring1.png";
import kada1 from "../assets/images/kada1.png";
import necklace2 from "../assets/images/necklace2.png";
import necklace3 from "../assets/images/necklace3.png";
import necklace4 from "../assets/images/necklace4.png";
import necklace5 from "../assets/images/necklace5.png";

//for relatedproduct component
import related1 from "../assets/images/related1.png";
import related2 from "../assets/images/related2.png";
import related3 from "../assets/images/related3.png";
import related4 from "../assets/images/related4.png";

export const products = [
    {
        id: 1,
        slug: "gold-kundan-necklace",
        name: "Gold Plated Kundan Necklace",
        price: 4500,
        originalPrice: 5800,
        category: "Necklaces",
        description: "Premium handcrafted necklace with traditional kundan work.",
        specs: {
            clarity: "VVS1",
            cut: "Ideal",
            weight: "32g",
        },
        images: {
            thumbnail: necklace1,
            gallery: [necklace1, necklace2, necklace3, necklace4, necklace5, necklace5],
        },
        rating: 4.5,
        stock: 10,
        isFeatured: true,
        relatedImage: related1,
    },

    {
        id: 2,
        slug: "obsidian-ring",
        name: "Obsidian Stone Ring",
        price: 1200,
        originalPrice: 1800,
        category: "Rings",
        description: "Elegant obsidian gemstone ring.",
        specs: {
            clarity: "VVS2",
            cut: "Excellent",
            weight: "10g",
        },
        images: {
            thumbnail: ring1,
            gallery: [ring1, ring1, ring1],
        },
        rating: 4.2,
        stock: 15,
        relatedImage: related2,
    },

    {
        id: 3,
        slug: "temple-bangles",
        name: "Temple Work Bangles",
        price: 3800,
        originalPrice: 4500,
        category: "Bangles",
        description: "Traditional temple design bangles.",
        specs: {
            clarity: "VVS1",
            cut: "Ideal",
            weight: "28g",
        },
        images: {
            thumbnail: bangle1,
            gallery: [bangle1, bangle1],
        },
        rating: 4.6,
        stock: 8,
        relatedImage: related3,
    },

    {
        id: 4,
        slug: "polki-choker",
        name: "Polki Choker Set",
        price: 7200,
        originalPrice: 9000,
        category: "Necklaces",
        description: "Luxury bridal polki choker.",
        specs: {
            clarity: "VVS1",
            cut: "Excellent",
            weight: "40g",
        },
        images: {
            thumbnail: choker1,
            gallery: [choker1, choker1],
        },
        rating: 4.8,
        stock: 5,
        isFeatured: true,
        relatedImage: related4,
    },

    {
        id: 5,
        slug: "gold-studs",
        name: "Handcrafted Gold Studs",
        price: 2100,
        originalPrice: 2600,
        category: "Earrings",
        description: "Minimal handcrafted gold studs.",
        specs: {
            clarity: "VVS2",
            cut: "Ideal",
            weight: "8g",
        },
        images: {
            thumbnail: earring1,
            gallery: [earring1],
        },
        rating: 4.1,
        stock: 20,
        relatedImage: related4,
    },

    {
        id: 6,
        slug: "bridal-kada",
        name: "Ethnic Bridal Kada",
        price: 5500,
        originalPrice: 7000,
        category: "Bangles",
        description: "Heavy bridal kada.",
        specs: {
            clarity: "VVS1",
            cut: "Excellent",
            weight: "35g",
        },
        images: {
            thumbnail: kada1,
            gallery: [kada1],
        },
        rating: 4.7,
        stock: 6,
        relatedImage: related4,
    }
];