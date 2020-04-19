import { Alert } from 'components/alert';
import { Button } from 'components/button';
import { TextField } from 'components/text-field';
import * as React from 'react';
import { FaCheck, FaTimes } from 'react-icons/fa';
import { Restaurant, UiStatus } from 'type/base-type';
import { register } from '../owner.service';

export type OwnerRegistrationProps = {
  onAccountCreated: (account: Restaurant) => void;
};

export const OwnerRegistration = (props: OwnerRegistrationProps) => {
  const [name, setName] = React.useState('');
  const [tableNum, setTableNum] = React.useState('');
  const [seatNum, setSeatNum] = React.useState('');
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const xhrRef = React.useRef<XMLHttpRequest | null>(null);
  const [status, setStatus] = React.useState<UiStatus>('ok');
  const [errors, setErrors] = React.useState<string[]>([]);

  React.useEffect(
    () => () => {
      xhrRef.current && xhrRef.current.abort();
    },
    []
  );

  const isBusy = status === 'busy';

  return (
    <form
      onSubmit={(ev) => {
        ev.preventDefault();
        if (password !== confirmPassword) {
          return;
        }
        setStatus('busy');
        const { xhr, fetch } = register({
          name,
          username,
          password,
          numOfTable: Number(tableNum),
          numberOfSeat: Number(seatNum),
        });

        xhrRef.current = xhr;

        fetch()
          .then((result) => {
            if (result.ok) {
              setStatus('ok');
              props.onAccountCreated(result.data);
            } else {
              setErrors(result.errors);
              setStatus('error');
            }
          })
          .catch(() => {
            setStatus('error');
            setErrors(['Unknown errors']);
          });
      }}
    >
      {errors.length > 0 && (
        <Alert variant="error">
          <ul>
            {errors.map((err, i) => (
              <li key={i}>{err}</li>
            ))}
          </ul>
        </Alert>
      )}
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
      <div className="pt-4 block">
        <fieldset>
          <legend className="w-full text-sm text-center">Login Details</legend>
          <TextField
            value={username}
            onChangeValue={setUsername}
            label="Username"
            required
          />
          <TextField
            value={password}
            onChangeValue={setPassword}
            type="password"
            label="Password"
            required
            minLength={8}
          />
          <TextField
            value={confirmPassword}
            onChangeValue={setConfirmPassword}
            type="password"
            label="Confirm Password"
            required
            helpText={
              confirmPassword &&
              (confirmPassword === password ? (
                <span className="flex items-center text-green-700">
                  Passwords match <FaCheck className="fill-current ml-2" />
                </span>
              ) : (
                <span className="flex items-center text-red-700">
                  Passwords does not match{' '}
                  <FaTimes className="fill-current ml-2" />
                </span>
              ))
            }
          />
        </fieldset>
      </div>
      <div className="py-3">
        <Button disabled={isBusy} type="submit" className="w-full">
          {isBusy ? 'Registering...' : 'Register'}
        </Button>
      </div>
    </form>
  );
};
