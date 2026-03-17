import { Routes, Route } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";

import Home from "./pages/Home";
import Collections from "./components/Collections";
import ProductDetails from "./pages/ProductDetails"; 
import Register from "./pages/Register";
import Login from "./pages/Login";

function App() {
  return (
    <Routes>

      {/* Main Website Layout */}
      <Route element={<MainLayout />}>

        <Route path="/" element={<Home />} />

        <Route path="/collections" element={<Collections />} />

        <Route path="/collections/:collectionName" element={<Collections />} />

        <Route path="/product/:id" element={<ProductDetails />} />

      </Route>


      {/* Auth Pages Layout */}
      <Route element={<AuthLayout />}>

        <Route path="/register" element={<Register />} />

        <Route path="/login" element={<Login />} />

      </Route>

    </Routes>
  );
}

export default App;