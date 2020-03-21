import { Spinner } from 'components/spinner';
import * as React from 'react';
import { Restaurant, UiStatus } from 'type/base-type';
import { getDetails } from '../customer.service';

export type RestaurantSummaryProps = {
  restaurantSlug: string;
};

export const RestaurantSummary = (props: RestaurantSummaryProps) => {
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

  return (
    <div>
      {status === 'busy' && <Spinner />}
      {details && <p className="text-center text-3xl mb-4">{details.name}</p>}
    </div>
  );
};
