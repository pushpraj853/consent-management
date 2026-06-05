import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";
import { RootState } from "../store";
import { isUserAuthenticated } from "../utils/auth";

interface ProtectedRoutesWrapperProps {
  redirectRoute: string;
  queryParam?: string;
}

const ProtectedRoutesWrapper = ({ redirectRoute, queryParam }: ProtectedRoutesWrapperProps) => {
  const token = useSelector((state: RootState) => state.userCredential?.token);
  const authenticated = Boolean(token) && isUserAuthenticated();

  return authenticated ? (
    <Outlet />
  ) : (
    <Navigate replace to={`${redirectRoute}${queryParam || ""}`} />
  );
};

export default ProtectedRoutesWrapper;
