import React, { useEffect, useState } from 'react';
import { default as callApi } from 'axios';
import { Route, Switch } from 'react-router-dom';

import Home from './Home';
import Login from './Login';
import Register from './Register';

const App = () => {
  const [log, setLog] = useState(
    {
      logStatus: 'NOT_LOGGED_IN',
      user: null,
    }
  );

  useEffect(() => {
    callApi
      .get('/api/v1/log_status', { withCredentials: true })
      .then(response => {
        console.log(response);
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
    </Switch>
  );
};

export default App;
