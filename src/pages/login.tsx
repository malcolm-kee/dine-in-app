import { OwnerLogin } from 'modules/owner/components/owner-login';
import * as React from 'react';
import { Container } from 'components/container';
import { Link } from 'react-router-dom';
import { registerUrl } from 'routes';

export const Login = () => {
  return (
    <Container className="py-8">
      <h1 className="my-4 text-2xl text-gray-700 text-center">Login</h1>
      <OwnerLogin />
      <p>
        <Link to={registerUrl}>Register instead</Link>
      </p>
    </Container>
  );
};
