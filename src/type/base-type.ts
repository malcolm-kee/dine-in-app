/**
 * These are the base types that others are depends on.
 * It shouldn't have any dependencies to other local modules.
 */

export type UiStatus = 'ok' | 'busy' | 'error';

export type Table = {
  name: string;
  numberOfSeat: number;
};
