import fetch from 'unfetch';

export type RequestInitPlus = Omit<RequestInit, 'headers' | 'credentials'> & {
  data?: object;
  headers?: Record<string, string>;
  credentials?: 'include' | 'omit';
};

export const fetchJson = (
  url: string,
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
