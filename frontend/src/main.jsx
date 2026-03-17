import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { WishlistProvider } from "./context/WishlistContext"; // ✅ ADD THIS
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <WishlistProvider>   {/* ✅ WRAP HERE */}
      <App />
    </WishlistProvider>
  </BrowserRouter>
);