import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";
import { RootState } from "../store";
import { isUserAuthenticated } from "../utils/auth";

interface PublicRoutesWrapperProps {
  redirectRoute: string;
}

const PublicRoutesWrapper = ({ redirectRoute }: PublicRoutesWrapperProps) => {
  const accessToken = useSelector((state: RootState) => state.userCredential?.accessToken);
  const authenticated = Boolean(accessToken) && isUserAuthenticated();

  return authenticated ? <Navigate replace to={redirectRoute} /> : <Outlet />;
};

export default PublicRoutesWrapper;
