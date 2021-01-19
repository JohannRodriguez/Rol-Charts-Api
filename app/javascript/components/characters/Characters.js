// Import Packages
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

// Import Modules
import api_call from '../../api/api_call';
import ownership from './helpers/global';

const Characters = props => {
  const [lang] = useTranslation('characters');

  const [characters, setCharacters] = useState(null);
  const [owner, setOwner] = useState(null);
  const [usrRes, setUsrRes] = useState(null);

  useEffect(async () => {
    if (!usrRes) {
      const fetch = await api_call('GET', `/api/v1/users/${props.match.params.user}`);
      setUsrRes(fetch);
    }
    if (usrRes && usrRes.status === 'SUCCESS' && owner === null && props.session.user) {
      setOwner(ownership(props.session.user.id, usrRes.user.id));
    }
    if (usrRes && usrRes.status === 'SUCCESS' && !characters) {
      const fetch = await api_call('GET', `/api/v1/characters?user=${usrRes.user.id}`);
      setCharacters(fetch);
    }
  });

  return (
    <>
      {usrRes && usrRes.status === 'SUCCESS' ?
      <>
        {owner ?
          <h1>{lang('title.owner')}</h1>
        :
          <h1>{lang('title.viewer')}</h1>
        }
        <button onClick={() => {props.history.push('/')}}>{lang('buttons.dashboard')}</button>
        {owner ?
          <button onClick={() => {props.history.push('/new_character')}}>{lang('buttons.new')}</button>
        : null}
        {characters && characters.length === 0 ?
          <p>{lang('empty_chars')}</p>
        :
          <div>
            {characters ? characters.map(character =>
              <div key={`${character.id}-character`}>
                <h2 key={`${character.id}-name`}>{character.name}</h2>
                {character.universe ?
                  <p key={`${character.id}-universe`}>{character.universe}</p>
                : null}
                <button onClick={() => {
                  props.history.push(`/${usrRes.user.username}/characters/${character.name}`)
                }}>{lang('buttons.see')}</button>
              </div>
            ) : null }
          </div>
        }
      </>
      : usrRes && usrRes.status === 'NO_USER' ?
        <p>{lang('errors.no_user')}{`${props.match.params.user}`}</p>
      :
        <p>{lang('erros.bad_request')}</p>
      }
    </>
  )
};

export default Characters;
