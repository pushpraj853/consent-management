import { ApiResponse } from "./../types/index";
import { X_API_KEY } from "../configs/envoirmentVars";
import {
  getToken,
  getUserId,
  handleUnauthorizedAccess,
  UnauthorizedError,
} from "../utils";

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
  timestamp?: string;
};

const API_WRAPPER_KEYS = new Set(["success", "message", "error", "data", "timestamp"]);

const extractResponseData = <T>(result: RawApiResponse<T>): T => {
  if (result.data !== undefined && result.data !== null) {
    return result.data;
  }

  const payload = Object.fromEntries(
    Object.entries(result).filter(([key]) => !API_WRAPPER_KEYS.has(key)),
  );

  return payload as T;
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
      const cvUserId = getUserId();

      if (cvUserId) {
        headers["X-User-Id"] = cvUserId;
      } else {
        throw new Error("Error fetching X-User-Id from store");
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
      data: extractResponseData(result),
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

const handleApiResponse = async <T>(response: Response): Promise<ApiResponse<T>> => {
  if (response.status === 401) {
    const message = await parseErrorMessage(response, "Unauthorized");

    if (getToken()) {
      void handleUnauthorizedAccess(message);
    }

    throw new UnauthorizedError(message);
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

  return handleApiResponse<T>(response);
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

  return handleApiResponse<T>(response);
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

  return handleApiResponse<T>(response);
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

  return handleApiResponse<T>(response);
};
