// src/routes/public.jsx
import { Navigate } from "react-router-dom";

import Layout from "../components/Layout.jsx";
import Fondo from "../pages/Fondo.jsx";
import Home from "../pages/Home.jsx";
import Productos from "../pages/Productos.jsx";
import DetalleProducto from "../pages/DetalleProducto.jsx";
import Blogs from "../pages/Blogs.jsx";
import Nosotros from "../pages/Nosotros.jsx";
import Contacto from "../pages/Contacto.jsx";
import Login from "../pages/Login.jsx";
import Carrito from "../pages/Carrito.jsx";

export const publicRoutes = [
  // 🔹 Landing / Salvapantallas como raíz (sin Layout)
  { path: "/", element: <Fondo /> },
  { path: "/Fondo", element: <Navigate to="/" replace /> },

  // 🔹 Sitio público bajo Layout (OJO: sin "index" aquí)
  {
    element: <Layout />,
    children: [
      { path: "home", element: <Home /> },
      { path: "productos", element: <Productos /> },
      { path: "detalle-producto/:id", element: <DetalleProducto /> },
      { path: "blogs", element: <Blogs /> },
      { path: "nosotros", element: <Nosotros /> },
      { path: "contacto", element: <Contacto /> },
      { path: "login", element: <Login /> },
      { path: "carrito", element: <Carrito /> },
      { path: "inicio", element: <Navigate to="/home" replace /> },
    ],
  },
];
