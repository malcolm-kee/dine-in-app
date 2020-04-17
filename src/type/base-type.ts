/**
 * These are the base types that others are depends on.
 * It shouldn't have any dependencies to other local modules.
 */

export type UiStatus = 'ok' | 'busy' | 'error';

export type TableStatus = 'occupied' | 'vacant';

export type Table = {
  _id: string;
  label: string;
  numberOfSeat: number;
  status: TableStatus;
};

export type Restaurant = {
  name: string;
  tables: Array<Table>;
  slug: string;
};

export type RequestOptions = {
  headers: {
    [key: string]: string;
  };
};
