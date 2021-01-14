import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import api_call from '../../api/api_call';

const Login = props => {
  const [response, setResponse] = useState(null);
  const [field, setField] = useState({
    email: '',
    password: '',
  });
  const [lang] = useTranslation('login');

  const handleSubmit = async event => {
    event.preventDefault();

    const fetch = await api_call('POST', '/api/v1/sessions', {user: field});
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
      {props.session.log === 'LOGGED_IN' ?
        <Redirect to='/' />
      :
        <>
          <h1>Login</h1>
          <form onSubmit={handleSubmit}>
            <input
              type="email" name="email" placeholder="Email"
              value={field.email} onChange={handleChange} required
            />
            <input
              type="password" name="password" placeholder="Password"
              value={field.password} onChange={handleChange} required
            />
          <button type="submit">Login</button>
          </form>
          {response === 'BAD_USER' ?
            <p>{lang('errors.email')}</p>
          : response === 'BAD_PASSWORD' ?
            <p>{lang('errors.password')}</p>
          : response === 'SUCCESS' ?
            <Redirect to='/' />
          :
            null
          }
          <button onClick={() => {<Redirect to='/register' />}}>Create Account</button>
        </>
      }
    </>
  );
};

export default Login;
