import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";
import { RootState } from "../store";
import { isUserAuthenticated } from "../utils/auth";

interface ProtectedRoutesWrapperProps {
  redirectRoute: string;
  queryParam?: string;
}

const ProtectedRoutesWrapper = ({ redirectRoute, queryParam }: ProtectedRoutesWrapperProps) => {
  const accessToken = useSelector((state: RootState) => state.userCredential?.accessToken);
  const authenticated = Boolean(accessToken) && isUserAuthenticated();

  return authenticated ? (
    <Outlet />
  ) : (
    <Navigate replace to={`${redirectRoute}${queryParam || ""}`} />
  );
};

export default ProtectedRoutesWrapper;
