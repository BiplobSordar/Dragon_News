import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll to top on every route change
    window.scrollTo({
      top: 0,
      behavior: "smooth", // you can use 'auto' for instant scroll
    });
  }, [pathname]);

  return null;
}
