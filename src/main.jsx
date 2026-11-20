import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router/dom";
import { ToastContainer } from "react-toastify";
import Loader from "./components/Loader";
import router from "./router";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <>
      <RouterProvider router={router} />
      <ToastContainer />
      <Loader />
    </>
  </React.StrictMode>
);
