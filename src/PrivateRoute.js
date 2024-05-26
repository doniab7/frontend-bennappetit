import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthContext } from "./context/authenticationContext";

function PrivateRoute({ children }) {
  const { isLoggedIn } = useAuthContext();
  console.log(isLoggedIn);
  // Redirect to the login page if not logged in, otherwise render the child component
  return isLoggedIn ? children : <Navigate to="/signup" replace />;
}

export default PrivateRoute;
