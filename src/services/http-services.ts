import { ApiResponse } from "./../types/index";
import { X_API_KEY } from "../configs";
import { decodeJWTToken, getToken, logout } from "../utils";

export enum httpType {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
}

interface BaseRequestOptions {
  url: string;
  attachToken?: boolean;
  attachXUserId?: boolean;
  signal?: AbortSignal;
}

interface GetRequestOptions extends BaseRequestOptions {
  params?: Record<string, unknown>;
}

interface PostRequestOptions extends BaseRequestOptions {
  payload?: Record<string, unknown>;
}

interface DeleteRequestOptions extends BaseRequestOptions {
  payload?: Record<string, unknown>;
}

type Headers = Record<string, string>;

const createRequestHeader = (attachToken = false, attachXUserId = false): Headers => {
  const headers: Headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    "x-API-key": X_API_KEY,
  };

  if (attachToken) {
    const authToken = getToken();
    if (!authToken) throw new Error("Error fetching auth token");
    headers["Authorization"] = `Bearer ${authToken}`;

    if (attachXUserId) {
      const decodedToken = decodeJWTToken(authToken);
      if (decodedToken?.sub) {
        headers["x-user-id"] = decodedToken.sub.trim();
      } else {
        throw new Error("Error fetching x-user-id from token");
      }
    }
  }

  return headers;
};

export const structureQueryParams = (params: Record<string, unknown>): string => {
  let queryStrings = "?";
  const keys = Object.keys(params);
  keys.forEach((key, index) => {
    queryStrings += `${key}=${params[key]}`;
    if (index < keys.length - 1) {
      queryStrings += "&";
    }
  });
  return queryStrings;
};

// this function is just to make sure that the result is of type ApiResponse<T>,
// it is not doing any transformation to the result, just making sure that the type is correct
//! SHOULD BE REMOVED once we have a proper response structure from the server
const formatResultToTypeMatch = <T>(result: ApiResponse<T>): ApiResponse<T> => {
  return {
    data: result ? { ...result } : null,
    message: "success",
    error: false,
  } as ApiResponse<T>;
};

const _handleApiResponse = async <T>(response: Response): Promise<ApiResponse<T>> => {
  if (response.status === 401) {
    logout();
    throw new Error("Unauthorized access. Please login again.");
  } else if (response.status === 403) {
    throw new Error("Forbidden access. You don't have permission to access this resource.");
  } else if (response.status >= 500) {
    throw new Error("Server error. Please try again later.");
  } else if (response.status >= 400) {
    throw new Error("Client error. Please check your request.");
  } else if (response?.status == 404) {
    throw new Error("Page Not Found");
  }

  const result: ApiResponse<T> = await response.json();
  if (result?.error) {
    throw new Error(result?.message ?? "Something went wrong on the server.");
  }

  return formatResultToTypeMatch(result) as ApiResponse<T>;
};

export const makeGetRequest = async <T>({
  url,
  attachToken = false,
  attachXUserId = false,
  params = {},
  signal,
}: GetRequestOptions): Promise<ApiResponse<T>> => {
  const headers = createRequestHeader(attachToken, attachXUserId);
  const queryString = params && Object.keys(params).length > 0 ? structureQueryParams(params) : "";

  const response = await fetch(url + queryString, {
    method: "GET",
    headers,
    signal,
  });

  const result: ApiResponse<T> = await _handleApiResponse<T>(response);
  return result;
};

export const makePostRequest = async <T>({
  url,
  attachToken = false,
  attachXUserId = false,
  payload = {},
  signal,
}: PostRequestOptions): Promise<ApiResponse<T>> => {
  const headers = createRequestHeader(attachToken, attachXUserId);

  const response = await fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify(payload),
    signal,
  });

  const result: ApiResponse<T> = await _handleApiResponse<T>(response);
  return result;
};

export const makePutRequest = async <T>({
  url,
  attachToken = false,
  attachXUserId = false,
  payload = {},
  signal,
}: PostRequestOptions): Promise<ApiResponse<T>> => {
  const headers = createRequestHeader(attachToken, attachXUserId);

  const response = await fetch(url, {
    method: "PUT",
    headers,
    body: JSON.stringify(payload),
    signal,
  });

  const result: ApiResponse<T> = await _handleApiResponse<T>(response);
  return result;
};

export const makeDeleteRequest = async <T>({
  url,
  attachToken = false,
  attachXUserId = false,
  payload = {},
  signal,
}: DeleteRequestOptions): Promise<ApiResponse<T>> => {
  const headers = createRequestHeader(attachToken, attachXUserId);

  const response = await fetch(url, {
    method: "DELETE",
    headers,
    body: JSON.stringify(payload),
    signal,
  });

  const result: ApiResponse<T> = await _handleApiResponse<T>(response);
  return result;
};
