// Import Packages
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

// Import Modules
import api_call from '../../api/api_call';
import ownership from './helpers/global';
import Header from './Header';
import Carousel from './Carousel';

const Characters = props => {
  const [lang] = useTranslation('characters');
  const [m] = useTranslation('months');

  const [characters, setCharacters] = useState([{
    alias: "La rosa del desierto",
    bio: "Cazarecompensas noxiana",
    created_at: "2021-02-03T04:14:59.593Z",
    id: 1,
    name: "Samira",
    universe: "League of Legends",
    updated_at: "2021-02-03T04:14:59.593Z",
    user_id: 1,
  }]);
  const [owner, setOwner] = useState(null);
  const [usrRes, setUsrRes] = useState({});

  useEffect(async () => {
    if (characters.length === 1) {
      const arr = [];
      for (let i = 0; i < 50; i++) {
        const obj = characters[0];
        arr.push(obj);
      }
      setCharacters(arr);
    }
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
        {owner ?
          <Header path={props.location.pathname.split('/').filter(e => e)} history={props.history} user={props.session.user.username}/>
        : null}
          {characters && characters.length === 0 ?
            <p>{lang('empty_chars')}</p>
        : <div className="cm-d">
            {owner ? <h3>{lang('title.owner')}</h3> : <h3>{lang('title.viewer')}</h3>}
            <div className="cd-msc">
              {characters ?
                <Carousel chars={characters} />
              : null}
            </div>
          </div>
        }
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
