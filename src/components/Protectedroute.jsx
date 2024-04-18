import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const token = localStorage.getItem("token");
const decodedToken = token ? jwtDecode(token) : null;

export const ProtectedAdminRoute = ({ children }) => {
  if (!token || decodedToken.user !== "admin") {
    return <Navigate to="/" replace />;
  } else {
    return children;
  }
};

export const ProtectedRoute = ({ children }) => {
  if (!token) {
    return <Navigate to="/" replace />;
  } else {
    return children;
  }
};

export const AuthRoute = ({ children }) => {
  if (token && decodedToken.user === "admin") {
    return <Navigate to="" replace />;
  } else if (token) {
    return <Navigate to="" replace />;
  } else {
    return children;
  }
};
