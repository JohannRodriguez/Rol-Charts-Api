// Import Packages
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

// Import Modules
import api_call from '../../api/api_call';
import ownership from './helpers/global';
import Header from './Header';
import User from '../global/User';

const Characters = props => {
  const [lang] = useTranslation('characters');
  const [m] = useTranslation('months');

  const [characters, setCharacters] = useState(null);
  const [owner, setOwner] = useState(null);
  const [usrRes, setUsrRes] = useState({});

  useEffect(async () => {
    console.log(characters);
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

  const getDate = (date, type) => {
    const d = new Date(Date.parse(date))
    switch (type) {
      case 'day':
        return d.getDate();
      case 'month':
        return m(d.getMonth() + 1);
      case 'year':
        return d.getFullYear();
      default:
        break;
    }
  };

  return (
    <main className="characters">
      {usrRes.status === 'SUCCESS' ?
      <>
      <Header path={props.location.pathname.split('/').filter(e => e)} history={props.history} user={props.session.user.username}/>
        {characters && characters.length === 0 ?
          <p>{lang('empty_chars')}</p>
        : <div className="cm-d">
          {characters ? characters.map((character, i) =>
            <article key={`${character.id}-character`}>
              <header className="gh-dfd">
                <User name={usrRes.user.username} img="https://i.pinimg.com/236x/83/ff/7c/83ff7ca8f68b1cb9b56759c41e5c15d4.jpg" />
                <div className="date">
                  <span>{getDate(character.created_at, 'day')}</span>
                  <span>{getDate(character.created_at, 'month')}</span>
                  <span>{getDate(character.created_at, 'year')}</span>
                </div>
              </header>
              <div className={i % 2 === 0 ? 'char-i ca-l' : 'char-i ca-r'}>
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
              </div>
            </article>
          ) : null }
        </div>}
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
