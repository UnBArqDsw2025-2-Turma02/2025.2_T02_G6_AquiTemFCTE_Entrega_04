import { Navigate } from "react-router-dom";
import { ROUTES } from "../../../utils/constants";

const AuthGuard = ({ children }) => {
  const isAuthenticated = Boolean(sessionStorage.getItem("access_token"));
  if (!isAuthenticated) {
    alert("Usuário não atenticado! Faça login.");
    localStorage.clear();
    return <Navigate to={ROUTES.LOGIN} replace />;
  }

  return children;
};

export default AuthGuard;
