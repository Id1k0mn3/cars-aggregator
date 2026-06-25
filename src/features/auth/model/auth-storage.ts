const AUTH_TOKEN_STORAGE_KEY = "cars-aggregator.auth-token";

const canUseLocalStorage = () => {
  return typeof window !== "undefined" && "localStorage" in window;
};

export const getAuthToken = () => {
  if (!canUseLocalStorage()) {
    return null;
  }

  try {
    return window.localStorage.getItem(AUTH_TOKEN_STORAGE_KEY);
  } catch {
    return null;
  }
};

export const setAuthToken = (token: string) => {
  if (!canUseLocalStorage()) {
    return;
  }

  try {
    window.localStorage.setItem(AUTH_TOKEN_STORAGE_KEY, token);
  } catch {
    return;
  }
};

export const removeAuthToken = () => {
  if (!canUseLocalStorage()) {
    return;
  }

  try {
    window.localStorage.removeItem(AUTH_TOKEN_STORAGE_KEY);
  } catch {
    return;
  }
};
