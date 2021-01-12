import React, { useState, useEffect } from 'react';
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
    </>
  );
};

export default Dashboard;
