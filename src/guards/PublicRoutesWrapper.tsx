import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";
import { RootState } from "../store";
import { isUserAuthenticated } from "../utils/auth";

interface PublicRoutesWrapperProps {
  redirectRoute: string;
}

const PublicRoutesWrapper = ({ redirectRoute }: PublicRoutesWrapperProps) => {
  const token = useSelector((state: RootState) => state.userCredential?.token);
  const authenticated = Boolean(token) && isUserAuthenticated();

  return authenticated ? <Navigate replace to={redirectRoute} /> : <Outlet />;
};

export default PublicRoutesWrapper;
