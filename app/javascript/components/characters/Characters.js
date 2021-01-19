// Import Packages
import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';

// Import Modules
import api_call from '../../api/api_call';

const Characters = props => {
  const [characters, setCharacters] = useState(null);

  useEffect(async () => {
    if (!characters) {
      const fetch = await api_call('GET', '/api/v1/characters');
      setCharacters(fetch);
    }
  });

  return (
    <>
      {props.session.log === 'LOGGED_IN' ?
      <>
        <button onClick={() => {props.history.push('/new_character')}}>New character</button>
        <div>
          {characters ? characters.map(character =>
            <div key={`${character.id}-character`}>
              <h2 key={`${character.id}-name`}>{character.name}</h2>
              {character.alias ?
                <h3 key={`${character.id}-alias`}>{character.alias}</h3>
              : null}
              {character.universe ?
                <p key={`${character.id}-universe`}>{character.universe}</p>
              : null}
              {character.bio ?
                <p key={`${character.id}-bio`}>{character.bio}</p>
              : null}
            </div>  
          ) : null }
        </div>
      </>
      :
        <Redirect to='/login' />
      }
    </>
  )
};

export default Characters;
