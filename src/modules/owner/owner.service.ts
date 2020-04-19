import { createEmptyArray } from 'lib/array';
import { fetchJson } from 'lib/fetch-json';
import { createJsonRequest } from 'lib/create-json-request';
import { RequestOptions, Restaurant, TableStatus } from 'type/base-type';

const ownerApiUrl = process.env.REACT_APP_OWNER_URL as string;

export type RegisterOwnerData = {
  name: string;
  numOfTable: number;
  numberOfSeat: number;
  username: string;
  password: string;
};

export const register = ({
  name,
  username,
  password,
  numOfTable,
  numberOfSeat,
}: RegisterOwnerData) =>
  createJsonRequest<Restaurant>(ownerApiUrl, {
    method: 'POST',
    data: {
      name,
      username,
      password,
      tables: createEmptyArray(numOfTable).map((_, index) => ({
        label: `T${index + 1}`,
        numberOfSeat,
      })),
    },
  });

export const ownerLogin = (username: string, password: string) =>
  fetchJson(ownerApiUrl + '/login', {
    method: 'POST',
    data: {
      username,
      password,
    },
  }) as Promise<{ access_token: string }>;

export const getOwnedRestaurants = (options: RequestOptions) =>
  createJsonRequest<Restaurant[]>(ownerApiUrl + '/restaurants', options);

export const getDetails = (options: RequestOptions, restaurantSlug: string) =>
  createJsonRequest<Restaurant>(
    `${ownerApiUrl}/setting/${restaurantSlug}`,
    options
  );

export type UpdateTableData = {
  restaurantSlug: string;
  tableId: string;
  status: TableStatus;
};

export const updateTableStatus = (
  options: RequestOptions,
  data: UpdateTableData
) =>
  fetchJson(`${ownerApiUrl}/table/${data.restaurantSlug}`, {
    ...options,
    method: 'PUT',
    data: {
      tableId: data.tableId,
      status: data.status,
    },
  }) as Promise<Restaurant>;
