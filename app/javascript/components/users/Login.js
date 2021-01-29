// Import Packages
import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

// Import Components
import api_call from '../../api/api_call';

const Login = props => {
  const [lang] = useTranslation('login');

  const [response, setResponse] = useState({});
  const [field, setField] = useState({
    email: '',
    password: '',
  });

  useEffect(() => {
    if (response.status === 'SUCCESS') {
      delete response.status;
      props.login(response);
      props.history.push('/');
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
        <div className="login">
          <h1>{lang('title')}</h1>
          <form onSubmit={handleSubmit}>
            <input className="blue-focus"
              type="email" name="email" placeholder={lang('placeholders.email')}
              value={field.email} onChange={handleChange}
            />
            <input className="blue-focus"
              type="password" name="password" placeholder={lang('placeholders.password')}
              value={field.password} onChange={handleChange}
            />
            {response.status === 'BAD_USER' ?
              <p>{lang('errors.email')}</p>
            : response.status === 'BAD_PASSWORD' ?
              <p>{lang('errors.password')}</p>
            :
              null
            }
            <button className="login-btn" type="submit">{lang('buttons.login')}</button>
          </form>
          <div className="login-adt">
            <div>
              <p>{lang('forgot.message')}</p><span>{lang('forgot.link')}</span><br/>
            </div>
            <div>
              <p>{lang('register.message')}</p><span onClick={() => {props.history.push('/register')}}>{lang('register.link')}</span>
            </div>
          </div>
        </div>
      }
    </>
  );
};

export default Login;
