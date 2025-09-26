import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const tokenExp = localStorage.getItem("tokenExp");

  // 🔹 Se não tiver token ou se já expirou → redireciona
  if (!token || !tokenExp || Date.now() > Number(tokenExp)) {
    localStorage.removeItem("token");
    localStorage.removeItem("tokenExp");
    localStorage.removeItem("nome"); // opcional, caso salve o nome também
    return <Navigate to="/loginPage" replace />;
  }

  return children;
};

export default PrivateRoute;
