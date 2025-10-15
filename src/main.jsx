import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import Home from "./pages/Home.jsx";
import Productos from "./pages/Productos.jsx";
import DetalleProducto from "./pages/DetalleProducto.jsx"; 
import Carrito from "./pages/Carrito.jsx";
import Login from "./pages/Login.jsx";
import Registro from "./pages/Registro.jsx";
import Nosotros from "./pages/Nosotros.jsx";
import Contacto from "./pages/Contacto.jsx";
import Blogs from "./pages/Blogs.jsx";
import Perfil from "./pages/Perfil.jsx";
import Admin from "./pages/Admin.jsx";
import "./assets/css/styles.css";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,          
    children: [
      { index: true, element: <Home /> },
      { path: "productos", element: <Productos /> },
      { path: "detalle-producto/:id", element: <DetalleProducto /> },
      { path: "carrito", element: <Carrito /> },  
      { path: "login", element: <Login /> },
      { path: "registro", element: <Registro /> },
      { path: "nosotros", element: <Nosotros /> },
      { path: "contacto", element: <Contacto /> },
      { path: "blogs", element: <Blogs /> },
      { path: "perfil", element: <Perfil /> },
      { path: "admin", element: <Admin /> },

      
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);