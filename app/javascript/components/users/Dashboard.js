// Import Packages
import React from 'react';
import { Redirect } from 'react-router-dom';

// Import Modules
import api_call from '../../api/api_call';

const Dashboard = props => {
  const logout = async () => {
    await api_call('DELETE', '/api/v1/logout');
    props.logout();
  };

  return (
    <>
      {props.session.log === 'LOGGED_IN' ?
        <>
        <h2>{props.session.user.username}</h2>
        <button onClick={() => logout()}>Logout</button>
        <button onClick={() => {props.history.push('/settings')}}>Settings</button>
        </> 
      :
        <Redirect to='/login' />
      }
    </>
  );
};

export default Dashboard;
