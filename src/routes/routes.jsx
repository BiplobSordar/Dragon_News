


import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import Signup from "../pages/Signup";
import Login from "../pages/Login";


import RedirectIfAuth from "../components/RedirectIfAuth";
import NotFound from "../pages/NotFound";


import ForgotPassword from "../pages/ForgotPassword";
import ResetPassword from "../pages/ResetPassword";

import UnauthorizedPage from "../pages/UnauthorizedPage";

import AuthAction from "../pages/AuthAction";
import SinglePostLayout from "../layouts/SinglePostLayout";

import AboutPage from "../pages/About";
import ContactPage from "../pages/Contact";
import AuthLayout from "../layouts/AuthLayout";
import SingleNews from "../pages/SingleNews";
import ScrollToTop from "../components/ScrollToTop";
import CategoryPage from "../pages/Category";
import ProtectedRoute from "../components/ProtectedRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <>
      <ScrollToTop />
      <MainLayout />
    </>,
    children: [
      { index: true, element: <Home /> },
      { path: '/auth-action', element: <AuthAction /> },
      { path: "/reset-password", element: <ResetPassword /> },
      { path: "/forgot-password", element: <ForgotPassword /> },
      { path: "/about", element: <AboutPage /> },
      { path: "/contact", element: <ContactPage /> },
      { path: '*', element: <NotFound /> },
      { path: '/unauthorized', element: <UnauthorizedPage /> },
      { path: '/category/:id', element: <CategoryPage /> },


    ],
  },

  {
    path: "/news/:id",
    element:
      <ProtectedRoute>
        <>
          <ScrollToTop />
          <SinglePostLayout />
        </>
      </ProtectedRoute>
    ,
    children: [
      { index: true, element: <SingleNews /> },
    ],
  },
  {
    path: "/auth/",
    element: <AuthLayout />,
    children: [
      {
        element: <RedirectIfAuth />,
        children: [
          { index: true, element: <Login /> },
          { path: "login", element: <Login /> },
          { path: "signup", element: <Signup /> },
        ],
      },
      { path: "reset-password", element: <ResetPassword /> },
      { path: "forgot-password", element: <ForgotPassword /> },
      { path: "auth-action", element: <AuthAction /> },
    ],
  }
]);