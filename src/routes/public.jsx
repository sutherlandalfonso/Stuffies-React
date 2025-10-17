// src/routes/public.js
import Layout from "../components/Layout.jsx";

// Páginas públicas
import Home from "../pages/Home.jsx";
import Productos from "../pages/Productos.jsx";
import DetalleProducto from "../pages/DetalleProducto.jsx";
import Blogs from "../pages/Blogs.jsx";
import Nosotros from "../pages/Nosotros.jsx";
import Contacto from "../pages/Contacto.jsx";
import Login from "../pages/Login.jsx";
import Registro from "../pages/Registro.jsx";
import Carrito from "../pages/Carrito.jsx";

export const publicRoutes = [
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "productos", element: <Productos /> },
      { path: "detalle-producto/:id", element: <DetalleProducto /> },
      { path: "blogs", element: <Blogs /> },
      { path: "nosotros", element: <Nosotros /> },
      { path: "contacto", element: <Contacto /> },
      { path: "login", element: <Login /> },
      { path: "registro", element: <Registro /> },
      { path: "carrito", element: <Carrito /> },
    ],
  },
];
