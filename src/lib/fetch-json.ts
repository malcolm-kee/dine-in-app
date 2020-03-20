import fetch from 'unfetch';

export type RequestInitPlus = RequestInit & {
  data?: object;
};

export const fetchJson = (
  url: RequestInfo,
  { headers, data, ...init }: RequestInitPlus = {}
): Promise<unknown> =>
  fetch(url, {
    headers: {
      ...(init.method && init.method !== 'GET'
        ? {
            'Content-Type': 'application/json',
          }
        : {}),
      Accept: 'application/json',
      ...headers,
    },
    ...(data ? { body: JSON.stringify(data) } : {}),
    ...init,
  }).then(res => {
    if (res.ok) {
      return res.json();
    }
    throw new Error('fetchJson fails');
  });
