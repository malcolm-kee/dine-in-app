import * as React from 'react';
import { UiStatus } from 'type/base-type';
import { fetchJson, RequestInitPlus } from './fetch-json';
import { useIsMounted } from './use-is-mounted';

export const useRemoteData = <DataType extends {}>(
  url: RequestInfo,
  init?: RequestInit
) => {
  const isMounted = useIsMounted();
  const [status, setStatus] = React.useState<UiStatus>('busy');
  const [data, setData] = React.useState<DataType | null>(null);
  const initRef = React.useRef(init);
  initRef.current = init;
  const requestRef = React.useRef(0);

  const makeCall = React.useCallback(
    (url: RequestInfo, initOverride: RequestInitPlus = {}) => {
      const currentRequest = ++requestRef.current;
      return fetchJson(url, { ...initRef.current, ...initOverride })
        .then(res => {
          if (isMounted.current && currentRequest === requestRef.current) {
            setData(res as DataType);
            setStatus('ok');
          }
        })
        .catch(err => {
          if (isMounted.current && currentRequest === requestRef.current) {
            setStatus('error');
          }
          throw err;
        });
    },
    [isMounted]
  );

  React.useEffect(() => {
    if (url) {
      makeCall(url).catch(console.error);
    }
  }, [url, makeCall]);

  return {
    data,
    status,
    refresh: () => makeCall(url),
    update: (newData: Partial<DataType>) => {
      if (data) {
        return makeCall(url, {
          method: 'PATCH',
          data: {
            ...data,
            ...newData,
          },
        });
      } else {
        return Promise.reject();
      }
    },
  };
};
