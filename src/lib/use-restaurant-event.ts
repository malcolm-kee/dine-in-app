import { useSocket, UseSocketOptions } from './use-socket';

const socketUrl = process.env.REACT_APP_WEBSOCKET_URL as string;

interface UseRestaurantEventOption extends UseSocketOptions {
  onMessage: (msg: Messages) => void;
}

export const useRestaurantEvent = (
  restaurant: string,
  options: UseRestaurantEventOption
) => useSocket(`${socketUrl}?restaurant=${restaurant}`, options);

/**
 * Copied from `dine-in` project
 */
type EventPayload = {
  setup_changed: {
    restaurant: string;
  };
  table_occupied: {
    restaurant: string;
    tableId: string;
  };
  table_vacant: {
    restaurant: string;
    tableId: string;
  };
  new_reservation: {
    restaurant: string;
    id: string;
    queueNum: number;
    pax: number;
  };
  reservation_fulfilled: {
    id: string;
    restaurant: string;
  };
};

type MapPayload<Key extends keyof EventPayload> = {
  type: Key;
  payload: EventPayload[Key];
};

type MessagesMap = {
  [key in keyof EventPayload]: MapPayload<key>;
};

type Messages = MessagesMap[keyof MessagesMap];
