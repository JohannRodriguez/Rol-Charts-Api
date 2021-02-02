// Import Packages
import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

// Import Components
import api_call from '../../api/api_call';
import { change, submit } from './helpers/handler';

const Login = props => {
  const [lang] = useTranslation('login');

  const [response, setResponse] = useState({});
  const [field, setField] = useState({
    email: '',
    password: '',
  });

  useEffect(() => {
    if (response.status === 'SUCCESS') {
      location.reload();
    }
  });

  return (
    <>
      {props.session.log === 'LOGGED_IN' ?
        <Redirect to='/' />
      :
        <div className="login">
          <h1>{lang('title')}</h1>
          <form onSubmit={e => submit(e, 'POST', '/api/v1/sessions', {user: field}, setResponse)}>
            <div className="dfi-bv01 f-gbv01">
              <input className="fi-bv01"
                type="email" name="email" placeholder={lang('placeholders.email')}
                value={field.email} onChange={e => change(e, field, setField)}
              />
            </div>
            <div className="dfi-bv01 f-gbv01">
              <input className="fi-bv01"
                type="password" name="password" placeholder={lang('placeholders.password')}
                value={field.password} onChange={e => change(e, field, setField)}
              />
            </div>
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
