import { useAuth } from "../context/Authcontext";
import { Navigate } from "react-router-dom";
export const ProtectedRoutes = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Cargando...</div>;
  }
  if (!user) {
    return <Navigate to="/login" />;
  }
  return <>{children}</>;
};
