import { PUBLIC_ROUTES_PATHS } from "@/routes";

export const REDIRECT_QUERY_PARAM = "redirect";

export const getSafeRedirectPath = (redirect: string | null): string | null => {
  if (!redirect) {
    return null;
  }

  try {
    const decoded = decodeURIComponent(redirect);

    if (!decoded.startsWith("/") || decoded.startsWith("//")) {
      return null;
    }

    return decoded;
  } catch {
    return null;
  }
};

export const buildLoginRedirectUrl = (returnPath: string): string => {
  const loginPath = PUBLIC_ROUTES_PATHS.LOGIN.path;

  return `${loginPath}?${REDIRECT_QUERY_PARAM}=${encodeURIComponent(returnPath)}`;
};
