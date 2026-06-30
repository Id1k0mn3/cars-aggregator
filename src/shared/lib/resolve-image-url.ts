import { getApiOrigin } from "@/src/shared/config";

const LOCAL_HOSTNAMES = new Set(["localhost", "127.0.0.1"]);

const shouldUseApiOrigin = (imageUrl: URL, apiBaseUrl: URL) => {
  return (
    LOCAL_HOSTNAMES.has(imageUrl.hostname) &&
    LOCAL_HOSTNAMES.has(apiBaseUrl.hostname) &&
    imageUrl.port === "" &&
    apiBaseUrl.port !== ""
  );
};

export const resolveImageUrl = (imageUrl: string | null | undefined) => {
  if (!imageUrl) {
    return undefined;
  }

  try {
    const apiBaseUrl = new URL(getApiOrigin());

    if (imageUrl.startsWith("http://") || imageUrl.startsWith("https://")) {
      const parsedImageUrl = new URL(imageUrl);

      if (shouldUseApiOrigin(parsedImageUrl, apiBaseUrl)) {
        parsedImageUrl.protocol = apiBaseUrl.protocol;
        parsedImageUrl.hostname = apiBaseUrl.hostname;
        parsedImageUrl.port = apiBaseUrl.port;
      }

      return parsedImageUrl.toString();
    }

    return new URL(imageUrl, apiBaseUrl).toString();
  } catch {
    return undefined;
  }
};
