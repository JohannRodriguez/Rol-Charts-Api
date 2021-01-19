// Import Packages
import React, { useState } from 'react';
import { Route, Switch } from 'react-router-dom';

// Import Components
import ConfirmEmail from './users/ConfirmEmail';
import Dashboard from './users/Dashboard';
import Login from './users/Login';
import NewCharacter from './characters/NewCharacter';
import Register from './users/Register';
import ResendEmail from './users/ResendEmail';
import Settings from './users/Settings';

const App = props => {
  const [session, setSession] = useState(props.session);

  const login = status => {
    setSession(status);
  };
  const logout = () => {
    setSession({log: 'NOT_LOGGED_IN',})
  };

  return (
    <Switch>
      <Route exact path={'/'} render={getProps => (
        <Dashboard {...getProps} session={session} logout={logout}/>
      )}/>
      <Route exact path='/settings' render={getProps => (
        <Settings {...getProps} session={session}/>
      )}/>
      <Route exact path='/login' render={getProps => (
        <Login {...getProps} session={session} login={login} />
      )}/>
      <Route exact path='/register' render={getProps => (
        <Register {...getProps} session={session} />
      )}/>
      <Route exact path='/new_character' render={getProps => (
        <NewCharacter {...getProps} session={session} />
      )}/>
      <Route exact path='/confirm_email' render={getProps => (
        <ConfirmEmail {...getProps} />
      )}/>
      <Route exact path='/resend_email' render={getProps => (
        <ResendEmail {...getProps} />
      )}/>
    </Switch>
  );
};

export default App;
