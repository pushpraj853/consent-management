import { useSelector } from "react-redux";
import { Outlet, Navigate, useSearchParams } from "react-router-dom";
import { RootState } from "../store";
import { isUserAuthenticated } from "../utils/auth";
import { getSafeRedirectPath, REDIRECT_QUERY_PARAM } from "../utils/redirect";

interface PublicRoutesWrapperProps {
  redirectRoute: string;
}

const PublicRoutesWrapper = ({ redirectRoute }: PublicRoutesWrapperProps) => {
  const [searchParams] = useSearchParams();
  const accessToken = useSelector((state: RootState) => state.userCredential?.accessToken);
  const authenticated = Boolean(accessToken) && isUserAuthenticated();

  if (!authenticated) {
    return <Outlet />;
  }

  const redirect = getSafeRedirectPath(searchParams.get(REDIRECT_QUERY_PARAM));

  return <Navigate replace to={redirect ?? redirectRoute} />;
};

export default PublicRoutesWrapper;
