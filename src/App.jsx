import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import Home from "./pages/Home.jsx";
import Productos from "./pages/Productos.jsx";
import Blogs from "./pages/Blogs.jsx";
import Nosotros from "./pages/Nosotros.jsx";
import Contacto from "./pages/Contacto.jsx";
import DetalleProducto from "./pages/DetalleProducto.jsx";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/productos" element={<Productos />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/nosotros" element={<Nosotros />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/detalle/:id" element={<DetalleProducto />} /> {/* ✅ */}
      </Route>
    </Routes>
  );
}
