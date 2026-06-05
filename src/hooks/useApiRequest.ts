import { useCallback, useEffect, useRef, useState } from "react";
import { BASE_URL } from "../configs";
import {
  httpType,
  makeDeleteRequest,
  makeGetRequest,
  makePostRequest,
  makePutRequest,
  structureQueryParams,
} from "../services/http-services";
import { ApiResponse } from "./../types/index";
import { EndpointConfigType } from "../configs/endpoints";
import { errorToast } from "../utils";

interface UseApiRequestOptions {
  endpointConfig: EndpointConfigType;
  hitApiOnMount?: boolean;
  pathParams?: (string | number)[];
  queryParams?: Record<string, unknown>;
  payload?: Record<string, unknown>;
  showErrorToast?: boolean;
  dependencies?: unknown[];
}

interface MakeApiCallOptions {
  pathParams?: (string | number)[];
  queryParams?: Record<string, unknown>;
  payload?: Record<string, unknown>;
}

const getErrorMessage = (error: unknown): string => {
  if (typeof error === "string") {
    return error;
  }

  if (typeof error === "object" && error !== null && ("message" in error || "reason" in error)) {
    const { message, reason } = error as { message?: string; reason?: string };
    return message ?? reason ?? "Something went wrong.";
  }

  return "Something went wrong.";
};

const isAbortError = (error: unknown): boolean =>
  error instanceof DOMException && error.name === "AbortError";

const buildUrl = (
  endpoint: string,
  pathParams: (string | number)[] = [],
  queryParams: Record<string, unknown> = {},
): string => {
  let url = `${BASE_URL}${endpoint}`;

  if (pathParams.length) {
    url += `/${pathParams.map(String).join("/")}`;
  }

  if (Object.keys(queryParams).length) {
    url += structureQueryParams(queryParams);
  }

  return url;
};

// Generic hook,
// U is the type of the data returned from the API
function useApiRequest<U>({
  endpointConfig,
  hitApiOnMount = true,
  pathParams = [],
  queryParams = {},
  payload = {},
  showErrorToast = hitApiOnMount,
  dependencies,
}: UseApiRequestOptions) {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<ApiResponse<U> | null>(null);
  const [error, setError] = useState<string | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  const handleError = useCallback(
    (error: unknown, signal?: AbortSignal): never => {
      if (signal?.aborted || isAbortError(error)) {
        throw error;
      }

      console.error(`Error in ${endpointConfig?.endpoint}:`, error);
      setError(getErrorMessage(error));

      if (showErrorToast) {
        errorToast(error);
      }

      throw error;
    },
    [endpointConfig?.endpoint, showErrorToast],
  );

  const makeApiCall = useCallback(
    async (
      {
        pathParams: callPathParams = pathParams,
        queryParams: callQueryParams = queryParams,
        payload: callPayload = payload,
      }: MakeApiCallOptions = {},
      signal?: AbortSignal,
    ): Promise<ApiResponse<U>> => {
      try {
        if (!endpointConfig?.endpoint) {
          throw new Error("Please provide an endpoint.");
        }

        setLoading(true);
        setError(null);

        const endPointUrl = buildUrl(endpointConfig.endpoint, callPathParams, callQueryParams);

        let result: ApiResponse<U> | null = null;
        const requestOptions = { signal };

        switch (endpointConfig.httpType) {
          case httpType.GET:
            result = await makeGetRequest<U>({
              url: endPointUrl,
              attachToken: endpointConfig.attachToken,
              attachXUserId: endpointConfig.attachXUserId,
              ...requestOptions,
            });
            break;

          case httpType.POST:
            result = await makePostRequest<U>({
              url: endPointUrl,
              attachToken: endpointConfig.attachToken,
              attachXUserId: endpointConfig.attachXUserId,
              payload: callPayload,
              ...requestOptions,
            });
            break;

          case httpType.PUT:
            result = await makePutRequest<U>({
              url: endPointUrl,
              attachToken: endpointConfig.attachToken,
              attachXUserId: endpointConfig.attachXUserId,
              payload: callPayload,
              ...requestOptions,
            });
            break;

          case httpType.DELETE:
            result = await makeDeleteRequest<U>({
              url: endPointUrl,
              attachToken: endpointConfig.attachToken,
              attachXUserId: endpointConfig.attachXUserId,
              payload: callPayload,
              ...requestOptions,
            });
            break;

          default:
            throw new Error(`Invalid httpType for: ${endpointConfig.endpoint}`);
        }

        if (signal?.aborted) {
          throw new DOMException("Aborted", "AbortError");
        }

        setData(result);
        return result;
      } catch (error) {
        return handleError(error, signal);
      } finally {
        if (!signal?.aborted) {
          setLoading(false);
        }
      }
    },
    [endpointConfig, handleError, pathParams, queryParams, payload],
  );

  const refetch = useCallback(
    (options: MakeApiCallOptions = {}) => {
      abortControllerRef.current?.abort();
      const controller = new AbortController();
      abortControllerRef.current = controller;

      return makeApiCall(options, controller.signal);
    },
    [makeApiCall],
  );

  useEffect(() => {
    if (!hitApiOnMount) {
      return;
    }

    const controller = new AbortController();
    abortControllerRef.current = controller;

    refetch().catch((error) => {
      if (isAbortError(error)) {
        return;
      }
    });

    return () => {
      controller.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hitApiOnMount, ...(dependencies ?? [])]);

  return { data, loading, error, makeApiCall, refetch };
}

export default useApiRequest;
