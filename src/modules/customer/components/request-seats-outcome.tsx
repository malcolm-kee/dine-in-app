import * as React from 'react';
import { RequestSeatsResult } from '../customer.type';

export type RequestSeatsOutcomeProps = {
  result: RequestSeatsResult;
};

export const RequestSeatsOutcome = ({ result }: RequestSeatsOutcomeProps) => {
  if (!result.reservation && result.confirmedTables.length) {
    return (
      <div className="text-center">
        <h1>Welcome! Please head to the following tables:</h1>
        <ul>
          {result.confirmedTables.map((t, i) => (
            <li key={i}>{t.label}</li>
          ))}
        </ul>
      </div>
    );
  }

  if (result.reservation && !result.confirmedTables.length) {
    return (
      <div className="text-center">
        <h1>We can't serve you right now.</h1>
        <div className="my-3 px-4 py-2 shadow rounded bg-white">
          <p>Your Queue Number:</p>
          <p className="text-2xl">#{result.reservation.queueNum}</p>
          <p>({result.reservation.pax} pax)</p>
        </div>
      </div>
    );
  }

  if (result.reservation && result.confirmedTables.length) {
    const paxCanBeSeated = result.confirmedTables.reduce(
      (total, table) => total + table.numberOfSeat,
      0
    );

    return (
      <div className="text-center">
        <h1 className="text-2xl">
          We manage to get seat for <strong>some of you</strong>.
        </h1>
        <div className="my-4">
          <p>
            For {paxCanBeSeated} of you, please head to the following tables:
          </p>
          <ul>
            {result.confirmedTables.map((t, i) => (
              <li key={i}>{t.label}</li>
            ))}
          </ul>
        </div>
        <p>
          For the remaining {result.reservation.pax} persons, please use the
          following details to be notified
        </p>
        <p>Your Queue Number:</p>
        <p className="text-2xl">#{result.reservation.queueNum}</p>
        <p>({result.reservation.pax} pax)</p>
      </div>
    );
  }

  throw new Error('Impossible State');
};
