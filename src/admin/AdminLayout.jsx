// src/admin/AdminLayout.jsx
import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import AdminHeader from "./components/AdminHeader.jsx";
import AdminFooter from "./components/AdminFooter.jsx";
import Sidebar from "./components/Sidebar.jsx";

export default function AdminLayout() {
  const navigate = useNavigate();

  useEffect(() => {
    // Gate simple: solo role === 'admin' puede entrar
    const session = JSON.parse(localStorage.getItem("stuffies_session") || "null");
    if (!session || session.role !== "admin") {
      navigate("/login", { replace: true });
    }
  }, [navigate]);

  return (
    <div className="admin-shell bg-dark">
      <AdminHeader />
      <div className="admin-body admin-grid container py-3">
        <Sidebar />
        <main className="admin-main card bg-dark border-light text-light p-3">
          <Outlet />
        </main>
      </div>
      <AdminFooter />
    </div>
  );
}
