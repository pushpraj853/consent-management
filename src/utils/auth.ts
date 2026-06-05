import { PUBLIC_ROUTES_PATHS } from "../routes";
import { persistor, store } from "../store";
import { clearUserCredential } from "../store/slices";
import { showToast } from "./toasters";

export const decodeJWTToken = (token: string) => {
  if (!token) {
    return null;
  }
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  const decodedData = JSON.parse(window.atob(base64));
  return decodedData;
};

export const getToken = (): string | null => {
  const state = store.getState();
  return state?.userCredential?.token;
};

export const isUserAuthenticated = () => {
  const token = getToken();
  if (!token) {
    return false;
  }

  const tokenData = decodeJWTToken(token);
  const expDate = new Date(+tokenData.exp * 1000); // expire in sec. convert in msec.

  if (!expDate || expDate <= new Date()) {
    console.log("token expired...");
    logout();
    return false;
  }

  return true;
};

export const logout = async (
  navigate?: (
    pathname: string,
    options?: { replace?: boolean | undefined; state?: unknown },
  ) => void,
): Promise<void> => {
  store.dispatch(clearUserCredential());
  await persistor.purge();

  const loginPath = PUBLIC_ROUTES_PATHS?.LOGIN?.path;

  if (navigate) {
    navigate(loginPath, { replace: true });
    showToast({ message: "Logged out successfully", type: "success" });
    return;
  }

  if (window.location.pathname !== loginPath) {
    window.location.href = loginPath;
  }
};
