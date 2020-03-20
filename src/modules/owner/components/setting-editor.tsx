import { Spinner } from 'components/spinner';
import * as React from 'react';
import { useSetting } from '../services/setting.service';
import { TableSettingForm } from './table-setting-form';

export const SettingEditor = () => {
  const { status, data, update } = useSetting();

  return (
    <div>
      {status === 'busy' && <Spinner />}
      {data && (
        <>
          <ul>
            {data.tables.map((table, i) => (
              <li key={i}>
                {table.name} ({table.numberOfSeat} seats)
              </li>
            ))}
          </ul>
          <TableSettingForm
            onSave={newTable =>
              update({
                tables: data.tables.concat(newTable),
              })
            }
          />
        </>
      )}
    </div>
  );
};
