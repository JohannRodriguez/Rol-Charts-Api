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
      <div className="destroy">
        <div className="bg" onClick={() => {props.setModal(false)}}></div>
        <div className="action">
          <div className="go-back">
            <div className="close-msg">
              <p>{lang('go_back.1')}</p>
              <p>{lang('go_back.2')}</p>
            </div>
            <p className="close" onClick={() => {props.setModal(false)}}>X</p>
          </div>
          <div className="warning">
            <h1>{lang('warning')}</h1>
            <p>{props.message}</p>
          </div>
          <form onSubmit={handleSubmit}>
            <p>{lang('destroy.d1')} <strong>{props.confirmDestroy}</strong> {lang('destroy.d2')}</p>
            <input className="blue-focus"
              type="text" name="destroy" value={field.destroy}
              onChange={handleChange} required
            />
            <br/>
            {response === 'NOT_MATCH' ?
              <p className="incorrect">{lang('match')} <strong>{props.confirmDestroy}</strong></p>  
            : null }
            <button className="delete-btn" type="submit">{lang('button')}</button>
          </form>
          {response === 'NOT_AUTH' ?
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
