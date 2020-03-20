import * as React from 'react';
import { TextField } from 'components/text-field';
import { Container } from 'components/container';
import { Button } from 'components/button';

export const Reception = () => {
  return (
    <Container>
      <form
        onSubmit={ev => {
          ev.preventDefault();
          // TODO: make API call and get table number/queue number
        }}
      >
        <TextField label="Pax" type="number" />
        <Button type="submit">Get Table Number</Button>
      </form>
    </Container>
  );
};
