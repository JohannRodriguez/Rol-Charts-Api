// Import Packages
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

// Import Components
import Authenticate from '../users/Authenticate';
import api_call from '../../api/api_call';

const Destroy = props => {
  const [lang] = useTranslation('destroy');

  const [response, setResponse] = useState(null);
  const [field, setField] = useState({
    destroy: '',
  });

  const handleSubmit = async event => {
    event.preventDefault();

    if (field.destroy === props.confirmDestroy) {
      const fetch = await api_call('DELETE', `/api/v1/${props.type}/${props.id}`);
      setResponse(fetch.status);
    } else {
      setResponse('NOT_MATCH');
    }
  };

  const handleChange = event => {
    setField({
      ...field,
      [event.target.name]: event.target.value
    });
  };

  useEffect(() => {
    if (response === 'SUCCESS') {
      window.location.reload()
    }
  });

  return (
    <>
    {props.modal ?
      <div className={`destroy_${props.type}`}>
        <p onClick={() => {props.setModal(false)}}>X</p>
        <div className={`destroy_${props.type}_modal`}>
          <h3>{lang('warning')}</h3>
          <p>{lang('message')}</p>
          <p>{lang('destroy.d1')} {props.confirmDestroy} {lang('destroy.d2')}</p>
          <form onSubmit={handleSubmit}>
            <input
              type="text" name="destroy" value={field.destroy}
              onChange={handleChange} required
            />
            <button type="submit">{lang('button')}</button>
          </form>
          {response === 'NOT_MATCH' ?
            <p>{lang('match')} {props.confirmDestroy}</p>
          : response === 'NOT_AUTH' ?
            <Authenticate />
          :
            null
          }
        </div>
      </div>
    : null}
    </>
  )
};

export default Destroy;
