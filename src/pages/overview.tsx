import { Container } from 'components/container';
import { OwnerOverview } from 'modules/owner/components/owner-overview';
import * as React from 'react';
import { useParams } from 'react-router-dom';

export const Overview = () => {
  const { restaurant } = useParams<{ restaurant: string }>();

  return (
    <Container maxWidth="xl">
      <OwnerOverview restaurantSlug={restaurant} />
    </Container>
  );
};
