import Navbar from "./components/Navbar.jsx";
import Home from "./pages/Home.jsx";
import Collections from "./components/Collections.jsx";
import Footer from "./components/Footer.jsx";

import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/collections" element={<Collections />} /> */}
        <Route path="/collections" element={<Collections />} />
        <Route path="/collections/:collectionName" element={<Collections />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;