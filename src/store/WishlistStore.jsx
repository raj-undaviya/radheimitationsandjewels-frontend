let listeners = [];

let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

export const getWishlist = () => wishlist;

export const subscribe = (listener) => {
    listeners.push(listener);
    return () => {
        listeners = listeners.filter((l) => l !== listener);
    };
};

export const updateWishlist = (newWishlist) => {
    wishlist = newWishlist;
    localStorage.setItem("wishlist", JSON.stringify(newWishlist));

    listeners.forEach((l) => l(wishlist)); // 🔥 notify all
};