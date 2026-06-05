import React from "react";
import { Navigate } from "react-router-dom";
import { decodeJWTToken, getToken } from "../utils";

const AccessGuard = ({
  allowedRoles,
  children,
}: {
  allowedRoles?: string[];
  children: React.ReactNode;
}) => {
  const token = getToken();
  if (!token) return <Navigate to={"/"} replace />;

  const decodedToken = decodeJWTToken(token);
  const role = decodedToken?.userRole || decodedToken?.userType || decodedToken?.role;

  if (!allowedRoles || allowedRoles.includes(role)) {
    return <>{children}</>;
  }

  return <Navigate to="/" replace />;
};

export default AccessGuard;
