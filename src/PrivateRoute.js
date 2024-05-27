import React from "react";
import { Navigate, useParams } from "react-router-dom";
import { useAuthContext } from "./context/authenticationContext";

function PrivateRoute({ children }) {
  const { isLoggedIn } = useAuthContext();
  const { id } = useParams();

  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user ? user.id : null; // Ensure user and user.id are safely accessed

  const token = localStorage.getItem("token");

  const isAuthenticated =
    (isLoggedIn !== null && isLoggedIn) || (isLoggedIn === null && token);

  // Check if the route has an ID parameter and if it matches the logged-in user's ID
  const isAuthorized = !id || (userId && userId === id);

  if (!isAuthenticated) {
    return <Navigate to="/signup" replace />;
  }

  if (!isAuthorized) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
}

export default PrivateRoute;
