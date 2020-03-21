import { Overview } from 'pages/overview';
import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import { NotFoundPage } from './pages/404';
import { Home } from './pages/home';
import { Reception } from './pages/reception';
import { Registration } from './pages/registration';
import * as routes from './routes';

// nice to have, owner page current status
// nice to have, owner page update table status
// nice to have, graphical representation of table
// nice to have, annoucement

export function App() {
  return (
    <Switch>
      <Route path={routes.registerUrl} component={Registration} />
      <Route path={routes.getOwnerOverviewUrl()} component={Overview} />
      <Route path={routes.getReceptionUrl()} component={Reception} />
      <Route path={routes.homeUrl} exact component={Home} />
      <Route component={NotFoundPage} />
    </Switch>
  );
}
