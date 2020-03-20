import cx from 'classnames';
import { Container } from 'components/container';
import * as React from 'react';
import { Link } from 'react-router-dom';
import { manageUrl, receptionUrl } from '../routes';

const linkBaseClass =
  'block text-center text-gray-100 my-4 text-lg py-2 shadow rounded';

export const Home = () => {
  return (
    <Container>
      <p className="text-center text-xl">Login as</p>
      <Link to={receptionUrl} className={cx(linkBaseClass, 'bg-blue-500')}>
        Customer
      </Link>
      <Link to={manageUrl} className={cx(linkBaseClass, 'bg-teal-500')}>
        Owner
      </Link>
    </Container>
  );
};
