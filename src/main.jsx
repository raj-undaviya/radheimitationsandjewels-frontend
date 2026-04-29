import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>

    <App />

    {/* 🔥 CUSTOM TOAST */}
    <ToastContainer
      position="top-right"
      autoClose={2500}
      hideProgressBar
      closeOnClick
      pauseOnHover
      draggable
      theme="dark"
      toastClassName="custom-toast"
      bodyClassName="custom-toast-body"
    />

  </BrowserRouter>
);