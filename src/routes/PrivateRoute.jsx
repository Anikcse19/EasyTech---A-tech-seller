/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useLocation, useNavigate } from "react-router-dom";

import Cookies from "js-cookie";
import { useEffect } from "react";

export default function PrivateRoute({ children }) {
  const navigate = useNavigate();
  const location = useLocation();

  const user = Cookies.get("user");

  const isAuthenticated = user; // Replace with your authentication logic

  useEffect(() => {
    if (!isAuthenticated) {
      navigate(`/login?redirect=${location.pathname}${location.search}`); // Redirect to login page if not authenticated
    }
  }, [isAuthenticated, location]);

  // Render the wrapped component if authenticated
  return isAuthenticated ? <>{children}</> : null;
}
