// Import Packages
import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Cont } from '../../../styles/blossom';

// Import Components
import { change, submit } from '../helpers/handler';

// Import Data
import loginStyles, { H1, Span, SpanBullet } from './loginStyles';
import { BlueBorderInput, Input, BlueButton } from '../../../styles/global';
import loginData from './loginData';

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
          <H1>{lang('title')}</H1>
          <form onSubmit={e => submit(e, 'POST', '/api/v1/sessions', {user: field}, setResponse)}>
            {loginData.map(d => 
              <BlueBorderInput key={d.name} styles={loginStyles.borderInput.styles}>
                <Input
                  type={d.type} name={d.name} placeholder={lang(`placeholders.${d.name}`)}
                  onChange={e => change(e, field, setField)}
                />
              </BlueBorderInput>
            )}
            {response.status === 'BAD_USER' ? <p>{lang('errors.email')}</p>
            : response.status === 'BAD_PASSWORD' ? <p>{lang('errors.password')}</p>
            : null }
            <BlueButton styles={loginStyles.button.styles} type="submit">{lang('buttons.login')}</BlueButton>
          </form>
          <div>
            <div>
              <SpanBullet>{lang('forgot.message')}</SpanBullet>
              <Span>{lang('forgot.link')}</Span>
            </div>
            <div>
              <SpanBullet>{lang('register.message')}</SpanBullet>
              <Span onClick={() => {props.history.push('/register')}}>{lang('register.link')}</Span>
            </div>
          </div>
        </Cont>
      }
    </>
  );
};

export default Login;
