// src/components/Layout.jsx
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import { Outlet } from "react-router-dom";
import ScrollToTop from "./ScrollToTop.jsx";

export default function Layout() {
  return (
    <>
      <ScrollToTop />
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}
