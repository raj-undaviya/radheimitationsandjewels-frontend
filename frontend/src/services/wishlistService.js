const STORAGE_KEY = "wishlist";

// ✅ GET
export const getWishlist = () => {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
};

// ✅ SAVE
const saveWishlist = (wishlist) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(wishlist));
};

// ✅ ADD
export const addToWishlist = (product) => {
    const wishlist = getWishlist();
    const exists = wishlist.find(item => item.id === product.id);

    if (!exists) {
        const updated = [...wishlist, product];
        saveWishlist(updated);
        return updated;
    }

    return wishlist;
};

// ✅ REMOVE
export const removeFromWishlist = (id) => {
    const wishlist = getWishlist();
    const updated = wishlist.filter(item => item.id !== id);
    saveWishlist(updated);
    return updated;
};

// ✅ TOGGLE
export const toggleWishlistItem = (product) => {
    const wishlist = getWishlist();
    const exists = wishlist.find(item => item.id === product.id);

    if (exists) {
        return removeFromWishlist(product.id);
    } else {
        return addToWishlist(product);
    }
};