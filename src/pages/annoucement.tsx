import { Container } from 'components/container';
import { SeatAvailableAnnouncement } from 'modules/restaurant/components/seat-available-announcement';
import * as React from 'react';
import { useParams } from 'react-router-dom';

export const Annoucement = () => {
  const { restaurant } = useParams<{ restaurant: string }>();

  return (
    <Container>
      <h1 className="text-center text-3xl text-gray-700">Queue Updates</h1>
      <SeatAvailableAnnouncement restaurant={restaurant} hasVoice />
    </Container>
  );
};
