// Import Packages
import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';

// Import Modules
import api_call from '../../api/api_call';

const Dashboard = props => {
  const [characters, setCharacters] = useState(null);

  useEffect(async () => {
    if (!characters) {
      const fetch = await api_call('GET', '/api/v1/characters');
      const arr = [props.session.user.username];
      arr.concat(fetch);
      setCharacters(arr);
    }
  });


  const logout = async () => {
    await api_call('DELETE', '/api/v1/logout');
    props.logout();
  };

  return (
    <>
      {props.session.log === 'LOGGED_IN' ?
        <>
        <h2>{props.session.user.username}</h2>
        {characters && characters.length > 0 ?
          <select>
            {characters.map(character =>
              <option key={character} value={character}>{character}</option>
            )}
          </select>
        :
          null
        }
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
