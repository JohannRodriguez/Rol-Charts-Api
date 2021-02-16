// Import Packages
import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Cont } from '../../../styles/blossom';

// Import Components
import { change, submit } from '../helpers/handler';

// Import Data
import loginStyles from './loginStyles';

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
        <Cont styles={loginStyles.contParent.styles}>
          <h1>{lang('title')}</h1>
          <form onSubmit={e => submit(e, 'POST', '/api/v1/sessions', {user: field}, setResponse)}>
            <Cont styles={loginStyles.contInput.styles}>
              <input className="fi-bv01"
                type="email" name="email" placeholder={lang('placeholders.email')}
                value={field.email} onChange={e => change(e, field, setField)}
              />
            </Cont>
            <Cont styles={loginStyles.contInput.styles}>
              <input className="fi-bv01"
                type="password" name="password" placeholder={lang('placeholders.password')}
                value={field.password} onChange={e => change(e, field, setField)}
              />
            </Cont>
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
        </Cont>
      }
    </>
  );
};

export default Login;
