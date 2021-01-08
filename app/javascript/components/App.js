import React, { useEffect } from 'react';
import { default as request } from 'axios';
import { Route, Switch } from 'react-router-dom';

import Home from './Home';
import Login from './Login';

const App = () => {
  useEffect(() => {
    request
      .get('/api/v1/log_status', { withCredentials: true })
      .then(response => console.log(response))
      .catch(error => console.log(error));
  });

  return (
    <Switch>
      <Route exact path='/' component={Home} />
      <Route exact path='/login' component={Login} />
    </Switch>
  );
};

export default App
