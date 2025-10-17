// src/routes/admin.js
import { Navigate } from "react-router-dom";
import AdminLayout from "../admin/AdminLayout.jsx";
import AdminProductos from "../admin/pages/Productos.jsx";

export const adminRoutes = [
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      { index: true, element: <Navigate to="productos" replace /> },
      { path: "productos", element: <AdminProductos /> },
    ],
  },
];
