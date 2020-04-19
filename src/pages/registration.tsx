import { Container } from 'components/container';
import { OwnerRegistration } from 'modules/owner/components/owner-registration';
import * as React from 'react';
import { useHistory } from 'react-router-dom';
import { loginUrl } from 'routes';

export const Registration = () => {
  const history = useHistory();

  return (
    <Container className="py-8">
      <h1 className="my-4 text-2xl text-gray-700 text-center">
        Register Your Business
      </h1>
      <OwnerRegistration onAccountCreated={() => history.push(loginUrl)} />
    </Container>
  );
};
