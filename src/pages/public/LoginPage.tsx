import { useNavigate } from "react-router-dom";
import { LOGIN_ENDPOINT } from "../../api/endpoints";
import useApiRequest from "../../hooks/useApiRequest";
import { AuthResponseType } from "../../types";
import { errorToast } from "../../utils";
import { PROTECTED_ROUTES_PATHS } from "../../routes/protectedRoutes";
import { useDispatch } from "react-redux";
import { addUserCredential } from "../../store/slices/userCredentialSlice";

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { makeApiCall: login, loading } = useApiRequest<AuthResponseType>({
    endpointConfig: LOGIN_ENDPOINT,
    hitApiOnMount: false,
  });

  const _completeAuthorization = (data: AuthResponseType) => {
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

  const _login = async () => {
    try {
      const payload = {
        username: "emilys",
        password: "emilyspass",
      };
      const response = await login({ payload });
      _completeAuthorization(response.data);
    } catch (error) {
      errorToast(error);
    }
  };

  return (
    <div>
      Login
      <button onClick={() => _login()} disabled={loading}>
        Login
      </button>
    </div>
  );
};

export default LoginPage;
