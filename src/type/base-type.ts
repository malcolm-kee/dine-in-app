/**
 * These are the base types that others are depends on.
 * It shouldn't have any dependencies to other local modules.
 */

export type UiStatus = 'ok' | 'busy' | 'error';

export type Table = {
  label: string;
  numberOfSeat: number;
};

export type Restaurant = {
  name: string;
  tables: Array<Table>;
  slug: string;
};
