import { createBrowserRouter, Navigate } from "react-router-dom";

import { AuthRoute, ProtectedAdminRoute } from "./components/Protectedroute";

import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import ConfirmEmail from "./pages/auth/ConfirmEmail";
import RequestResetPassword from "./pages/auth/RequestResetPassword";
import ResetPassword from "./pages/auth/ResetPassword";
import AdminDashboard from "./pages/admin/Dashboard";

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
]);

export default router;
