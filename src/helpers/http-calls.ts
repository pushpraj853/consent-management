import { ApiResponse } from "../types/index";
import { BASE_URL } from "../configs";
import { makeGetRequest } from "../services/http-services";
import { UserDataType } from "../types";
import { USER_LIST_ENDPOINT } from "../configs/endpoints";

export const getUserList = async (): Promise<ApiResponse<UserDataType>> => {
  const { endpoint, attachToken, attachXUserId } = USER_LIST_ENDPOINT;
  return makeGetRequest<UserDataType>({
    url: `${BASE_URL}${endpoint}`,
    attachToken,
    attachXUserId,
  });
};
