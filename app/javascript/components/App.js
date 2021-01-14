import React, { useEffect, useState } from 'react';
import { Route, Switch } from 'react-router-dom';

import Dashboard from './users/Dashboard';
import Login from './users/Login';
import Register from './users/Register';
import ConfirmEmail from './users/ConfirmEmail';
import ResendEmail from './users/ResendEmail';
import Settings from './users/Settings';

const App = props => {
  useEffect(() => {
  });

  return (
    <Switch>
      <Route exact path={'/'} render={() => (
        <Dashboard session={props.session}/>
      )}/>
      <Route exact path='/settings' render={props => (
        <Settings user={props.session}/>
      )}/>
      <Route exact path='/login' render={props => (
        <Login session={props.session} />
      )}/>
      <Route exact path='/register' render={props => (
        <Register session={props.session} />
      )}/>
      <Route exact path='/confirm_email' render={props => (
        <ConfirmEmail {...props} />
      )}/>
      <Route exact path='/resend_email' render={props => (
        <ResendEmail {...props} />
      )}/>
    </Switch>
  );
};

export default App;
