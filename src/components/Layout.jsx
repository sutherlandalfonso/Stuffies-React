// src/components/Layout.jsx
import { Outlet } from "react-router-dom";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";

export default function Layout() {
  return (
    <>
      <Header />
      <Outlet />     {/* <- aquí se pintan Productos/Blogs/etc */}
      <Footer />
    </>
  );
}
