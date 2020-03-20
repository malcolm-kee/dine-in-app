import * as React from 'react';
import { Link } from 'react-router-dom';
import { manageUrl, receptionUrl } from '../routes';

export const Home = () => {
  return (
    <div>
      <Link to={receptionUrl}>Customer</Link>
      <Link to={manageUrl}>Owner</Link>
    </div>
  );
};
