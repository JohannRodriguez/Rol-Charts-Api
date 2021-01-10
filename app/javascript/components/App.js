import React, { useEffect, useState } from 'react';
import { default as api } from 'axios';
import { Route, Switch } from 'react-router-dom';

import Home from './Home';
import Login from './Login';
import Register from './Register';
import ConfirmEmail from './ConfirmEmail';
import ResendEmail from './ResendEmail';

const App = () => {
  const [log, setLog] = useState(
    {
      logStatus: 'NOT_LOGGED_IN',
      user: null,
    }
  );

  useEffect(() => {
    api
      .get('/api/v1/log_status', { withCredentials: true })
      .then(response => {
        if (response.data.loged_in && log.logStatus === 'NOT_LOGGED_IN') {
          setLog({
            ...log,
            logStatus: 'LOGGED_IN',
            user: response.data.user,
          });
        }
      })
      .catch(error => console.log(error));
  });

  const handleLogout = () => {
    setLog({
      ...log,
      logStatus: 'NOT_LOGGED_IN',
      user: null,
    });
  }

  return (
    <Switch>
      <Route exact path={'/'} render={props => (
        <Home {...props} user={log.logStatus} handleLogout={handleLogout} // handleLogin={handleLogin}
        />
      )}/>
      <Route exact path='/login' render={props => (
        <Login {...props} />
      )}/>
      <Route exact path='/register' render={props => (
        <Register {...props} />
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
