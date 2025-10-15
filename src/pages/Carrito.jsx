// src/pages/Carrito.jsx
import { useEffect, useMemo, useState } from "react";

const KEY = "carrito";
const CLP = new Intl.NumberFormat("es-CL");

// Helpers (adaptados 1:1 de tu HTML)
function toNumber(v) {
  if (typeof v === "number") return v;
  if (typeof v !== "string") return Number(v) || 0;
  const cleaned = v.replace(/\./g, "").replace(/\s/g, "").replace(",", ".");
  const n = Number(cleaned);
  return Number.isNaN(n) ? 0 : n;
}

function normalize(it) {
  if (!it) return null;
  return {
    id: it.id ?? it.productId ?? null,
    nombre: it.nombre ?? it.name ?? "Producto",
    precio: toNumber(it.precio ?? it.price ?? 0),
    cantidad: toNumber(it.cantidad ?? it.qty ?? 1),
    imagen: it.imagen ?? it.img ?? "",
    talla: it.talla ?? it.size ?? "Única",
    color: it.color ?? "Único",
  };
}

function readRaw() {
  try {
    const v = localStorage.getItem(KEY);
    const parsed = JSON.parse(v || "[]");
    if (Array.isArray(parsed)) return parsed;
    if (parsed && Array.isArray(parsed.items)) return parsed.items;
  } catch (_) {}
  return [];
}

function loadCart() {
  return readRaw().map(normalize).filter(Boolean);
}

function saveCart(arr) {
  localStorage.setItem(KEY, JSON.stringify(arr));
  // Notifica (por si quieres escuchar en el Header y refrescar el contador)
  window.dispatchEvent(new CustomEvent("cart:updated", { detail: arr }));
}

export default function Carrito() {
  const [cart, setCart] = useState([]);

  // Cargar carrito al montar
  useEffect(() => {
    setCart(loadCart());
  }, []);

  // Totales derivados
  const { total, unidades } = useMemo(() => {
    const t = cart.reduce((acc, p) => acc + p.precio * p.cantidad, 0);
    const u = cart.reduce((acc, p) => acc + p.cantidad, 0);
    return { total: t, unidades: u };
  }, [cart]);

  // Acciones
  const inc = (idx) => {
    const next = [...cart];
    next[idx].cantidad += 1;
    saveCart(next);
    setCart(next);
  };

  const dec = (idx) => {
    const next = [...cart];
    next[idx].cantidad -= 1;
    if (next[idx].cantidad <= 0) next.splice(idx, 1);
    saveCart(next);
    setCart(next);
  };

  const del = (idx) => {
    const next = [...cart];
    next.splice(idx, 1);
    saveCart(next);
    setCart(next);
  };

  const checkout = () => {
    if (!cart.length) {
      alert("Tu carrito está vacío");
      return;
    }
    alert("Gracias por tu compra 🛍️ (aquí iría la integración con pago)");
    localStorage.removeItem(KEY);
    saveCart([]); // dispara evento
    setCart([]);
  };

  return (
    <main className="cart-shell">
      <div className="cart-card">
        <h2 className="mb-3">🛒 Tu carrito</h2>

        {/* Estado vacío / lista */}
        {!cart.length ? (
          <p className="muted">Tu carrito está vacío.</p>
        ) : (
          <div id="cartItems">
            {cart.map((p, i) => (
              <div key={`${p.id}-${i}`} className="cart-item">
                <div className="d-flex align-items-center gap-3">
                  {!!p.imagen && (
                    <img src={p.imagen} alt={p.nombre} width={70} height={70} />
                  )}
                  <div>
                    <h6 className="m-0">{p.nombre}</h6>
                    <small className="text-muted">
                      Talla: {p.talla} • Color: {p.color}
                    </small>
                    <br />
                    <small>
                      ${CLP.format(p.precio)} x {p.cantidad}
                    </small>
                  </div>
                </div>

                <div className="d-flex align-items-center">
                  <button
                    className="btn btn-sm btn-outline-secondary me-2"
                    onClick={() => dec(i)}
                    aria-label="Disminuir"
                  >
                    -
                  </button>
                  <button
                    className="btn btn-sm btn-outline-secondary me-2"
                    onClick={() => inc(i)}
                    aria-label="Aumentar"
                  >
                    +
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => del(i)}
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="d-flex justify-content-between align-items-center mt-3">
          <h4>
            Total: ${CLP.format(total)}{" "}
            <small className="text-muted">({unidades} unid.)</small>
          </h4>
          <button id="checkoutBtn" className="btn btn-success" onClick={checkout}>
            Finalizar compra
          </button>
        </div>
      </div>

      {/* Estilos locales (puedes moverlos a tu CSS global) */}
      <style>{`
        .cart-shell{ max-width:980px; margin:40px auto; }
        .cart-card{ background:#fff; border-radius:16px; padding:24px; box-shadow:0 6px 20px rgba(0,0,0,0.25); }
        .cart-item{ display:flex; align-items:center; justify-content:space-between; border-bottom:1px solid #ffffff22; padding:12px 0; }
        .cart-item:last-child{ border-bottom:0; }
        .cart-item img{ width:70px; height:70px; object-fit:cover; border-radius:10px; }
        .muted{ color:#000; }
        /* Fondo de esta vista solo si quieres replicar el original */
        body { background:#000000; }
      `}</style>
    </main>
  );
}
