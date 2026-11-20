import { afterEach, describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router";
import { AuthRoute, ProtectedAdminRoute, ProtectedRoute } from "./Protectedroute";
import { clearToken, setToken } from "../services/session";

const b64 = (obj) => btoa(JSON.stringify(obj)).replace(/=+$/, "");
const login = (user) =>
  setToken(`${b64({})}.${b64({ user, exp: Math.floor(Date.now() / 1000) + 3600 })}.s`);

function renderAt(path) {
  const router = createMemoryRouter(
    [
      { path: "/auth/login", element: <AuthRoute><p>login page</p></AuthRoute> },
      { path: "/dashboard", element: <ProtectedRoute><p>user dash</p></ProtectedRoute> },
      { path: "/admin", element: <ProtectedAdminRoute><p>admin dash</p></ProtectedAdminRoute> },
    ],
    { initialEntries: [path] }
  );
  render(<RouterProvider router={router} />);
}

afterEach(() => clearToken());

describe("route guards", () => {
  it("sends anonymous users to login", () => {
    renderAt("/admin");
    expect(screen.getByText("login page")).toBeInTheDocument();
  });

  it("keeps non-admins out of /admin", () => {
    login("member");
    renderAt("/admin");
    expect(screen.getByText("user dash")).toBeInTheDocument();
  });

  it("lets admins into /admin", () => {
    login("admin");
    renderAt("/admin");
    expect(screen.getByText("admin dash")).toBeInTheDocument();
  });

  it("redirects a logged-in admin away from login", () => {
    login("admin");
    renderAt("/auth/login");
    expect(screen.getByText("admin dash")).toBeInTheDocument();
  });
});
