// src/App.jsx
import { Routes, Route, Navigate } from "react-router-dom";

// Público
import Layout from "./components/Layout.jsx";
import Home from "./pages/Home.jsx";
import Productos from "./pages/Productos.jsx";
import DetalleProducto from "./pages/DetalleProducto.jsx";
import Blogs from "./pages/Blogs.jsx";
import Nosotros from "./pages/Nosotros.jsx";
import Contacto from "./pages/Contacto.jsx";
import Login from "./pages/Login.jsx";
import Registro from "./pages/Registro.jsx";
import Carrito from "./pages/Carrito.jsx";

// Admin (solo productos)
import AdminLayout from "./admin/AdminLayout.jsx";
import AdminProductos from "./admin/pages/Productos.jsx";

export default function App() {
  return (
    <Routes>
      {/* Sitio público */}
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="productos" element={<Productos />} />
        <Route path="detalle-producto/:id" element={<DetalleProducto />} />
        <Route path="blogs" element={<Blogs />} />
        <Route path="nosotros" element={<Nosotros />} />
        <Route path="contacto" element={<Contacto />} />
        <Route path="login" element={<Login />} />
        <Route path="registro" element={<Registro />} />
        <Route path="carrito" element={<Carrito />} />
      </Route>

      {/* Admin: solo /admin/productos */}
      <Route path="admin" element={<AdminLayout />}>
        <Route index element={<Navigate to="productos" replace />} />
        <Route path="productos" element={<AdminProductos />} />
      </Route>

      {/* 404 */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
