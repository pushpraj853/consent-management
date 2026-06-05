import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { LOGIN_ENDPOINT } from "../../configs/endpoints";
import { AuthResponseType } from "../../types";
import { errorToast } from "../../utils";
import { PROTECTED_ROUTES_PATHS } from "../../routes";
import { useDispatch } from "react-redux";
import { addUserCredential } from "../../store/slices";
import { useApiRequest } from "../../hooks";

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { makeApiCall: login, loading } = useApiRequest<AuthResponseType>({
    endpointConfig: LOGIN_ENDPOINT,
    hitApiOnMount: false,
  });

  const completeAuthorization = (data: AuthResponseType) => {
    const reduxData = {
      token: data?.accessToken,
      user: {
        id: data?.id,
        email: data?.email,
        username: data?.username,
        firstName: data?.firstName,
        lastName: data?.lastName,
      },
    };

    dispatch(addUserCredential(reduxData));
    navigate(PROTECTED_ROUTES_PATHS?.DASHBOARD?.path, {
      replace: true,
    });
  };

  const handleLogin = async () => {
    try {
      const payload = {
        username: "emilys",
        password: "emilyspass",
      };
      const response = await login({ payload });
      completeAuthorization(response.data);
    } catch (error) {
      errorToast(error);
    }
  };

  return (
    <div>
      Login Page
      <Button onClick={handleLogin} disabled={loading}>
        {loading ? "Logging in..." : "Login"}
      </Button>
    </div>
  );
};

export default LoginPage;
