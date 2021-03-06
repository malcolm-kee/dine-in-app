import * as React from 'react';
import { Link } from 'react-router-dom';
import { RequestSeatsResult } from '../customer.type';
import { Button } from 'components/button';
import { getAnnoucementUrl } from 'routes';

export type RequestSeatsOutcomeProps = {
  result: RequestSeatsResult;
  restaurant: string;
  onRefresh: () => void;
};

export const RequestSeatsOutcome = ({
  result,
  restaurant,
  onRefresh,
}: RequestSeatsOutcomeProps) => {
  let content: React.ReactNode;

  if (!result.reservation && result.confirmedTables.length) {
    content = (
      <>
        <h1 data-testid="all-seated">
          Welcome! Please head to the following tables:
        </h1>
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
        <h1 data-testid="none-seated">We can't serve you right now.</h1>
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
        <h1 data-testid="some-seated" className="text-2xl">
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
      <div className="py-3 flex justify-between items-center">
        <Button onClick={onRefresh} autoFocus>
          Next Customer
        </Button>
        <Link to={getAnnoucementUrl(restaurant)}>View Updates</Link>
      </div>
    </div>
  );
};
