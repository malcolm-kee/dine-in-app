import { Button } from 'components/button';
import { TextField } from 'components/text-field';
import * as React from 'react';
import { UiStatus } from 'type/base-type';
import { requestSeats } from '../customer.service';
import { RequestSeatsResult } from '../customer.type';
import { RequestSeatsOutcome } from './request-seats-outcome';

export type RequestSeatsFormProps = {
  restaurantSlug: string;
};

export const RequestSeatsForm = (props: RequestSeatsFormProps) => {
  const [pax, setPax] = React.useState('');
  const [status, setStatus] = React.useState<UiStatus>('ok');
  const xhrRef = React.useRef<XMLHttpRequest | null>(null);
  const [result, setResult] = React.useState<RequestSeatsResult | null>(null);

  React.useEffect(
    () => () => {
      xhrRef.current && xhrRef.current.abort();
    },
    []
  );

  return result ? (
    <RequestSeatsOutcome
      result={result}
      restaurant={props.restaurantSlug}
      onRefresh={() => {
        setResult(null);
        setPax('');
      }}
    />
  ) : (
    <form
      onSubmit={(ev) => {
        ev.preventDefault();
        const { xhr, fetch } = requestSeats(props.restaurantSlug, Number(pax));
        xhrRef.current = xhr;

        fetch()
          .then((response) => {
            if (response.ok) {
              setStatus('ok');
              setResult(response.data);
            } else {
              setStatus('error');
            }
          })
          .catch(() => {
            setStatus('error');
          });
      }}
    >
      <TextField
        value={pax}
        onChangeValue={setPax}
        type="number"
        min="1"
        step="1"
        label="Pax"
        required
        disabled={status === 'busy'}
        autoFocus
      />
      <div className="py-3">
        <Button type="submit" className="w-full" disabled={status === 'busy'}>
          Get Seats
        </Button>
      </div>
    </form>
  );
};
