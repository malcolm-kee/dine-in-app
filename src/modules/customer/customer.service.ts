import { createJsonRequest } from 'lib/create-json-request';
import { Restaurant } from 'type/base-type';
import { RequestSeatsResult } from './customer.type';

const customerApiUrl = process.env.REACT_APP_CUSTOMER_URL as string;

export const getDetails = (restaurantSlug: string) =>
  createJsonRequest<Restaurant>(`${customerApiUrl}/${restaurantSlug}`);

export const requestSeats = (restaurantSlug: string, pax: number) =>
  createJsonRequest<RequestSeatsResult>(`${customerApiUrl}/${restaurantSlug}`, {
    method: 'POST',
    body: JSON.stringify({
      pax,
    }),
  });
