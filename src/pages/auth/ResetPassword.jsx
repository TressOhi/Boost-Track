import { useState } from "react";
import { redirect, useLocation, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { hideLoader, showLoader } from "../../components/Loader";
import { resetPassword } from "../../services/auth";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get("token");

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== password2) {
      toast.error("Passwords do not match");
      return;
    }

    showLoader();

    try {
      await resetPassword(password, token);
      toast.success("Password reset successfully");

      redirect("/auth/login");
    } catch (error) {
      toast.error(error.message);
    }

    hideLoader();
  };

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
            Request Password Reset
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
          <div className="bg-white px-6 py-8 shadow sm:rounded-lg sm:px-9">
            <form className="space-y-6" method="POST" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  New Password
                </label>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Choose New Password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password2"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Confirm New Password
                </label>
                <div className="mt-2">
                  <input
                    id="password2"
                    name="password2"
                    type="password"
                    placeholder="Re-enter Password"
                    required
                    value={password2}
                    onChange={(e) => setPassword2(e.target.value)}
                    className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="flex items-center justify-center">
                <div className="text-sm leading-6">
                  <Link
                    to={"/auth/login"}
                    className="font-semibold text-indigo-600 hover:text-indigo-500"
                  >
                    Have an account? Sign In
                  </Link>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
