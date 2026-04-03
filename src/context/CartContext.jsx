import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {

    const [cartItems, setCartItems] = useState([]);

    // ADD TO CART
    const addToCart = (product) => {
        setCartItems((prev) => {
            const existing = prev.find(item => item.id === product.id);

            if (existing) {
                return prev.map(item =>
                    item.id === product.id
                        ? { ...item, qty: item.qty + 1 }
                        : item
                );
            }

            return [...prev, { ...product, qty: 1 }];
        });
    };

    // REMOVE
    const removeFromCart = (id) => {
        setCartItems(prev => prev.filter(item => item.id !== id));
    };

    // INCREASE
    const increaseQty = (id) => {
        setCartItems(prev =>
            prev.map(item =>
                item.id === id ? { ...item, qty: item.qty + 1 } : item
            )
        );
    };

    // DECREASE
    const decreaseQty = (id) => {
        setCartItems(prev =>
            prev.map(item =>
                item.id === id && item.qty > 1
                    ? { ...item, qty: item.qty - 1 }
                    : item
            )
        );
    };

    return (
        <CartContext.Provider value={{
            cartItems,
            addToCart,
            removeFromCart,
            increaseQty,
            decreaseQty
        }}>
            {children}
        </CartContext.Provider>
    );
};