import { ApiResponse } from "./../types/index";
import { BASE_URL } from "../configs";
import { makeGetRequest } from "../services/http-services";
import { UserDataType } from "../types";

export const getUserDetails = async (): Promise<ApiResponse<UserDataType>> => {
  return makeGetRequest<UserDataType>({
    url: `${BASE_URL}/user`,
    attachToken: true,
  });
};
