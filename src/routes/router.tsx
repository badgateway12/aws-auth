import React from 'react';
import { Route, Switch  } from 'react-router-dom';
import { SignIn } from '../components/auth/SignIn';
import { SignUp } from '../components/auth/SignUp';
import { LandingPage } from '../components/landing-page/landing-page';
import { HomePage } from '../components/home-page/home-page';
import { NotFound } from '../components/error-pages/resource-not-found';
import * as routes from '../constants/routes';

export const Routes: React.StatelessComponent<{}> = () => {
  return (
    <Switch>
      <Route path={routes.SIGN_UP} exact component={SignUp} />
      <Route path={routes.SIGN_IN} exact component={SignIn} />
      <Route path={routes.LANDING} exact component={LandingPage} />
      <Route path={routes.HOME} exact component={HomePage} />
      <Route path={routes.LANDING} />
      <Route component={ NotFound } />
  </Switch>
  );
}