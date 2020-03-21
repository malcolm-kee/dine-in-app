import * as React from 'react';
import { UiStatus } from 'type/base-type';
import { useLatest } from './use-latest';

export type UseSocketOptions = {
  onMessage: (data: any) => void;
  onOpen?: (ev: Event) => void;
  onError?: (ev: Event) => void;
};

export const useSocket = (
  endpoint: string,
  { onMessage, onOpen, onError }: UseSocketOptions
) => {
  const [status, setStatus] = React.useState<UiStatus>('busy');
  const onMessageRef = useLatest(onMessage);
  const onOpenRef = useLatest(onOpen);
  const onErrorRef = useLatest(onError);
  const wsRef = React.useRef<WebSocket | null>(null);
  React.useEffect(() => {
    setStatus('busy');
    const ws = new WebSocket(endpoint);
    wsRef.current = ws;
    function onSocketOpen(ev: Event) {
      setStatus('ok');
      if (onOpenRef.current) {
        onOpenRef.current(ev);
      }
    }
    function onSocketError(ev: Event) {
      setStatus('error');
      if (onErrorRef.current) {
        onErrorRef.current(ev);
      }
    }
    function onSocketMessage(event: MessageEvent) {
      const data = JSON.parse(event.data);
      onMessageRef.current(data);
    }
    ws.addEventListener('open', onSocketOpen);
    ws.addEventListener('error', onSocketError);
    ws.addEventListener('message', onSocketMessage);

    return () => {
      ws.removeEventListener('open', onSocketOpen);
      ws.removeEventListener('error', onSocketError);
      ws.removeEventListener('message', onSocketMessage);

      ws.close();
    };
  }, [endpoint, onMessageRef, onOpenRef, onErrorRef]);

  const send = React.useCallback(function sendMessage(data: any) {
    if (wsRef.current) {
      wsRef.current.send(JSON.stringify(data));
    }
  }, []);

  return [status, send] as const;
};
