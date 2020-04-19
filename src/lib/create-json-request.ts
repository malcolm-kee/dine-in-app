import { createRequest, SimpleResponse } from 'xhfetch';

export type JsonResponse<ResponseType> =
  | {
      ok: true;
      data: ResponseType;
    }
  | {
      ok: false;
      errors: string[];
    };

export type RequestOptions = RequestInit & {
  data?: any;
};

export const createJsonRequest = <ResponseType>(
  url: string,
  { headers, data, body, ...options }: RequestOptions = {}
) => {
  const additionalHeaders: Record<string, string> =
    options.method && options.method.toLowerCase() !== 'get'
      ? {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }
      : {
          Accept: 'application/json',
        };

  const { xhr, fetch } = createRequest(url, {
    ...options,
    body: body ? body : data && JSON.stringify(data),
    headers: {
      ...additionalHeaders,
      ...headers,
    },
  });

  const initFetch = (): Promise<JsonResponse<ResponseType>> =>
    fetch()
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw res;
      })
      .then(
        (data: ResponseType) =>
          ({
            data,
            ok: true,
          } as const)
      )
      .catch((errorRes: SimpleResponse) =>
        errorRes
          .json()
          .then((res) => {
            if ('message' in res && Array.isArray(res.message)) {
              // the response has error message from api
              return res.message as string[];
            }
            throw res;
          })
          .then((msgs) => ({
            ok: false,
            errors: msgs,
          }))
      );

  return {
    xhr,
    fetch: initFetch,
  };
};
