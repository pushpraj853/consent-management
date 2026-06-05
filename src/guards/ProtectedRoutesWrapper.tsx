import { Outlet, Navigate } from "react-router-dom";
import { isUserAuthenticated } from "../utils/auth";

interface ProtectedRoutesWrapperProps {
  redirectRoute: string;
  queryParam?: string;
}

const ProtectedRoutesWrapper = ({ redirectRoute, queryParam }: ProtectedRoutesWrapperProps) => {
  return isUserAuthenticated() ? (
    <Outlet />
  ) : (
    <Navigate replace to={`${redirectRoute}${queryParam || ""}`} />
  );
};

export default ProtectedRoutesWrapper;
