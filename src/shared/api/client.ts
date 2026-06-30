import { getApiBaseUrl } from "@/src/shared/config";

import { ApiClientError } from "./errors";
import type { ApiErrorPayload, ApiRequestOptions } from "./types";

const hasJsonContentType = (headers: Headers) => {
  const contentType = headers.get("content-type");

  return contentType?.toLowerCase().includes("application/json") ?? false;
};

const isRecord = (value: unknown): value is Record<string, unknown> => {
  return typeof value === "object" && value !== null && !Array.isArray(value);
};

const isStringArray = (value: unknown): value is string[] => {
  return Array.isArray(value) && value.every((item) => typeof item === "string");
};

const isValidationErrors = (value: unknown): value is Record<string, string[]> => {
  return isRecord(value) && Object.values(value).every(isStringArray);
};

const parseApiErrorPayload = (value: unknown): ApiErrorPayload | undefined => {
  if (!isRecord(value) || typeof value.error !== "string" || typeof value.message !== "string") {
    return undefined;
  }

  if ("errors" in value && isValidationErrors(value.errors)) {
    return {
      error: value.error,
      errors: value.errors,
      message: value.message,
    };
  }

  return {
    error: value.error,
    message: value.message,
  };
};

const parseJsonResponse = async (response: Response): Promise<unknown> => {
  if (response.status === 204) {
    return undefined;
  }

  const text = await response.text();

  if (!text) {
    return undefined;
  }

  try {
    return JSON.parse(text) as unknown;
  } catch {
    throw new ApiClientError({
      message: "API response contained malformed JSON.",
      status: response.status,
    });
  }
};

const createApiUrl = (path: string) => {
  const baseUrl = getApiBaseUrl();
  const normalizedPath = path.startsWith("/") ? path.slice(1) : path;
  const versionlessPath =
    normalizedPath === "v1" || normalizedPath.startsWith("v1/")
      ? normalizedPath.slice("v1".length).replace(/^\/+/, "")
      : normalizedPath;

  return new URL(versionlessPath, `${baseUrl}/`).toString();
};

export const apiRequest = async <TResponse>(
  path: string,
  options: ApiRequestOptions = {},
): Promise<TResponse> => {
  const response = await apiRequestWithMeta<TResponse>(path, options);

  return response.data;
};

export const apiRequestWithMeta = async <TResponse>(
  path: string,
  options: ApiRequestOptions = {},
): Promise<{ data: TResponse; headers: Headers }> => {
  const url = createApiUrl(path);
  const { authToken, body, headers: providedHeaders, json, ...requestOptions } = options;
  const headers = new Headers(providedHeaders);
  headers.set("Accept", "application/json");

  const requestInit: RequestInit = {
    ...requestOptions,
    headers,
  };

  if (authToken) {
    headers.set("Authorization", `Bearer ${authToken}`);
  }

  if (json !== undefined) {
    headers.set("Content-Type", "application/json");
    requestInit.body = JSON.stringify(json);
  } else if (body !== undefined) {
    requestInit.body = body;
  }

  let response: Response;

  try {
    response = await fetch(url, requestInit);
  } catch (e) {
    throw e;
  }

  const parsedBody = hasJsonContentType(response.headers)
    ? await parseJsonResponse(response)
    : undefined;

  if (!response.ok) {
    const payload = parseApiErrorPayload(parsedBody);

    throw new ApiClientError({
      message: payload?.message ?? `API request failed with status ${response.status}.`,
      payload,
      status: response.status,
    });
  }

  return {
    data: parsedBody as TResponse,
    headers: response.headers,
  };
};
