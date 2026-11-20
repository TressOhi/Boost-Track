import { createBrowserRouter, Navigate } from "react-router";

import {
  AuthRoute,
  ProtectedAdminRoute,
  ProtectedRoute,
} from "./components/Protectedroute";
import NotFound from "./components/NotFound";

import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import ConfirmEmail from "./pages/auth/ConfirmEmail";
import RequestResetPassword from "./pages/auth/RequestResetPassword";
import ResetPassword from "./pages/auth/ResetPassword";
import AdminDashboard from "./pages/admin/Dashboard";
import UserDashboard from "./pages/user/Dashboard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to={"/auth/login"} />,
  },
  {
    path: "/auth/login",
    element: (
      <AuthRoute>
        <Login />
      </AuthRoute>
    ),
  },
  {
    path: "/auth/signup",
    element: (
      <AuthRoute>
        <Signup />
      </AuthRoute>
    ),
  },
  {
    path: "/auth/confirm-email",
    element: (
      <AuthRoute>
        <ConfirmEmail />
      </AuthRoute>
    ),
  },
  {
    path: "/auth/password/reset",
    element: (
      <AuthRoute>
        <ResetPassword />
      </AuthRoute>
    ),
  },
  {
    path: "/auth/password/reset-request",
    element: (
      <AuthRoute>
        <RequestResetPassword />
      </AuthRoute>
    ),
  },
  {
    path: "/admin",
    children: [
      {
        path: "",
        element: (
          <ProtectedAdminRoute>
            <AdminDashboard />
          </ProtectedAdminRoute>
        ),
      },
    ],
  },
  {
    // Login sent users here, but the route didn't exist.
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <UserDashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: "*",
    element: (
      <NotFound
        title="Page not found"
        description="The page you're looking for doesn't exist."
      />
    ),
  },
]);

export default router;
