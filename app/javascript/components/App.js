import React, { useEffect, useState } from 'react';
import { default as api } from 'axios';
import { Route, Switch } from 'react-router-dom';

import Dashboard from './users/Dashboard';
import Login from './users/Login';
import Register from './users/Register';
import ConfirmEmail from './users/ConfirmEmail';
import ResendEmail from './users/ResendEmail';
import Authenticate from './users/Authenticate';
import UpdateUser from './users/UpdateUser';

const App = () => {
  const [log, setLog] = useState(
    {
      logStatus: 'NOT_LOGGED_IN',
      user: { data: 'undefined' },
    }
  );

  const checkLogin = () => {
    api
      .get('/api/v1/log_status', { withCredentials: true })
      .then(response => {
        if (response.data.loged_in === 'LOGGED_IN' && log.logStatus === 'NOT_LOGGED_IN') {
          setLog({
            ...log,
            logStatus: 'LOGGED_IN',
            user: response.data.user,
          });
        } else if (log.logStatus === 'NOT_LOGGED_IN' && log.user.data === 'undefined') {
          setLog({
            ...log,
            user: { data: 'none' },
          });
        }
      })
      .catch(error => console.log(error))
    ;
  };

  useEffect(() => {
    checkLogin();
  });

  const handleLogin = () => {
    setLog({
      ...log,
      user: { data: 'undefined' },
    });
  };

  const handleLogout = () => {
    setLog({
      ...log,
      logStatus: 'NOT_LOGGED_IN',
      user: { data: 'undefined' },
    });
  };

  return (
    <Switch>
      <Route exact path={'/'} render={props => (
        <Dashboard
          {...props}
          user={log.user}
          handleLogout={handleLogout}
        />
      )}/>
      <Route exact path='/login' render={props => (
        <Login {...props} handleLogin={handleLogin} />
      )}/>
      <Route exact path='/register' render={props => (
        <Register {...props} />
      )}/>
      <Route exact path='/update/user' render={props => (
        <UpdateUser {...props} user={log.user} />
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
