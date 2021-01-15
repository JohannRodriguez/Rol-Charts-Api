// Import Packages
import React, { useState, useEffect} from 'react';
import { Redirect } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

// Import Modules
import api_call from '../../api/api_call';

const Dashboard = props => {
  const [lang, trans] = useTranslation(['global', 'something']);

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
        <button onClick={() => { props.history.push('settings') }}>Settings</button>
        </> 
      :
        <Redirect to='/login' />
      }
    </>
  );
};

export default Dashboard;
