import { createEmptyArray } from 'lib/array';
import { fetchJson } from 'lib/fetch-json';
import { Restaurant } from 'type/base-type';

const ownerApiUrl = process.env.REACT_APP_OWNER_URL as string;

export const register = (
  name: string,
  numOfTable: number,
  numberOfSeat: number
) =>
  fetchJson(ownerApiUrl, {
    method: 'POST',
    data: {
      name,
      tables: createEmptyArray(numOfTable).map((_, index) => ({
        label: `T${index + 1}`,
        numberOfSeat,
      })),
    },
  }) as Promise<Restaurant>;

export const getDetails = (restaurantSlug: string) =>
  fetchJson(`${ownerApiUrl}/${restaurantSlug}`) as Promise<Restaurant>;
