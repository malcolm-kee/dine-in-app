import { useQueueState } from 'lib/use-queue-state';
import {
  EventPayload,
  useRestaurantEvent,
} from 'modules/restaurant/use-restaurant-event';
import * as React from 'react';

export type SeatAvailableAnnouncementProps = {
  restaurant: string;
};

export const SeatAvailableAnnouncement = (
  props: SeatAvailableAnnouncementProps
) => {
  const [reservations, queue] = useQueueState<ReservationEventPayload>([], {
    reverse: true,
  });

  useRestaurantEvent(props.restaurant, {
    onMessage: msg => {
      if (msg.type === 'reservation_fulfilled') {
        queue(msg.payload);
      }
    },
  });

  const [first, ...rest] = reservations;

  return (
    <div>
      {first && (
        <div className="text-center mb-2">
          <p className="text-4xl">
            <strong>#{first.queueNum}</strong>
          </p>
          <p>goes to {first.tableNames.join(', ')}</p>
        </div>
      )}
      {rest.length ? (
        <ul className="grid grid-cols-3 gap-1">
          {rest.map(item => (
            <li className="text-center py-3 px-4 text-sm shadow" key={item.id}>
              # {item.queueNum} goes to {item.tableNames.join(', ')}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
};

type ReservationEventPayload = EventPayload['reservation_fulfilled'];
