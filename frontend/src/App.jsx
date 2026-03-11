import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Login from "./pages/LoginPage.jsx";
import Collections from "./pages/Collections.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/collections" element={<Collections />} />
    </Routes>
  );
}

export default App;