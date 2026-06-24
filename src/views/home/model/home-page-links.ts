export const createListingsHref = (query: Record<string, number | string> = {}) => {
  const searchParams = new URLSearchParams();

  Object.entries(query).forEach(([key, value]) => {
    searchParams.set(key, value.toString());
  });

  const queryString = searchParams.toString();

  return queryString ? `/vehicles?${queryString}` : "/vehicles";
};
