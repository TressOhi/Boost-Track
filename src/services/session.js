import { jwtDecode } from "jwt-decode";

const TOKEN_KEY = "token";

export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function setToken(token) {
  localStorage.setItem(TOKEN_KEY, token);
}

export function clearToken() {
  localStorage.removeItem(TOKEN_KEY);
}

// Decodes the stored JWT for UI purposes only (route guards, menus).
// The backend must still enforce every permission: the client can't verify the
// signature, so anything here can be forged by whoever controls the browser.
export function getSession() {
  const token = getToken();
  if (!token) return null;

  let claims;
  try {
    claims = jwtDecode(token);
  } catch {
    clearToken();
    return null;
  }

  if (typeof claims.exp === "number" && claims.exp * 1000 <= Date.now()) {
    clearToken();
    return null;
  }

  return { token, claims, isAdmin: claims.user === "admin" };
}

export function homePathFor(session) {
  return session?.isAdmin ? "/admin" : "/dashboard";
}
