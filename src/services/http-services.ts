import { ApiResponse } from "./../types/index";
import { X_API_KEY } from "../configs/envoirmentVars";
import { decodeJWTToken, getToken, getUserId, logout } from "../utils";

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

type RawApiResponse<T> = {
  success?: boolean;
  message?: string;
  data?: T;
  error?: boolean;
};

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
      const userId = decodedToken?.sub?.trim() ?? getUserId();

      if (userId) {
        headers["x-user-id"] = userId;
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

const normalizeApiResponse = <T>(result: RawApiResponse<T>): ApiResponse<T> => {
  if (result.success === false || result.error === true) {
    throw new Error(result.message ?? "Something went wrong on the server.");
  }

  if (result.success === true) {
    return {
      data: (result.data ?? {}) as T,
      message: result.message ?? "OK",
      error: false,
    };
  }

  if (result.data !== undefined) {
    return {
      data: result.data,
      message: result.message ?? "success",
      error: false,
    };
  }

  throw new Error(result.message ?? "Something went wrong on the server.");
};

const parseErrorMessage = async (response: Response, fallback: string): Promise<string> => {
  try {
    const body = (await response.json()) as RawApiResponse<unknown>;
    return body.message ?? fallback;
  } catch {
    return fallback;
  }
};

const handleApiResponse = async <T>(
  response: Response,
  attachToken = false,
): Promise<ApiResponse<T>> => {
  if (response.status === 401) {
    if (attachToken) {
      logout();
    }
    throw new Error(await parseErrorMessage(response, "Unauthorized access."));
  }

  if (response.status === 403) {
    throw new Error(await parseErrorMessage(response, "Forbidden access. You don't have permission to access this resource."));
  }

  if (response.status === 404) {
    throw new Error(await parseErrorMessage(response, "Page Not Found"));
  }

  if (response.status >= 500) {
    throw new Error(await parseErrorMessage(response, "Server error. Please try again later."));
  }

  if (response.status >= 400) {
    throw new Error(await parseErrorMessage(response, "Client error. Please check your request."));
  }

  const result = (await response.json()) as RawApiResponse<T>;
  return normalizeApiResponse(result);
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
    method: httpType.GET,
    headers,
    signal,
  });

  return handleApiResponse<T>(response, attachToken);
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
    method: httpType.POST,
    headers,
    body: JSON.stringify(payload),
    signal,
  });

  return handleApiResponse<T>(response, attachToken);
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
    method: httpType.PUT,
    headers,
    body: JSON.stringify(payload),
    signal,
  });

  return handleApiResponse<T>(response, attachToken);
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
    method: httpType.DELETE,
    headers,
    body: JSON.stringify(payload),
    signal,
  });

  return handleApiResponse<T>(response, attachToken);
};
