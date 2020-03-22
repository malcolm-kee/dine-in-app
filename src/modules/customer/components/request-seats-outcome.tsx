import * as React from 'react';
import { RequestSeatsResult } from '../customer.type';
import { Button } from 'components/button';

export type RequestSeatsOutcomeProps = {
  result: RequestSeatsResult;
  onRefresh: () => void;
};

export const RequestSeatsOutcome = ({
  result,
  onRefresh,
}: RequestSeatsOutcomeProps) => {
  let content: React.ReactNode;

  if (!result.reservation && result.confirmedTables.length) {
    content = (
      <>
        <h1>Welcome! Please head to the following tables:</h1>
        <ul>
          {result.confirmedTables.map((t, i) => (
            <li key={i}>{t.label}</li>
          ))}
        </ul>
      </>
    );
  }

  if (result.reservation && !result.confirmedTables.length) {
    content = (
      <>
        <h1>We can't serve you right now.</h1>
        <div className="my-3 px-4 py-2 shadow rounded bg-white">
          <p>Your Queue Number:</p>
          <p className="text-2xl">#{result.reservation.queueNum}</p>
          <p>({result.reservation.pax} pax)</p>
        </div>
      </>
    );
  }

  if (result.reservation && result.confirmedTables.length) {
    const paxCanBeSeated = result.confirmedTables.reduce(
      (total, table) => total + table.numberOfSeat,
      0
    );

    content = (
      <>
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
      </>
    );
  }

  return (
    <div className="text-center">
      {content}
      <div className="py-3">
        <Button onClick={onRefresh}>Next Customer</Button>
      </div>
    </div>
  );
};
