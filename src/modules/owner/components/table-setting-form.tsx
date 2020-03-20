import { Button } from 'components/button';
import { TextField } from 'components/text-field';
import * as React from 'react';
import { Table, UiStatus } from 'type/base-type';

export type TableSettingFormProps = {
  focused: Table | null;
  onSave: (tableData: Table) => Promise<unknown>;
  onCancel: () => void;
};

export const TableSettingForm = (props: TableSettingFormProps) => {
  const isCreateForm = !props.focused;
  const [name, setName] = React.useState(
    props.focused ? props.focused.name : ''
  );
  const [seatNum, setSeatNum] = React.useState(
    props.focused ? String(props.focused.numberOfSeat) : ''
  );
  const [status, setStatus] = React.useState<UiStatus>('ok');

  React.useEffect(() => {
    if (props.focused) {
      setName(props.focused.name);
      setSeatNum(String(props.focused.numberOfSeat));
    }
  }, [props.focused]);

  const resetState = () => {
    setName('');
    setSeatNum('');
    props.onCancel();
  };

  return (
    <form
      onSubmit={ev => {
        ev.preventDefault();
        setStatus('busy');
        props
          .onSave({
            name,
            numberOfSeat: Number(seatNum),
          })
          .then(() => {
            setStatus('ok');
            resetState();
          });
      }}
    >
      <TextField
        label="Table Name"
        value={name}
        onChangeValue={setName}
        required
        disabled={status === 'busy'}
      />
      <TextField
        label="Number of seat"
        value={seatNum}
        onChangeValue={setSeatNum}
        type="number"
        required
        disabled={status === 'busy'}
      />
      <div className="py-4 flex justify-between">
        <Button type="submit" disabled={status === 'busy'}>
          {isCreateForm ? 'Add Table' : 'Save Table'}
        </Button>
        <Button type="reset" variant="none" onClick={resetState}>
          Cancel
        </Button>
      </div>
    </form>
  );
};
