import { Navigate } from "react-router";
import { getSession, homePathFor } from "../services/session";

// Guards are evaluated on every render. They used to read localStorage once at
// import time, so logging in or out had no effect until a full page reload.

export const ProtectedAdminRoute = ({ children }) => {
  const session = getSession();
  if (!session) return <Navigate to="/auth/login" replace />;
  if (!session.isAdmin) return <Navigate to="/dashboard" replace />;
  return children;
};

export const ProtectedRoute = ({ children }) => {
  if (!getSession()) return <Navigate to="/auth/login" replace />;
  return children;
};

export const AuthRoute = ({ children }) => {
  const session = getSession();
  // Was `<Navigate to="" />`, which redirects to the current page forever.
  if (session) return <Navigate to={homePathFor(session)} replace />;
  return children;
};
