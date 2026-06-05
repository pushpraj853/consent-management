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
