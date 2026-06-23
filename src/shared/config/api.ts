export class ApiConfigError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ApiConfigError";
  }
}

const trimTrailingSlash = (value: string) => value.replace(/\/+$/, "");

export const getApiBaseUrl = () => {
  const apiBaseUrl = process.env.API_BASE_URL ?? process.env.NEXT_PUBLIC_API_BASE_URL;

  if (!apiBaseUrl) {
    throw new ApiConfigError("API_BASE_URL or NEXT_PUBLIC_API_BASE_URL is not configured.");
  }

  try {
    return trimTrailingSlash(new URL(apiBaseUrl).toString());
  } catch {
    throw new ApiConfigError("NEXT_PUBLIC_API_BASE_URL must be a valid absolute URL.");
  }
};
