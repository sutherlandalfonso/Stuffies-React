// src/admin/components/Sidebar.jsx
import { NavLink } from "react-router-dom";

export default function Sidebar() {
  const linkClass = ({ isActive }) =>
    "list-group-item list-group-item-action bg-dark text-light border-secondary" +
    (isActive ? " active" : "");

  return (
    <aside className="admin-sidebar">
      <div className="list-group">
        <NavLink to="/admin" end className={linkClass}>Dashboard</NavLink>
        <NavLink to="/admin/productos" className={linkClass}>Productos</NavLink>
        <NavLink to="/admin/ordenes" className={linkClass}>Órdenes</NavLink>
        {/* Agrega cuando quieras:
          <NavLink to="/admin/categorias" className={linkClass}>Categorías</NavLink>
          <NavLink to="/admin/usuarios" className={linkClass}>Usuarios</NavLink>
          <NavLink to="/admin/reportes" className={linkClass}>Reportes</NavLink>
        */}
      </div>
    </aside>
  );
}
