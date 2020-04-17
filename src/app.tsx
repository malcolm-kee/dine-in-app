import { Annoucement } from 'pages/annoucement';
import { Login } from 'pages/login';
import { Overview } from 'pages/overview';
import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import { OwnerProvider } from './modules/owner/owner.context';
import { NotFoundPage } from './pages/404';
import { Home } from './pages/home';
import { Reception } from './pages/reception';
import { Registration } from './pages/registration';
import * as routes from './routes';

export function App() {
  return (
    <OwnerProvider>
      <Switch>
        <Route path={routes.registerUrl} component={Registration} />
        <Route path={routes.loginUrl} component={Login} />
        <Route path={routes.getOwnerOverviewUrl()} component={Overview} />
        <Route path={routes.getReceptionUrl()} component={Reception} />
        <Route path={routes.getAnnoucementUrl()} component={Annoucement} />
        <Route path={routes.homeUrl} exact component={Home} />
        <Route component={NotFoundPage} />
      </Switch>
    </OwnerProvider>
  );
}
