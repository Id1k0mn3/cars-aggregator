import { getApiOrigin } from "@/src/shared/config";

const BACKEND_IMAGE_PROXY_PREFIX = "/backend";
const PROXIED_BACKEND_HOSTNAME = "167.99.241.255";
const LOCAL_HOSTNAMES = new Set(["localhost", "127.0.0.1"]);

const createProxyPath = (imageUrl: URL) => {
  return `${BACKEND_IMAGE_PROXY_PREFIX}${imageUrl.pathname}${imageUrl.search}${imageUrl.hash}`;
};

const shouldUseApiOrigin = (imageUrl: URL, apiOrigin: URL) => {
  return (
    LOCAL_HOSTNAMES.has(imageUrl.hostname) &&
    LOCAL_HOSTNAMES.has(apiOrigin.hostname) &&
    imageUrl.port === "" &&
    apiOrigin.port !== ""
  );
};

export const resolveImageUrl = (imageUrl: string | null | undefined) => {
  if (!imageUrl) {
    return undefined;
  }

  try {
    if (imageUrl.startsWith("/") && !imageUrl.startsWith("//")) {
      return imageUrl;
    }

    const apiOrigin = new URL(getApiOrigin());

    if (imageUrl.startsWith("http://") || imageUrl.startsWith("https://")) {
      const parsedImageUrl = new URL(imageUrl);

      if (parsedImageUrl.protocol === "http:" && parsedImageUrl.hostname === PROXIED_BACKEND_HOSTNAME) {
        return createProxyPath(parsedImageUrl);
      }

      if (shouldUseApiOrigin(parsedImageUrl, apiOrigin)) {
        parsedImageUrl.protocol = apiOrigin.protocol;
        parsedImageUrl.hostname = apiOrigin.hostname;
        parsedImageUrl.port = apiOrigin.port;
      }

      return parsedImageUrl.toString();
    }

    return createProxyPath(new URL(imageUrl, apiOrigin));
  } catch {
    return undefined;
  }
};
