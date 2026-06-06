import {
  ClientDisplayDataType,
  ConsentGrantCallbackPayload,
  ConsentGrantClientType,
} from "@/types/consent-grant";

export const CONSENT_GRANT_QUERY_PARAMS = {
  CLIENT_TOKEN: "clientToken",
  REDIRECT_URI: "redirect_uri",
  STATE: "state",
} as const;

export const DEFAULT_CONSENT_GRANT_FIELDS = {
  description: "has requested access to the following data:",
  dataKeys: ["Name", "Pan Number", "email"],
  consentDuration: 90,
} as const;

export const getClientTokenFromSearchParams = (
  searchParams: URLSearchParams,
): string | null => searchParams.get(CONSENT_GRANT_QUERY_PARAMS.CLIENT_TOKEN) ?? searchParams.get("id");

export const mapClientDisplayToConsentGrant = (
  display: ClientDisplayDataType,
): ConsentGrantClientType => ({
  companyLogoUrl: display.logoUrl,
  companyName: display.appDisplayLabel,
  description: DEFAULT_CONSENT_GRANT_FIELDS.description,
  dataKeys: [...DEFAULT_CONSENT_GRANT_FIELDS.dataKeys],
  consentDuration: DEFAULT_CONSENT_GRANT_FIELDS.consentDuration,
});

export const getSafeExternalRedirectUri = (redirectUri: string | null): string | null => {
  if (!redirectUri) {
    return null;
  }

  try {
    const parsed = new URL(redirectUri);

    if (!["http:", "https:"].includes(parsed.protocol)) {
      return null;
    }

    return redirectUri;
  } catch {
    return null;
  }
};

export const buildConsentGrantCallbackUrl = (
  redirectUri: string,
  payload: ConsentGrantCallbackPayload,
): string => {
  const callbackUrl = new URL(redirectUri);

  callbackUrl.searchParams.set("status", payload.status);

  if (payload.state) {
    callbackUrl.searchParams.set("state", payload.state);
  }

  if (payload.clientToken) {
    callbackUrl.searchParams.set("client_token", payload.clientToken);
  }

  return callbackUrl.toString();
};

export const completeConsentGrantFlow = ({
  redirectUri,
  payload,
  onFallback,
}: {
  redirectUri: string | null;
  payload: ConsentGrantCallbackPayload;
  onFallback: () => void;
}): void => {
  if (!redirectUri) {
    onFallback();
    return;
  }

  const callbackUrl = buildConsentGrantCallbackUrl(redirectUri, payload);
  const targetOrigin = new URL(callbackUrl).origin;

  if (window.opener && !window.opener.closed) {
    window.opener.postMessage(
      {
        type: "CONSENT_VAULT_RESULT",
        status: payload.status,
        state: payload.state,
        clientToken: payload.clientToken,
      },
      targetOrigin,
    );

    window.close();

    window.setTimeout(() => {
      if (!window.closed) {
        window.location.replace(callbackUrl);
      }
    }, 300);

    return;
  }

  window.location.replace(callbackUrl);
};

export const getConsentGrantUrlContext = (searchParams: URLSearchParams) => {
  const clientToken = getClientTokenFromSearchParams(searchParams);
  const redirectUriParam = searchParams.get(CONSENT_GRANT_QUERY_PARAMS.REDIRECT_URI);
  const state = searchParams.get(CONSENT_GRANT_QUERY_PARAMS.STATE);
  const redirectUri = getSafeExternalRedirectUri(redirectUriParam);

  return {
    clientToken,
    state,
    redirectUri,
    hasValidUrlParams: Boolean(clientToken && redirectUri),
  };
};
