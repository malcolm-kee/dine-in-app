import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import { NotFoundPage } from './pages/404';
import { Home } from './pages/home';
import { Manage } from './pages/manage';
import { Reception } from './pages/reception';
import * as routes from './routes';

// install Router
// routes, landing page, customer page, owner page
// owner page, setup, number of tables and number of chairs
// TODO: customer page has one input, numbers -> result: table numbers or queue number

// nice to have, owner page current status
// nice to have, owner page update table status
// nice to have, graphical representation of table
// nice to have, annoucement

export function App() {
  return (
    <Switch>
      <Route path={routes.manageUrl} component={Manage} />
      <Route path={routes.receptionUrl} component={Reception} />
      <Route path={routes.homeUrl} exact component={Home} />
      <Route component={NotFoundPage} />
    </Switch>
  );
}
