import { httpType } from "../services/http-services";

export interface EndpointConfigType {
  endpoint: string;
  httpType: httpType;
  attachToken?: boolean;
  attachXUserId?: boolean;
}

export const SEND_OTP_ENDPOINT: EndpointConfigType = {
  endpoint: "/auth/send-otp",
  httpType: httpType.POST,
  attachToken: false,
  attachXUserId: false,
};

export const LOGIN_ENDPOINT: EndpointConfigType = {
  endpoint: "/auth/login",
  httpType: httpType.POST,
  attachToken: false,
  attachXUserId: false,
};

export const FORGOT_PASSWORD_ENDPOINT: EndpointConfigType = {
  endpoint: "/auth/forgot-password",
  httpType: httpType.POST,
  attachToken: false,
  attachXUserId: false,
};

export const LOGOUT_ENDPOINT: EndpointConfigType = {
  endpoint: "/auth/logout",
  httpType: httpType.POST,
  attachToken: true,
  attachXUserId: false,
};

export const USER_LIST_ENDPOINT: EndpointConfigType = {
  endpoint: "/users",
  httpType: httpType.GET,
  attachToken: true,
  attachXUserId: false,
};

export const MANAGE_CONSENTS_ENDPOINT: EndpointConfigType = {
  endpoint: "/manage",
  httpType: httpType.GET,
  attachToken: false,
  attachXUserId: false,
};

export const MY_CONSENTS_ENDPOINT: EndpointConfigType = {
  endpoint: "/portal/dashboard",
  httpType: httpType.GET,
  attachToken: true,
  attachXUserId: true,
};

export const REVOKE_CONSENT_ENDPOINT: EndpointConfigType = {
  endpoint: "/portal/consents",
  httpType: httpType.DELETE,
  attachToken: true,
  attachXUserId: true,
};

export const AUDIT_TRAIL_ENDPOINT: EndpointConfigType = {
  endpoint: "/portal/audit",
  httpType: httpType.GET,
  attachToken: true,
  attachXUserId: true,
};

export const CLIENT_DISPLAY_ENDPOINT: EndpointConfigType = {
  endpoint: "/portal/client/display",
  httpType: httpType.POST,
  attachToken: true,
  attachXUserId: true,
};
