import axios from "axios";
import { config } from "../config";
import { clearToken, getToken } from "./session";

const http = axios.create({
  baseURL: config.apiUrl,
  // Never follow a request URL to another origin with the bearer token attached.
  allowAbsoluteUrls: false,
});

http.interceptors.request.use((requestConfig) => {
  // Read the token on every request: reading it once at import time sent
  // "Bearer null" after login and kept sending a revoked token after logout.
  const token = getToken();
  if (token) {
    requestConfig.headers.Authorization = `Bearer ${token}`;
  } else {
    delete requestConfig.headers.Authorization;
  }
  return requestConfig;
});

http.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      clearToken();
    }
    return Promise.reject(error);
  }
);

// Turns an axios error into a readable message. FastAPI returns `detail` as a
// string for HTTPException and as a list of objects for validation errors.
export function apiErrorMessage(error, fallback = "Something went wrong") {
  const detail = error?.response?.data?.detail;
  if (typeof detail === "string") return detail;
  if (Array.isArray(detail) && detail.length) {
    return detail.map((d) => d?.msg ?? String(d)).join(", ");
  }
  if (!error?.response) return "Could not reach the server";
  return fallback;
}

export { http as axios };
