// Import Packages
import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';

// Import Modules
import api_call from '../../api/api_call';

const Dashboard = props => {
  const [characters, setCharacters] = useState(null);

  useEffect(() => {
    if (!characters && props.session.log === 'LOGGED_IN') {
      let arr = [props.session.user.username];
      if (props.session.characters.length > 0) {
        arr = arr.concat(props.session.characters);
      }
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
        <main>
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
          <button onClick={() => {props.history.push(`${props.session.user.username}/characters`)}}>Characters</button>
        </main> 
      :
        <Redirect to='/login' />
      }
    </>
  );
};

export default Dashboard;
