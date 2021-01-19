// Import Packages
import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

// Import Modules
import api_call from '../../api/api_call';
import Destroy from '../global/Destroy';

const Characters = props => {
  const [lang] = useTranslation('characters');

  const [characters, setCharacters] = useState(null);
  const [destroys, setDestroys] = useState({ id: '', message: '', });
  const [modal, setModal] = useState(false);

  useEffect(async () => {
    if (!characters) {
      const fetch = await api_call('GET', '/api/v1/characters');
      setCharacters(fetch);
    }
  });

  const modalData = (id, name) => {
    setDestroys({
      id,
      message: `${lang('destroy')}/${props.session.user.username}/${name}`,
    });
  };

  return (
    <>
      {props.session.log === 'LOGGED_IN' ?
      <>
        <h1>{lang('title')}</h1>
        <button onClick={() => {props.history.push('/new_character')}}>{lang('buttons.new')}</button>
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
              <button onClick={() => {modalData(character.id, character.name); setModal(true);}}>
                {lang('buttons.destroy')}
              </button>
            </div>
          ) : null }
        </div>
        <Destroy modal={modal} setModal={setModal} type="characters" id={destroys.id} confirmDestroy={destroys.message} />
      </>
      :
        <Redirect to='/login' />
      }
    </>
  )
};

export default Characters;
