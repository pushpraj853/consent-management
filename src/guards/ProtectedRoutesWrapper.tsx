import { useSelector } from "react-redux";
import { Outlet, Navigate, useLocation } from "react-router-dom";
import { RootState } from "../store";
import { isUserAuthenticated } from "../utils/auth";
import { buildLoginRedirectUrl } from "../utils/redirect";

interface ProtectedRoutesWrapperProps {
  redirectRoute: string;
}

const ProtectedRoutesWrapper = (_props: ProtectedRoutesWrapperProps) => {
  const location = useLocation();
  const accessToken = useSelector((state: RootState) => state.userCredential?.accessToken);
  const authenticated = Boolean(accessToken) && isUserAuthenticated();

  if (authenticated) {
    return <Outlet />;
  }

  const returnPath = `${location.pathname}${location.search}`;

  return <Navigate replace to={buildLoginRedirectUrl(returnPath)} />;
};

export default ProtectedRoutesWrapper;
