import { Routes, Route } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";

import Home from "./pages/Home";
import Collections from "./components/Collections";
import ProductDetails from "./pages/ProductDetails";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Wishlist from "./pages/Wishlist";
import Cart from "./pages/Cart";

import OtpPage from "./pages/OtpPage";
import StatusPage from "./pages/StatusPage";
import ForgetPassword from "./pages/ForgetPassword";


function App() {
  return (
    <Routes>

      {/* Main Website Layout */}
      <Route element={<MainLayout />}>

        <Route path="/" element={<Home />} />

        <Route path="/collections" element={<Collections />} />

        <Route path="/collections/:collectionName" element={<Collections />} />

        <Route path="/product/:id" element={<ProductDetails />} />

        <Route path="/wishlist" element={<Wishlist />} />

        <Route path="/cart" element={<Cart />} />

      </Route>


      {/* Auth Pages Layout */}
      <Route element={<AuthLayout />}>

        <Route path="/register" element={<Register />} />

        <Route path="/login" element={<Login />} />
        
        <Route path="/forgot-password" element={<ForgetPassword />} />

        <Route path="/otp" element={<OtpPage />} />

        <Route path="/status" element={<StatusPage />} />

      </Route>

    </Routes>
  );
}

export default App;