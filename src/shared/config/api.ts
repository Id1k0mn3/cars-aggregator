export class ApiConfigError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ApiConfigError";
  }
}

const DEFAULT_API_BASE_URL = "http://localhost:8000/v1";

const trimTrailingSlash = (value: string) => value.replace(/\/+$/, "");

export const getApiBaseUrl = () => {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL ?? DEFAULT_API_BASE_URL;

  try {
    return trimTrailingSlash(new URL(apiBaseUrl).toString());
  } catch {
    throw new ApiConfigError("NEXT_PUBLIC_API_BASE_URL must be a valid absolute URL.");
  }
};
