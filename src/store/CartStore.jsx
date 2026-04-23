let cart = JSON.parse(localStorage.getItem("cart")) || [];

let listeners = [];

export const getCart = () => cart;

export const subscribeCart = (cb) => {
    listeners.push(cb);
    return () => {
        listeners = listeners.filter((l) => l !== cb);
    };
};

const notify = () => {
    localStorage.setItem("cart", JSON.stringify(cart));
    listeners.forEach((l) => l(cart));
};

// ADD
export const addToCart = (product) => {
    const existing = cart.find((item) => item.id === product.id);

    if (existing) {
        cart = cart.map((item) =>
            item.id === product.id
                ? { ...item, qty: item.qty + 1 }
                : item
        );
    } else {
        cart = [...cart, { ...product, qty: 1 }];
    }

    notify();
};

// REMOVE
export const removeFromCart = (id) => {
    cart = cart.filter((item) => item.id !== id);
    notify();
};

// INCREASE
export const increaseQty = (id) => {
    cart = cart.map((item) =>
        item.id === id ? { ...item, qty: item.qty + 1 } : item
    );
    notify();
};

// DECREASE
export const decreaseQty = (id) => {
    cart = cart
        .map((item) =>
            item.id === id ? { ...item, qty: item.qty - 1 } : item
        )
        .filter((item) => item.qty > 0);

    notify();
};