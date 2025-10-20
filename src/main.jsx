
import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/routes";
import { AuthProvider } from "./context/AuthContext";
import "./index.css";
import { NewsProvider } from "./context/NewsContext";
import { ToastContainer, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <NewsProvider>
       
        <RouterProvider router={router} />
      </NewsProvider>
    </AuthProvider>
<ToastContainer
  position="top-right"
  autoClose={2000}
  hideProgressBar={false}
  newestOnTop={false}
  closeOnClick
  rtl={false}
  pauseOnFocusLoss
  draggable
  pauseOnHover
  theme="colored"   
  transition={Bounce}
 
/>


  </React.StrictMode>
);
