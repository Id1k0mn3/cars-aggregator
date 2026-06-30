export class EnvConfigError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "EnvConfigError";
  }
}

const trimTrailingSlash = (value: string) => value.replace(/\/+$/, "");

const getRequiredEnvValue = (name: string, value: string | undefined) => {
  if (value === undefined || value.trim() === "") {
    throw new EnvConfigError(`${name} is required.`);
  }

  return value;
};

const normalizeOriginEnvValue = (name: string, value: string) => {
  let url: URL;

  try {
    url = new URL(value);
  } catch {
    throw new EnvConfigError(`${name} must be a valid absolute URL.`);
  }

  if (url.pathname !== "/" || url.search !== "" || url.hash !== "") {
    throw new EnvConfigError(`${name} must contain only the URL origin, without paths, query, or hash.`);
  }

  return trimTrailingSlash(url.origin);
};

const getOptionalOriginEnvValue = (name: string, value: string | undefined) => {
  if (value === undefined || value.trim() === "") {
    return undefined;
  }

  return normalizeOriginEnvValue(name, value);
};

export const env = {
  apiUrl: normalizeOriginEnvValue(
    "NEXT_PUBLIC_API_URL",
    getRequiredEnvValue("NEXT_PUBLIC_API_URL", process.env.NEXT_PUBLIC_API_URL),
  ),
  siteUrl: getOptionalOriginEnvValue("NEXT_PUBLIC_SITE_URL", process.env.NEXT_PUBLIC_SITE_URL),
} as const;
