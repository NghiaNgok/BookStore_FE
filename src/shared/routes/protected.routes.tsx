import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { userSelector } from "../redux-flow/selector";
import { AUTH_PATH } from "../constants/path";

interface ProtectedRouteProps {
    children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const userStore = useSelector(userSelector);

  return userStore ? (
    children
  ) : (
    <Navigate to={AUTH_PATH.SIGNIN}  />
  );
};

export default ProtectedRoute;
