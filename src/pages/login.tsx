import { OwnerLogin } from 'modules/owner/components/owner-login';
import { getOwnedRestaurants } from 'modules/owner/owner.service';
import * as React from 'react';
import { Container } from 'components/container';
import { Link, useHistory } from 'react-router-dom';
import { registerUrl, getOwnerOverviewUrl } from 'routes';
import {
  useWithAuthHeader,
  OwnerAuthStateContext,
} from 'modules/owner/owner.context';

export const Login = () => {
  const { status } = React.useContext(OwnerAuthStateContext);
  const getDetailsRequest = useWithAuthHeader(getOwnedRestaurants);
  const history = useHistory();

  React.useEffect(() => {
    if (status === 'authenticated') {
      const { fetch, xhr } = getDetailsRequest();

      fetch().then((res) => {
        if (res.ok && res.data.length > 0) {
          history.push(getOwnerOverviewUrl(res.data[0].slug));
        }
      });

      return () => xhr.abort();
    }
  }, [status, getDetailsRequest, history]);

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
