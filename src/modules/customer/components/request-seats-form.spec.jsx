import React from 'react';
import xhrMock from 'xhr-mock';
import { renderWithRouter, user } from 'lib/test-util';
import { RequestSeatsForm } from './request-seats-form';

describe(`<RequestSeatsForm />`, () => {
  beforeEach(() => xhrMock.setup());

  afterEach(() => xhrMock.teardown());

  test(`all requested seats are fulfilled`, async () => {
    const mockReservationResult = {
      confirmedTables: [
        {
          _id: '_id',
          label: 'T1',
          numberOfSeat: 5,
          status: 'vacant',
        },
      ],
      reservation: null,
    };

    mockReservationApi(mockReservationResult);

    const { getByLabelText, getByText, findByTestId } = renderWithRouter(
      <RequestSeatsForm restaurantSlug="mek-d" />
    );

    await user.type(getByLabelText('Pax'), '3');

    user.click(getByText('Get Seats'));

    const result = await findByTestId('all-seated');

    expect(result).toBeVisible();
  });

  test(`none of requested seats are fulfilled`, async () => {
    const mockReservationResult = {
      confirmedTables: [],
      reservation: {
        queueNum: 2,
        pax: 3,
      },
    };

    mockReservationApi(mockReservationResult);

    const { getByLabelText, getByText, findByTestId } = renderWithRouter(
      <RequestSeatsForm restaurantSlug="mek-d" />
    );

    await user.type(getByLabelText('Pax'), '3');

    user.click(getByText('Get Seats'));

    const result = await findByTestId('none-seated');

    expect(result).toBeVisible();
  });

  test(`some of requested seats are fulfilled`, async () => {
    const mockReservationResult = {
      confirmedTables: [
        {
          _id: '_id',
          label: 'T1',
          numberOfSeat: 5,
          status: 'vacant',
        },
      ],
      reservation: {
        queueNum: 2,
        pax: 3,
      },
    };

    mockReservationApi(mockReservationResult);

    const { getByLabelText, getByText, findByTestId } = renderWithRouter(
      <RequestSeatsForm restaurantSlug="mek-d" />
    );

    await user.type(getByLabelText('Pax'), '8');
    user.click(getByText('Get Seats'));

    const result = await findByTestId('some-seated');

    expect(result).toBeVisible();
  });
});

function mockReservationApi(reservationResult) {
  xhrMock.post(`${process.env.REACT_APP_CUSTOMER_URL}/mek-d`, {
    status: 201,
    body: JSON.stringify(reservationResult),
  });
}
