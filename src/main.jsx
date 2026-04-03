import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { WishlistProvider } from "./context/WishlistContext";
import { CartProvider } from "./context/CartContext";
import { UserProvider } from "./context/UserContext";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <WishlistProvider>
      <CartProvider>
        <UserProvider>
          <App />
        </UserProvider>
      </CartProvider>
    </WishlistProvider>
  </BrowserRouter>
);