import { useEffect } from "react";
import { redirect, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { confirmEmail } from "../../services/auth";

export default function ConfirmEmail() {
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get("token");

  useEffect(() => {
    const handleEmailVerification = async (token) => {
      try {
        await confirmEmail(token);
        toast.success("Account verified successfully");

        redirect("/auth/login");
      } catch (error) {
        toast.error(error ?? "Could not verify email");
      }
    };

    if (!token) {
      redirect("/auth/login");
    } else {
      handleEmailVerification(token);
    }
  }, [token]);

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
