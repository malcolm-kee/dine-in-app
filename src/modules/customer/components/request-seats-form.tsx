import { Button } from 'components/button';
import { TextField } from 'components/text-field';
import { useIsMounted } from 'lib/use-is-mounted';
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
  const isMounted = useIsMounted();
  const [result, setResult] = React.useState<RequestSeatsResult | null>(null);

  return result ? (
    <RequestSeatsOutcome result={result} />
  ) : (
    <form
      onSubmit={ev => {
        ev.preventDefault();
        requestSeats(props.restaurantSlug, Number(pax))
          .then(response => {
            if (isMounted.current) {
              setStatus('ok');
              setResult(response);
            }
          })
          .catch(() => {
            if (isMounted.current) {
              setStatus('error');
            }
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
      />
      <div className="py-3">
        <Button type="submit" className="w-full" disabled={status === 'busy'}>
          Get Seats
        </Button>
      </div>
    </form>
  );
};
