import { Container } from 'components/container';
import { OwnerOverview } from 'modules/owner/components/owner-overview';
import { OwnerAuthGuard } from 'modules/owner/components/owner-auth-guard';
import * as React from 'react';
import { useParams } from 'react-router-dom';

export const Overview = () => {
  const { restaurant } = useParams<{ restaurant: string }>();

  return (
    <Container maxWidth="5xl">
      <OwnerAuthGuard>
        <OwnerOverview restaurantSlug={restaurant} />
      </OwnerAuthGuard>
    </Container>
  );
};
