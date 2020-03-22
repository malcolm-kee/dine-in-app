import { Container } from 'components/container';
import * as React from 'react';
import { Link } from 'react-router-dom';
import { registerUrl } from '../routes';

export const Home = () => {
  return (
    <Container className="py-16">
      <h1 className="text-4xl text-center text-gray-600">
        Welcome to Dine-In!
      </h1>
      <Link
        to={registerUrl}
        className="block text-center text-gray-100 my-4 text-lg py-2 shadow rounded bg-teal-500"
      >
        Register Your Business
      </Link>
    </Container>
  );
};
