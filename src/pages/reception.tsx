import { Container } from 'components/container';
import { RequestSeatsForm } from 'modules/customer/components/request-seats-form';
import { RestaurantSummary } from 'modules/customer/components/restaurant-summary';
import * as React from 'react';
import { useParams } from 'react-router-dom';

export const Reception = () => {
  const { restaurant } = useParams<{ restaurant: string }>();
  return (
    <Container className="my-8">
      <RestaurantSummary restaurantSlug={restaurant} />
      <RequestSeatsForm restaurantSlug={restaurant} />
    </Container>
  );
};
