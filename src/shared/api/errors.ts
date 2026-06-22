import type { ApiErrorPayload } from "./types";

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
