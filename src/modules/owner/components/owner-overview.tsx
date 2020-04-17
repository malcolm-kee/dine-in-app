import cx from 'classnames';
import { Button } from 'components/button';
import { CopyButton } from 'components/copy-button';
import { Dialog } from 'components/dialog';
import { Spinner } from 'components/spinner';
import { SeatAvailableAnnouncement } from 'modules/restaurant/components/seat-available-announcement';
import { useRestaurantEvent } from 'modules/restaurant/use-restaurant-event';
import * as React from 'react';
import { FaCheck, FaUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { getReceptionUrl } from 'routes';
import { Restaurant, Table, TableStatus, UiStatus } from 'type/base-type';
import { useWithAuthHeader } from '../owner.context';
import { getDetails, updateTableStatus } from '../owner.service';

export type OwnerOverviewProps = {
  restaurantSlug: string;
};

export const OwnerOverview = (props: OwnerOverviewProps) => {
  const [details, setRestaurant] = React.useState<Restaurant | null>(null);
  const [status, setStatus] = React.useState<UiStatus>('busy');
  const [errors, setErrors] = React.useState<string[]>([]);
  const getDetailsCall = useWithAuthHeader(getDetails);

  React.useEffect(() => {
    const { xhr, fetch } = getDetailsCall(props.restaurantSlug);
    fetch()
      .then((res) => {
        if (res.ok) {
          setRestaurant(res.data);
          setStatus('ok');
        } else {
          setStatus('error');
          setErrors(res.errors);
        }
      })
      .catch(() => {
        setStatus('error');
      });

    return () => xhr.abort();
  }, [props.restaurantSlug, getDetailsCall]);

  const updateTableStatus = (tableId: string, status: TableStatus) => {
    setRestaurant((prevDetails) =>
      prevDetails
        ? {
            ...prevDetails,
            tables: prevDetails.tables.map((t) =>
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
    onMessage: (msg) => {
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
      {errors.length > 0 && (
        <div>
          <li>
            {errors.map((err, i) => (
              <li key={i}>{err}</li>
            ))}
          </li>
        </div>
      )}
      {details && (
        <>
          <h1 className="text-2xl text-center mb-4">{details.name}</h1>
          <div className="lg:grid grid-cols-3 gap-6">
            <div className="col-span-2">
              <OwnerOverviewDisplay details={details} />
            </div>
            <SeatAvailableAnnouncement restaurant={props.restaurantSlug} />
          </div>
        </>
      )}
    </div>
  );
};

const OwnerOverviewDisplay = ({ details }: { details: Restaurant }) => {
  const receptionUrl =
    (window.location ? window.location.origin : '') +
    getReceptionUrl(details.slug);

  return (
    <>
      <div className="px-4 py-2 my-4 shadow bg-white">
        <h2 className="text-lg mb-2">Tables</h2>
        <ul className="grid grid-cols-3 sm:grid-cols-4">
          {details.tables.map((table) => (
            <li key={table._id} className="mb-2 p-2 m-1">
              <OwnerOverviewTable table={table} restaurant={details.slug} />
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

const OwnerOverviewTable = ({
  table,
  restaurant,
}: {
  table: Table;
  restaurant: string;
}) => {
  const [showConfirmation, setShowConfirmation] = React.useState(false);
  const [status, setStatus] = React.useState<UiStatus>('ok');
  const updateTableCall = useWithAuthHeader(updateTableStatus);

  const handleUpdate = () => {
    setStatus('busy');

    updateTableCall({
      restaurantSlug: restaurant,
      tableId: table._id,
      status: table.status === 'occupied' ? 'vacant' : 'occupied',
    })
      .then(() => {
        setShowConfirmation(false);
        setStatus('ok');
      })
      .catch(() => setStatus('error'));
  };

  const isBusy = status === 'busy';

  return (
    <>
      <div className="text-lg font-semibold flex justify-between items-center">
        {table.label}{' '}
        <small
          className={cx(
            'inline-block',
            table.status === 'occupied' ? 'text-red-800' : 'text-green-600'
          )}
        >
          {table.status === 'occupied' ? (
            <FaUser className="fill-current" />
          ) : (
            <FaCheck className="fill-current" />
          )}
          <span className="sr-only">{table.status}</span>
        </small>
      </div>
      <div>({table.numberOfSeat} seats)</div>
      <div className="mt-2">
        <Button
          onClick={() => setShowConfirmation(true)}
          className="w-full"
          size="small"
          disabled={isBusy}
        >
          {table.status === 'occupied' ? 'Release' : 'Use'}
        </Button>
      </div>
      <Dialog
        aria-label="Table update confirmation"
        isOpen={showConfirmation}
        onDismiss={() => setShowConfirmation(false)}
      >
        <p>
          {table.status === 'occupied'
            ? 'Are you sure the customer has left and want to make it available for others?'
            : 'Are you sure to make this table as occupied?'}
        </p>
        <div className="pt-2 flex justify-between">
          <Button onClick={handleUpdate} disabled={isBusy}>
            {isBusy ? 'Updating...' : 'Yes'}
          </Button>
          <Button
            onClick={() => setShowConfirmation(false)}
            disabled={isBusy}
            variant="none"
          >
            Cancel
          </Button>
        </div>
      </Dialog>
    </>
  );
};
