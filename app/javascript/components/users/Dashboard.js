import React, { useState, useEffect } from 'react';
import Destroy from '../global/Destroy';
import dashboard_call from './api_calls/dashboard_call';

const Dashboard = props => {
  const logout = () => {
    dashboard_call(props.handleLogout);
  };

  useEffect(() => {
    if (props.user.data === 'none') {
      {props.history.push('/login')}
    }
  });

  return(
    <>
      <h1>Dashboard</h1>
      <h2>{props.user.username || null}</h2>
      <button onClick={() => logout()}>Logout</button>
      <Destroy history={props.history} type="users" id={props.user.id} confirmDestroy={`destroy-${props.user.username}'s-account`} />
    </>
  );
};

export default Dashboard;
