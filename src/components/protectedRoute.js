import { Outlet, Navigate } from "react-router-dom";
import { UserContext } from "./user";
import { useContext } from "react";
import { auth } from "./firebase";
import UsersController from "./usersController";

export const ProtectedRoute = ({ isAdmin, children }) => {
  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }
  return children;
};

export default ProtectedRoute;
