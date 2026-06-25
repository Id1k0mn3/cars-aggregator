import type { ApiErrorPayload, ApiValidationErrorDto } from "./types";

type ApiClientErrorParams = {
  message: string;
  payload?: ApiErrorPayload;
  status?: number;
};

export class ApiClientError extends Error {
  readonly payload?: ApiErrorPayload;
  readonly status?: number;

  constructor({ message, payload, status }: ApiClientErrorParams) {
    super(message);
    this.name = "ApiClientError";
    this.payload = payload;
    this.status = status;
  }
}

export const isApiClientError = (error: unknown): error is ApiClientError => {
  return error instanceof ApiClientError;
};

export const isApiUnauthenticatedError = (error: unknown): error is ApiClientError => {
  return isApiClientError(error) && error.status === 401;
};

export const isApiValidationError = (
  error: unknown,
): error is ApiClientError & { payload: ApiValidationErrorDto; status: 422 } => {
  return (
    isApiClientError(error) &&
    error.status === 422 &&
    error.payload !== undefined &&
    "errors" in error.payload
  );
};
