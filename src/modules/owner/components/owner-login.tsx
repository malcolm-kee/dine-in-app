import { Button } from 'components/button';
import { TextField } from 'components/text-field';
import * as React from 'react';
import { OwnerAuthDispatchContext } from '../owner.context';
import { ownerLogin } from '../owner.service';
import { UiStatus } from 'type/base-type';
import { noop } from 'lib/fp';

export type OwnerLoginProps = {
  onSuccess?: () => void;
};

export const OwnerLogin = ({ onSuccess = noop }: OwnerLoginProps) => {
  const dispatch = React.useContext(OwnerAuthDispatchContext);
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [status, setStatus] = React.useState<UiStatus>('ok');

  return (
    <form
      onSubmit={(ev) => {
        ev.preventDefault();
        setStatus('busy');
        ownerLogin(username, password)
          .then((res) => {
            dispatch({
              type: 'login',
              accessToken: res.access_token,
            });
            setStatus('ok');
            onSuccess();
          })
          .catch(() => setStatus('error'));
      }}
    >
      <TextField
        label="Username"
        value={username}
        onChangeValue={setUsername}
        required
        disabled={status === 'busy'}
      />
      <TextField
        label="Password"
        type="password"
        value={password}
        onChangeValue={setPassword}
        required
        disabled={status === 'busy'}
      />
      <div className="py-3">
        <Button type="submit" disabled={status === 'busy'} className="w-full">
          Login
        </Button>
      </div>
    </form>
  );
};
