// Import Packages
import React, { useState } from 'react';
import { Route, Switch } from 'react-router-dom';

// Import Components
import Character from './characters/Character';
import Characters from './characters/Characters';
import ConfirmEmail from './users/ConfirmEmail';
import Dashboard from './users/Dashboard';
import Login from './users/login/Login';
import Navbar from './global/navbar/Navbar';
import NewCharacter from './characters/NewCharacter';
import Register from './users/register/Register';
import ResendEmail from './users/ResendEmail';
import Settings from './users/Settings';

const App = props => {
  const [session, setSession] = useState(props.session);

  const logout = () => {
    setSession({log: 'NOT_LOGGED_IN',})
  };

  return (
    <>
    {session.log === 'LOGGED_IN' ?
      <Route path='/' render={getProps => (
        <Navbar {...getProps} session={session} />
    )}/> 
    : null}
    <Switch>
      <Route exact path='/' render={getProps => (
        <Dashboard {...getProps} session={session} logout={logout} />
      )}/>
      <Route exact path='/settings' render={getProps => (
        <Settings {...getProps} session={session} />
      )}/>
      <Route exact path='/login' render={getProps => (
        <Login {...getProps} session={session} />
      )}/>
      <Route exact path='/register' render={getProps => (
        <Register {...getProps} session={session} />
      )}/>
      <Route exact path='/:user/characters' render={getProps => (
        <Characters {...getProps} session={session} />
      )}/>
      <Route exact path='/:user/characters/:character' render={getProps => (
        <Character {...getProps} session={session} />
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
    {session.log === 'LOGGED_IN' ?
      <Route path='/' render={getProps => (
        <Navbar {...getProps} session={session} />
    )}/>
    : null}
    </>
  );
};

export default App;
