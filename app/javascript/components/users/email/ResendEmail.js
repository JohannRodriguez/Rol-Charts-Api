// Import Packagesmport Packages
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

// Import Components
import api_call from '../../../api/api_call';

const ResendEmail = props => {
  const [lang] = useTranslation('email');

  const [response, setResponse] = useState(null);
  const [field, setField] = useState({
    email: '',
  });

  const resend = async event => {
    event.preventDefault();

    const fetch = await api_call('POST', '/api/v1/email_resend', {user: field});
    setResponse(fetch.status);
  };

  const handleChange = event => {
    setField({
      ...field,
      [event.target.name]: event.target.value
    });
  };

  return (
    <>
      <h1>{lang('resend.title')}</h1>
      <form onSubmit={resend}>
        <input
          type="email"
          name="email"
          placeholder={lang('resend.placeholder')}
          onChange={handleChange}
          required
        />
        <button type="submit">{lang('resend.buttons.resend')}</button>
      </form>
      <button onClick={() => {props.history.push('/')}}>{lang('resend.buttons.dashboard')}</button>
      {response === 'SUCCESS' ?
        <p>{lang('resend.succes')}</p>
      : response === 'VERIFIED' ?
        <p>{lang('resend.verified')}</p>
      : response === 'NO_USER' ?
        <p>{lang('resend.failure')}</p>
      :
        null
      }
    </>
  )
}

export default ResendEmail;
