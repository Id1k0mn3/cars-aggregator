import { getApiBaseUrl } from "@/src/shared/config";

export const resolveImageUrl = (imageUrl: string | null | undefined) => {
  if (!imageUrl) {
    return undefined;
  }

  try {
    if (imageUrl.startsWith("http://") || imageUrl.startsWith("https://")) {
      return new URL(imageUrl).toString();
    }

    return new URL(imageUrl, getApiBaseUrl()).toString();
  } catch {
    return undefined;
  }
};
