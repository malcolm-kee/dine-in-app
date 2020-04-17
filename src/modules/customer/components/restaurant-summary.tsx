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
    const { xhr, fetch } = getDetails(props.restaurantSlug);
    fetch()
      .then((res) => {
        if (res.ok) {
          setDetails(res.data);
          setStatus('ok');
        } else {
          setStatus('error');
        }
      })
      .catch(() => setStatus('error'));

    return () => xhr.abort();
  }, [props.restaurantSlug]);

  return (
    <div>
      {status === 'busy' && <Spinner />}
      {details && <p className="text-center text-3xl mb-4">{details.name}</p>}
    </div>
  );
};
