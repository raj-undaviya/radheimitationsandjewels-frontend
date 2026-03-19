import { createContext, useContext, useEffect, useState } from "react";
import {
    getWishlist,
    toggleWishlistItem
} from "../services/wishlistService";

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {

    const [wishlist, setWishlist] = useState([]);

    // ✅ Load from service
    useEffect(() => {
        setWishlist(getWishlist());
    }, []);

    // ✅ Toggle
    const toggleWishlist = (product) => {
        const updated = toggleWishlistItem(product);

        console.log("Updated wishlist:", updated); // ✅ debug

        // 🔥 FORCE REACT UPDATE
        setWishlist([...updated]);
    };

    // ✅ Check
    const isInWishlist = (id) => {
        return wishlist.some(item => item.id === id);
    };

    return (
        <WishlistContext.Provider value={{ wishlist, toggleWishlist, isInWishlist }}>
            {children}
        </WishlistContext.Provider>
    );
};

export const useWishlist = () => useContext(WishlistContext);