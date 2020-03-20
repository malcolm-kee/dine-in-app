import { Button } from 'components/button';
import { TextField } from 'components/text-field';
import * as React from 'react';
import { Table, UiStatus } from 'type/base-type';

export type TableSettingFormProps = {
  initialForm?: Table;
  onSave: (tableData: Table) => Promise<unknown>;
};

export const TableSettingForm = (props: TableSettingFormProps) => {
  const isCreateForm = !props.initialForm;
  const [name, setName] = React.useState(
    props.initialForm ? props.initialForm.name : ''
  );
  const [seatNum, setSeatNum] = React.useState(
    props.initialForm ? String(props.initialForm.numberOfSeat) : ''
  );
  const [status, setStatus] = React.useState<UiStatus>('ok');

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
            if (isCreateForm) {
              setSeatNum('');
              setName('');
            }
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
      <Button type="submit" disabled={status === 'busy'}>
        {isCreateForm ? 'Add Table' : 'Edit Table'}
      </Button>
    </form>
  );
};
