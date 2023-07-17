const basePath = 'http://localhost';

export const sendGetRequest = async <T>(
  path: string,
  queryParams?: { [k: string]: string },
): Promise<T> => {
  const resp = await fetch(
    `${basePath}${path}${buildQueryParams(queryParams)}`,
  );
  const json = await resp.json();

  if (!resp.ok) throw new Error(json);

  return json;
};

const buildQueryParams = (params?: { [k: string]: string }): string => {
  if (!params) return '';

  const query = Object.keys(params)
    .map((key) => {
      return `${key}=${encodeURIComponent(params[key])}`;
    })
    .join('&');

  return '?' + query;
};
