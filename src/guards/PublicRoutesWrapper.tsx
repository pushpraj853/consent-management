import { Outlet, Navigate } from "react-router-dom";
import { isUserAuthenticated } from "../utils/auth";

interface PublicRoutesWrapperProps {
  redirectRoute: string;
}
const PublicRoutesWrapper = ({ redirectRoute }: PublicRoutesWrapperProps) => {
  return isUserAuthenticated() ? <Navigate replace to={redirectRoute} /> : <Outlet />;
};

export default PublicRoutesWrapper;
