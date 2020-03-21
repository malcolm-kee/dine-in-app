import { fetchJson } from 'lib/fetch-json';
import { Restaurant } from 'type/base-type';
import { RequestSeatsResult } from './customer.type';

const customerApiUrl = process.env.REACT_APP_CUSTOMER_URL as string;

export const getDetails = (restaurantSlug: string) =>
  fetchJson(`${customerApiUrl}/${restaurantSlug}`) as Promise<Restaurant>;

export const requestSeats = (restaurantSlug: string, pax: number) =>
  fetchJson(`${customerApiUrl}/${restaurantSlug}`, {
    method: 'POST',
    data: {
      pax,
    },
  }) as Promise<RequestSeatsResult>;
