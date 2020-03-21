import { Button } from 'components/button';
import { TextField } from 'components/text-field';
import { useIsMounted } from 'lib/use-is-mounted';
import * as React from 'react';
import { Restaurant, UiStatus } from 'type/base-type';
import { register } from '../owner.service';

export type OwnerRegistrationProps = {
  onAccountCreated: (account: Restaurant) => void;
};

export const OwnerRegistration = (props: OwnerRegistrationProps) => {
  const [name, setName] = React.useState('');
  const [tableNum, setTableNum] = React.useState('');
  const [seatNum, setSeatNum] = React.useState('');
  const isMounted = useIsMounted();
  const [status, setStatus] = React.useState<UiStatus>('ok');

  const isBusy = status === 'busy';

  return (
    <form
      onSubmit={ev => {
        ev.preventDefault();
        setStatus('busy');
        register(name, Number(tableNum), Number(seatNum))
          .then(result => {
            if (isMounted.current) {
              setStatus('ok');
              props.onAccountCreated(result);
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
        value={name}
        onChangeValue={setName}
        label="Business Name"
        required
        disabled={isBusy}
      />
      <TextField
        value={tableNum}
        onChangeValue={setTableNum}
        label="Number of tables"
        type="number"
        min="1"
        step="1"
        required
        disabled={isBusy}
      />
      <TextField
        value={seatNum}
        onChangeValue={setSeatNum}
        label="Number of seats per table"
        type="number"
        min="1"
        step="1"
        required
        disabled={isBusy}
      />
      <div className="py-3">
        <Button disabled={isBusy} type="submit" className="w-full">
          {isBusy ? 'Registering...' : 'Register'}
        </Button>
      </div>
    </form>
  );
};
