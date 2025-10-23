// src/App.jsx
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

// Público
import Layout from "./components/Layout.jsx";
import Home from "./pages/Home.jsx";
import Productos from "./pages/Productos.jsx";
import DetalleProducto from "./pages/DetalleProducto.jsx";
import Blogs from "./pages/Blogs.jsx";
import Nosotros from "./pages/Nosotros.jsx";
import Contacto from "./pages/Contacto.jsx";
import Login from "./pages/Login.jsx";
import Carrito from "./pages/Carrito.jsx";
import Fondo from "./pages/Fondo.jsx";
import Registro from "./pages/Registro.jsx";
import Checkout from "./pages/Checkout.jsx";
import PagoExitoso from "./pages/PagoExitoso.jsx";
import PagoError from "./pages/PagoError.jsx";

// Admin
import AdminLayout from "./admin/AdminLayout.jsx";
import AdminProductos from "./admin/pages/Productos.jsx";
import Ordenes from "./admin/pages/Ordenes.jsx";
import Boleta from "./admin/pages/Boleta.jsx";

// --- DEBUG: muestra la ruta actual en consola (y 1px invisible en pantalla)
function PathDebug() {
  const { pathname } = useLocation();
  console.log("[PATH]", pathname);
  return <div style={{ position:"fixed", inset:0, pointerEvents:"none", opacity:0 }}>{pathname}</div>;
}

export default function App() {
  return (
    <>
      <PathDebug />
      <Routes>
        {/* Fondo en "/" (fuera del Layout, igual que lo tenías) */}
        <Route path="/" element={<Fondo />} />
        <Route path="/Fondo" element={<Navigate to="/" replace />} />

        {/* Sitio con Layout */}
        <Route element={<Layout />}>
          <Route path="home" element={<Home />} />
          <Route path="productos" element={<Productos />} />
          <Route path="detalle-producto/:id" element={<DetalleProducto />} />
          <Route path="blogs" element={<Blogs />} />
          <Route path="nosotros" element={<Nosotros />} />
          <Route path="contacto" element={<Contacto />} />
          <Route path="login" element={<Login />} />
          <Route path="carrito" element={<Carrito />} />
          <Route path="registro" element={<Registro />} />
          <Route path="inicio" element={<Navigate to="/home" replace />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="compra/ok/:id" element={<PagoExitoso />} />
          <Route path="compra/error" element={<PagoError />} />
        </Route>

        {/* Admin */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Navigate to="productos" replace />} />
          <Route path="productos" element={<AdminProductos />} />
          <Route path="ordenes" element={<Ordenes />} />
          <Route path="boleta/:id" element={<Boleta />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}
