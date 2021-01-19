// Import Packages
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

// Import Components
import api_call from '../../api/api_call';
import Destroy from '../global/Destroy';
import ownership from './helpers/global';

const Character = props => {
  const [lang] = useTranslation('character');

  const [charRes, setCharRes] = useState(null);
  const [modal, setModal] = useState(false);
  const [usrRes, setUsrRes] = useState(null);

  useEffect(async () => {
    if (!usrRes) {
      const fetch = await api_call('GET', `/api/v1/users/${props.match.params.user}`);
      setUsrRes(fetch);
    }
    if (usrRes && usrRes.status === 'SUCCESS' && !charRes) {
      const fetch = await api_call('GET', `/api/v1/characters/${props.match.params.character}?user=${usrRes.user.id}`);
      setCharRes(fetch);
    }
  });

  return (
    <>
      {usrRes && usrRes.status === 'SUCCESS' && charRes && charRes.status === 'SUCCESS'?
        <>
          <h1>{charRes.character.name}</h1>
          <h2>{charRes.character.alias}</h2>
          <h3>{charRes.character.universe}</h3>
          <p>{charRes.character.bio}</p>
          {props.session.user && props.session.user.id === charRes.character.user_id ?
            <>
              <button onClick={() => {setModal(true)}}>{lang('button')}</button>
              {modal?
                <Destroy modal={modal} setModal={setModal} type="characters"
                  id={charRes.character.id}
                  confirmDestroy={`Characters/${usrRes.user.username}/${charRes.character.name}`}
                />
              : null}
            </>
          : null}
        </>
      :
      !usrRes || usrRes.status === 'NO_USER' ?
        <p>{lang('errors.no_user')}{props.match.params.user}</p>
      :!charRes || charRes.status === 'NO_CHARACTER' ?
        <>
          <p>{lang('errors.no_character1')}{props.match.params.character}</p>
          <p>{lang('errors.no_character2')}{props.match.params.user}</p>
        </>
      :
        <p>{lang('errors.bad_request')}</p>
      }
    </>
  )
};

export default Character;
