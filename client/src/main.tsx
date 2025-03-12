import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ToastContainer, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ToastContainer
      position='top-center'
      closeOnClick
      transition={Zoom}
      autoClose={5000}
      hideProgressBar={true}
      theme='colored'
      style={{ zIndex: 100 }}
    />
    <App />
  </StrictMode>
);
