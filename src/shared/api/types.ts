export type ApiStatusCode = 200 | 201 | 204 | 401 | 403 | 404 | 405 | 409 | 422 | 429 | 503;

export type ApiErrorStatusCode = Exclude<ApiStatusCode, 200 | 201 | 204>;

export type JsonPrimitive = boolean | number | string | null;

export type JsonValue = JsonPrimitive | JsonValue[] | { [key: string]: JsonValue };

export type ApiErrorDto = {
  error: string;
  message: string;
};

export type ApiValidationErrorDto = ApiErrorDto & {
  errors: Record<string, string[]>;
};

export type ApiErrorPayload = ApiErrorDto | ApiValidationErrorDto;

export type ApiRequestOptions = Omit<RequestInit, "body" | "headers"> & {
  authToken?: string | null;
  headers?: HeadersInit;
  json?: JsonValue;
};
