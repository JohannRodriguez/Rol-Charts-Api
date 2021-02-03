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
  const [usrRes, setUsrRes] = useState({});

  useEffect(async () => {
    if (Object.keys(usrRes).length === 0) {
      const fetch = await api_call('GET', `/api/v1/users/${props.match.params.user}`);
      setUsrRes(fetch);
    }
    if (usrRes.status === 'SUCCESS' && owner === null && props.session.user) {
      setOwner(ownership(props.session.user.id, usrRes.user.id));
    }
    if (usrRes.status === 'SUCCESS' && !characters) {
      const fetch = await api_call('GET', `/api/v1/characters?user=${usrRes.user.id}`);
      setCharacters(fetch);
    }
  });

  return (
    <main className="characters">
      {usrRes.status === 'SUCCESS' ?
      <>
        <header className="gh-dfd">
          {owner ?
            <h3>{lang('title.owner')}</h3>
          :
            <h3>{lang('title.viewer')}</h3>
          }
          {owner ?
            <button onClick={() => {props.history.push('/new_character')}}>{lang('buttons.new')}</button>
          : null}
        </header>
        {characters && characters.length === 0 ?
          <p>{lang('empty_chars')}</p>
        : <>
          {characters ? characters.map((character, i) =>
            <article className={i % 2 === 0 ? 'ca-l' : 'ca-r'}
              key={`${character.id}-character`}>
              <div key={`${character.id}-bg`} className="ca-bg" style={{backgroundImage: `url('https://www.xtrafondos.com/wallpapers/samira-league-of-legends-6798.jpg')`}}></div>
              <h2 key={`${character.id}-name`}>{character.name}</h2>
              <div>
                {character.universe ?
                  <p key={`${character.id}-universe`}>{character.universe}</p>
                : null}
                <button onClick={() => {
                  props.history.push(`/${usrRes.user.username}/characters/${character.name}`)
                }}>{lang('buttons.see')}</button>
              </div>
            </article>
          ) : null }
        </>}
      </>
      : usrRes && usrRes.status === 'NO_USER' ?
        <p>{lang('errors.no_user')}{`${props.match.params.user}`}</p>
      :
        <p>{lang('erros.bad_request')}</p>
      }
    </main>
  )
};

export default Characters;
