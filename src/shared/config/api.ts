import { env, EnvConfigError } from "./env";

const API_VERSION_PATH = "/v1";

export { EnvConfigError as ApiConfigError };

export const getApiOrigin = () => env.apiUrl;

export const getApiBaseUrl = () => `${env.apiUrl}${API_VERSION_PATH}`;
