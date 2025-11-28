// src/services/auth.js
import { apiClient } from "./apiClient";

// Leer / escribir sesión en localStorage
const SESSION_KEY = "stuffies_session";

export function getSession() {
  try {
    return JSON.parse(localStorage.getItem(SESSION_KEY) || "null");
  } catch {
    return null;
  }
}

export function setSession(data) {
  localStorage.setItem(SESSION_KEY, JSON.stringify(data));
  // avisar a otros componentes (Header, etc.)
  try {
    window.dispatchEvent(new Event("session:updated"));
  } catch {}
}

export function clearSession() {
  localStorage.removeItem(SESSION_KEY);
  try {
    window.dispatchEvent(new Event("session:updated"));
  } catch {}
}

// ---- Llamadas reales a la API ----

// Login: devuelve user + token desde el backend
export async function login({ username, password }) {
  const resp = await apiClient.post("/api/auth/login", {
    username,
    password,
  });

  // Se espera que resp tenga { token, user: { ... } }
  const sessionData = {
    ...resp.user,
    token: resp.token,
  };

  setSession(sessionData);
  return sessionData;
}

// Registro (si tu backend lo soporta)
export async function register(payload) {
  // payload podría incluir { nombre, email, username, password }
  const resp = await apiClient.post("/api/auth/register", payload);
  return resp; // depende de cómo lo definas en el backend
}

// Traer info actual del usuario autenticado (opcional)
export async function fetchCurrentUser() {
  const data = await apiClient.get("/api/auth/me");
  const current = getSession();
  if (current) {
    setSession({ ...current, ...data }); // sincronizar datos
  }
  return data;
}
