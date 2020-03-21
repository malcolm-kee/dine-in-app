import { CopyButton } from 'components/copy-button';
import { Spinner } from 'components/spinner';
import { useRestaurantEvent } from 'lib/use-restaurant-event';
import * as React from 'react';
import { Link } from 'react-router-dom';
import { getReceptionUrl } from 'routes';
import { Restaurant, UiStatus, TableStatus } from 'type/base-type';
import { getDetails } from '../owner.service';

export type OwnerOverviewProps = {
  restaurantSlug: string;
};

export const OwnerOverview = (props: OwnerOverviewProps) => {
  const [details, setDetails] = React.useState<Restaurant | null>(null);
  const [status, setStatus] = React.useState<UiStatus>('busy');

  React.useEffect(() => {
    let isCurrent = true;
    getDetails(props.restaurantSlug)
      .then(res => {
        if (isCurrent) {
          setDetails(res);
          setStatus('ok');
        }
      })
      .catch(() => {
        if (isCurrent) {
          setStatus('error');
        }
      });

    return () => {
      isCurrent = false;
    };
  }, [props.restaurantSlug]);

  const updateTableStatus = (tableId: string, status: TableStatus) => {
    setDetails(prevDetails =>
      prevDetails
        ? {
            ...prevDetails,
            tables: prevDetails.tables.map(t =>
              t._id === tableId
                ? {
                    ...t,
                    status,
                  }
                : t
            ),
          }
        : prevDetails
    );
  };

  useRestaurantEvent(props.restaurantSlug, {
    onMessage: msg => {
      if (msg.type === 'table_occupied') {
        updateTableStatus(msg.payload.tableId, 'occupied');
      } else if (msg.type === 'table_vacant') {
        updateTableStatus(msg.payload.tableId, 'vacant');
      }
    },
  });

  return (
    <div>
      {status === 'busy' && <Spinner />}
      {details && <OwnerOverviewDisplay details={details} />}
    </div>
  );
};

const OwnerOverviewDisplay = ({ details }: { details: Restaurant }) => {
  const receptionUrl =
    (window.location ? window.location.origin : '') +
    getReceptionUrl(details.slug);

  return (
    <>
      <h1 className="text-2xl text-center mb-4">{details.name}</h1>
      <div className="px-4 py-2 my-4 shadow bg-white">
        <h2 className="text-lg mb-2">Tables</h2>
        <ul className="grid grid-cols-3 sm:grid-cols-5">
          {details.tables.map(table => (
            <li key={table._id} className="mb-2 p-2 m-1">
              <div className="text-lg font-semibold">
                {table.label} <small>{table.status}</small>
              </div>
              <div>({table.numberOfSeat} seats)</div>
            </li>
          ))}
        </ul>
      </div>
      <div className="y-4 text-right">
        <p>Use the following link to allow your customers to get seats:</p>
        <p>
          <code>{receptionUrl}</code>
        </p>
        <div className="py-2">
          <CopyButton contentToCopy={receptionUrl}>Copy Link</CopyButton>
          <Link
            to={getReceptionUrl(details.slug)}
            className="text-teal-600 inline-block mx-2"
          >
            Visit Link
          </Link>
        </div>
      </div>
    </>
  );
};
