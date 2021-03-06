// Import Packages
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

// Import Components
import api_call from '../../api/api_call';
import Destroy from '../global/Destroy';
import Authenticate from '../users/Authenticate';
import validate, { checkValidations } from './helpers/new_character_helper';

const Character = props => {
  const [lang] = useTranslation('character');

  const [charRes, setCharRes] = useState(null);
  const [modal, setModal] = useState(false);
  const [openFields, setOpenFields] = useState(false);
  const [owner, setOwner] = useState(null);
  const [response, setResponse] = useState(null);
  const [usrRes, setUsrRes] = useState(null);
  const [field, setField] = useState(null);
  const [validation, setValidation] = useState({
    name: {
      uniqueness: true,
      length: true,
      required: true,
    },
    alias: { length: true, },
    bio: { length: true, },
    universe: { length: true, },
  });
  

  useEffect(async () => {
    if (!usrRes) {
      const fetch = await api_call('GET', `/api/v1/users/${props.match.params.user}`);
      setUsrRes(fetch);
    }
    if (usrRes && usrRes.status === 'SUCCESS' && !charRes) {
      const fetch = await api_call('GET', `/api/v1/characters/${props.match.params.character}?user=${usrRes.user.id}`);
      setCharRes(fetch);
    }
    if (response && response.status === 'SUCCESS') {
      window.location.reload();
    }
    if (charRes && charRes.status === 'SUCCESS' && !field) {
      setField({
        name: charRes.character.name,
        alias: charRes.character.alias || '',
        bio: charRes.character.bio || '',
        universe: charRes.character.universe || '',
      });
    }
  });

  const handleSubmit = async () => {
    if (checkValidations(validation)) {
      const fetch = await api_call('PATCH', `/api/v1/characters/${charRes.character.id}`, { character: field });
      setResponse(fetch);
    } else {
      setResponse('BAD_FIELDS');
    }
  };  
  const handleChange = event => {
    setField({
      ...field,
      [event.target.name]: event.target.value
    });

    validate(event.target.name, event.target.value, props.session.characters, validation, setValidation);
  };

  return (
    <>
      {usrRes && usrRes.status === 'SUCCESS' && charRes && charRes.status === 'SUCCESS'?
        <>
          {owner ?
            <button onClick={() => {
              setOpenFields(openFields ? false : true);
            }}>{lang('buttons.edit')}</button>
          : null}
          <h1>{charRes.character.name}</h1>
          {openFields ?
            <>
              <input type="text" name="name" placeholder={lang('placeholders.name')}
              value={field.name} onChange={handleChange} />
              {validation.name.uniqueness === 'bad' ?
                <p>{lang('errors.uniqueness')}</p> : null
              }
              {validation.name.length === 'bad' ?
                <p>{lang('errors.length')}</p> : null
              }
              {validation.name.required === 'bad' ?
                <p>{lang('errors.required')}</p> : null
              }
            </>
          : null}
          <h2>{charRes.character.alias}</h2>
          {openFields ?
            <>
              <input
                type="text" name="alias" placeholder={lang('placeholders.alias')}
                value={field.alias} onChange={handleChange}
              />
              {validation.alias.length === 'bad' ?
                <p>{lang('errors.length')}</p> : null
              }
            </>
          : null}
          <h3>{charRes.character.universe}</h3>
          {openFields ?
            <>
              <input
                type="text" name="universe" placeholder={lang('placeholders.universe')}
                value={field.universe} onChange={handleChange}
              />
              {validation.universe.length === 'bad' ?
                <p>{lang('errors.universe')}</p> : null
              }
            </>
          : null}
          <p>{charRes.character.bio}</p>
          {openFields ?
            <>
              <textarea
                name="bio" placeholder={lang('placeholders.bio')}
                value={field.bio} onChange={handleChange}
              />
              {validation.bio.length === 'bad' ?
                <p>{lang('errors.length')}</p> : null
              }
            </>
          : null}
          {response === 'BAD_FIELDS' ? <p>{lang('errors.bad_fields')}</p>: null}
          {openFields ? <button onClick={handleSubmit}>{lang('buttons.patch')}</button> : null}
          {owner ?
            <>
              <button onClick={() => {setModal(true)}}>{lang('buttons.destroy')}</button>
              {modal?
                <Destroy modal={modal} setModal={setModal} type="characters"
                  id={charRes.character.id}
                  confirmDestroy={`${lang('delete')}/${usrRes.user.username}/${charRes.character.name}`}
                />
              : null}
            </>
          : null}
          {response && response.status === 'NOT_AUTH' ? <Authenticate /> : null}
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
