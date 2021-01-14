// Import Packages
import React, { useState, useEffect} from 'react';
import { Redirect } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

// Import Modules
import api_call from '../../api/api_call';

const Dashboard = props => {
  const [response, setResponse] = useState(null);
  const [lang, trans] = useTranslation(['global', 'something']);

  const logout = async () => {
    const response = await api_call('DELETE', '/api/v1/logout');
    if(response.logout === 'SUCCES') {
      console.log('Logged out');
      return <Redirect to='/login' />
    }
  };

  return (
    <>
      { props.session.log === 'LOGGED_IN' ?
        <>
        <h1>{lang('title')}</h1>
        <h1>{lang('something:smht')}</h1>
        <button onClick={() => trans.changeLanguage('es')}>Español</button>
        <button onClick={() => trans.changeLanguage('en')}>English</button>
        <h2>{props.session.user.username}</h2>
        <button onClick={() => logout()}>Logout</button>
        <button onClick={() => {<Redirect to='settings' />}}>Settings</button>
        </>
      : 
        <Redirect to='/login' />
      }
    </>
  );
};

export default Dashboard;
