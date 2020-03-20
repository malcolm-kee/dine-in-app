import { Spinner } from 'components/spinner';
import * as React from 'react';
import { useSetting } from '../services/setting.service';
import { TableSettingForm } from './table-setting-form';
import { Table } from 'type/base-type';
import { Button } from 'components/button';

export const SettingEditor = () => {
  const { status, data, update } = useSetting();

  const [focused, setFocused] = React.useState<Table | null>(null);

  return (
    <div className="px-4 py-3 shadow-lg rounded">
      {status === 'busy' && <Spinner />}
      {data && (
        <>
          <h2 className="text-xl mb-2">Tables</h2>
          <ul className="py-2">
            {data.tables.map((table, i) => (
              <li key={i} className="flex px-4 justify-between mb-2">
                <span>{table.name}</span>
                <span>({table.numberOfSeat} seats)</span>
                <Button onClick={() => setFocused(table)}>Edit</Button>
              </li>
            ))}
          </ul>
          <TableSettingForm
            onSave={newTable =>
              update({
                tables: focused
                  ? data.tables.map(table =>
                      table === focused ? newTable : table
                    )
                  : data.tables.concat(newTable),
              })
            }
            focused={focused}
            onCancel={() => setFocused(null)}
          />
        </>
      )}
    </div>
  );
};
