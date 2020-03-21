import { Table } from 'type/base-type';

export type Reservation = {
  queueNum: number;
  pax: number;
};

export type RequestSeatsResult = {
  confirmedTables: Table[];
  reservation: Reservation | null;
};
