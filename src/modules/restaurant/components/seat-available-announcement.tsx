import { SelectField } from 'components/select-field';
import { useQueueState } from 'lib/use-queue-state';
import { useVoice } from 'lib/use-voice';
import {
  EventPayload,
  useRestaurantEvent,
} from 'modules/restaurant/use-restaurant-event';
import * as React from 'react';

export type SeatAvailableAnnouncementProps = {
  restaurant: string;
  hasVoice?: boolean;
};

export const SeatAvailableAnnouncement = (
  props: SeatAvailableAnnouncementProps
) => {
  const [reservations, queue] = useQueueState<ReservationEventPayload>([], {
    reverse: true,
  });
  const [voiceUri, setVoiceUri] = React.useState('');

  const { speak, voices } = useVoice();

  useRestaurantEvent(props.restaurant, {
    onMessage: (msg) => {
      if (msg.type === 'reservation_fulfilled') {
        queue(msg.payload);
        if (props.hasVoice && voiceUri) {
          const voice = voices.find((v) => v.voiceURI === voiceUri);
          if (voice) {
            speak(voiceUri, getAnnoucementMessage(voice.lang, msg.payload));
          }
        }
      }
    },
  });

  const supportedVoices = React.useMemo(
    () =>
      voices.filter(
        (voice) => voice.lang.startsWith('zh') || voice.lang.startsWith('en')
      ),
    [voices]
  );

  const [first, ...rest] = reservations;

  return (
    <div>
      {props.hasVoice && supportedVoices.length > 0 && (
        <SelectField
          label="Announcement Voice"
          value={voiceUri}
          onChangeValue={(lang) => setVoiceUri(lang)}
          id="lang"
        >
          <option value="">None</option>
          {supportedVoices.map((voice, index) => (
            <option value={voice.voiceURI} key={index}>
              {voice.name}
            </option>
          ))}
        </SelectField>
      )}
      {first && (
        <div className="text-center mb-2">
          <p className="text-4xl">
            <strong>#{first.queueNum}</strong>
          </p>
          <p>goes to {first.tableNames.join(', ')}</p>
        </div>
      )}
      {rest.length ? (
        <ul className="grid md:grid-cols-3 gap-1">
          {rest.map((item) => (
            <li
              className="text-center py-3 px-4 text-sm bg-white shadow"
              key={item.id}
            >
              # {item.queueNum} goes to {item.tableNames.join(', ')}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
};

type ReservationEventPayload = EventPayload['reservation_fulfilled'];

function getAnnoucementMessage(lang: string, payload: ReservationEventPayload) {
  if (lang.indexOf('en-') > -1) {
    return `Number ${payload.queueNum} go to tables ${payload.tableNames.join(
      ', '
    )}.`;
  } else {
    return `${payload.queueNum}号请前往座位号码${payload.tableNames.join(
      '、'
    )}`;
  }
}
