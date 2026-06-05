import { httpType } from "../services/http-services";

export interface EndpointConfigType {
  endpoint: string;
  httpType: httpType;
  attachToken?: boolean;
  attachXUserId?: boolean;
}

export const LOGIN_ENDPOINT: EndpointConfigType = {
  endpoint: "/auth/login",
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
