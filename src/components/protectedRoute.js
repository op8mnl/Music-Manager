import { Outlet, Navigate } from "react-router-dom";

export const ProtectedRoute = () => {
  let auth = { isAdmin: true };
  return auth.isAdmin ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoute;
