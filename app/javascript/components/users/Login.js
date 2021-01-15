import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import api_call from '../../api/api_call';

const Login = props => {
  const [response, setResponse] = useState({});
  const [field, setField] = useState({
    email: '',
    password: '',
  });
  const [lang] = useTranslation('login');

  useEffect(() => {
    if (response.status === 'SUCCESS') {
      delete response.status;
      props.login(response);
    }
  });

  const handleSubmit = async event => {
    event.preventDefault();
    
    const fetch = await api_call('POST', '/api/v1/sessions', {user: field});
    setResponse(fetch);
  };
  const handleChange = event => {
    setField({
      ...field,
      [event.target.name]: event.target.value
    });
  };

  return (
    <>
      {props.session.log === 'LOGGED_IN' ?
        <Redirect to='/' />
      :
        <>
          <h1>{lang('title')}</h1>
          <form onSubmit={handleSubmit}>
            <input
              type="email" name="email" placeholder={lang('placeholders.email')}
              value={field.email} onChange={handleChange} required
            />
            <input
              type="password" name="password" placeholder={lang('placeholders.password')}
              value={field.password} onChange={handleChange} required
            />
          <button type="submit">{lang('buttons.login')}</button>
          </form>
          {response.status === 'BAD_USER' ?
            <p>{lang('errors.email')}</p>
          : response.status === 'BAD_PASSWORD' ?
            <p>{lang('errors.password')}</p>
          :
            null
          }
          <button onClick={() => {props.history.push('/register')}}>{lang('buttons.register')}</button>
        </>
      }
    </>
  );
};

export default Login;
