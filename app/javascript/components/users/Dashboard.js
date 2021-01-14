import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import dashboard_call from './api_calls/dashboard_call';

const Dashboard = props => {
  const logout = () => {
    dashboard_call(props.handleLogout);
  };

  return(
    <>
    { props.user.data === 'undefined' ?
      null
    : props.user.data === 'none' ?
      <Redirect to='/login' />
    : 
      <>
      <h1>Dashboard</h1>
      <h2>{props.user.username || null}</h2>
      <button onClick={() => logout()}>Logout</button>
      <button onClick={() => {}}>Settings</button>
      </>
    }
    </>
  );
};

export default Dashboard;
