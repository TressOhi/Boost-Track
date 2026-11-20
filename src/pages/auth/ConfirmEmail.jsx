import { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router";
import { toast } from "react-toastify";
import { confirmEmail } from "../../services/auth";

export default function ConfirmEmail() {
  const location = useLocation();
  const navigate = useNavigate();
  const token = new URLSearchParams(location.search).get("token");
  // StrictMode runs effects twice in development; the second call would reuse
  // an already-consumed token and show a spurious error.
  const attempted = useRef(false);

  useEffect(() => {
    if (attempted.current) return;
    attempted.current = true;

    if (!token) {
      navigate("/auth/login", { replace: true });
      return;
    }

    window.history.replaceState(null, "", location.pathname);

    confirmEmail(token)
      .then(() => toast.success("Account verified successfully"))
      .catch((error) => toast.error(error.message))
      .finally(() => navigate("/auth/login", { replace: true }));
  }, [token, navigate, location.pathname]);

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <img
            className="mx-auto h-10 w-auto"
            src="/Logo.png"
            alt="Your Company"
          />
          <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Confirm Email
          </h2>
        </div>
      </div>
    </>
  );
}
