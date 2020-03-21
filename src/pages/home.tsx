import cx from 'classnames';
import { Container } from 'components/container';
import * as React from 'react';
import { Link } from 'react-router-dom';
import { registerUrl } from '../routes';

const linkBaseClass =
  'block text-center text-gray-100 my-4 text-lg py-2 shadow rounded';

export const Home = () => {
  return (
    <Container className="py-16">
      <h1 className="text-4xl text-center text-gray-600">
        Welcome to Dine-In!
      </h1>
      <Link to={registerUrl} className={cx(linkBaseClass, 'bg-teal-500')}>
        Register Your Business
      </Link>
    </Container>
  );
};
