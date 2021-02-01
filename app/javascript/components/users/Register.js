// Import Packages
import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

// Import Components
import api_call from '../../api/api_call';
import Errors from './Errors';
import Gender from './Gender';
import PickDate from './PickDate';
import validate from './helpers/validation';

const Register = props => {
  const [lang] = useTranslation('register');

  const [fields, setFields] = useState({
    username: {
      field: '',
      validation: {
        min: 3,
        max: 16,
        presence: true,
        exclude: {
          special: /[¿¡`!@#$%^&*()+\-=\[\]{};':"\\|,.<>\/?~]/,
        },
      },
    },
    email: '',
    password: '',
    password_confirmation: '',
    day: new Date().getDate(),
    month: new Date().getMonth(),
    year: new Date().getFullYear(),
    gender: 'neutral',
  });
  const [response, setResponse] = useState({});
  const [validation, setValidation] = useState({first: true});

  useEffect(() => {
    console.log(validation);
    if (response && response.status === 'SUCCESS') {
      props.history.push('/');
    }
  });

  const handleSubmit = async event => {
    event.preventDefault();
    const fetch = await api_call('POST', '/api/v1/users', { user: {
      username: fields.username,
      email: fields.email,
      password: fields.password,
      password_confirmation: fields.password_confirmation,
      birthday: `${fields.year}-${fields.month + 1}-${fields.day}`,
      gender: fields.gender,
    }, });
    setResponse(fetch)
  }
  const handleChange = event => {
    setFields({
      ...fields,
      [event.target.name]: {
        ...fields[event.target.name],
        field: event.target.value
      }
    });

    validate(event.target.name, event.target.value, fields, validation, setValidation);
  }

  return (
    <>
      {props.session.log === 'LOGGED_IN' ?
        <Redirect to='/' />
      :
        <div className="register">
          <header>
            <h1>{lang('title')}</h1>
            <p className="register-link"
              onClick={() => {props.history.push('/login')}}
            >{lang('buttons.login')}</p>
          </header>
          <form onSubmit={handleSubmit}>
            <div className="dfi-bv01 f-gbv01">
              <input className="fi-bv01"
                type="username" name="username"
                placeholder={lang('placeholders.username')}
                value={fields.username.field} onChange={handleChange}
              />
            </div>
            <Errors type='username' error={response.error ? response.error.username : null} />
            <div className="dfi-bv01 f-gbv01">
              <input className="fi-bv01"
                type="email" name="email"
                placeholder={lang('placeholders.email')}
                value={fields.email} onChange={handleChange}
              />
            </div>
            <Errors type='email' error={response.error ? response.error.email : null} />
            <div className="dfi-bv01 f-gbv01">
              <input className="fi-bv01"
                type="password" name="password"
                placeholder={lang('placeholders.password')}
                value={fields.password} onChange={handleChange}
              />
            </div>
            <Errors type='password' error={response.error ? response.error.password : null} />
            <div className="dfi-bv01 f-gbv01">
              <input className="fi-bv01"
                type="password" name="password_confirmation"
                placeholder={lang('placeholders.password_confirmation')}
                value={fields.password_confirmation} onChange={handleChange}
              />
            </div>
            <Errors type='password_confirmation' error={response.error ? response.error.password_confirmation : null} />
            <p className="label">{lang('labels.birthday')}</p>
            <PickDate change={handleChange} />
            <p className="label">{lang('labels.gender')}</p>
            <Gender change={handleChange} />
            {Object.keys(validation).length === 0 ?
              <div className="db-sbv01 db-sbvt">
                <button className="fb-sbv01" type="submit">
                  <span className="sb-msg">{lang('buttons.reg.secondary')}</span>
                  <span className="mb-msg">{lang('buttons.reg.main')}</span>
                </button>
              </div>
            :
              <div className="db-sbv01 db-sbvf">
                <button className="fb-sbv01" type="button">
                  <span className="sb-msg">{lang('buttons.reg.validation')}</span>
                  <span className="mb-msg">{lang('buttons.reg.main')}</span>
                </button>
              </div>
            }
            
          </form>
        </div>
      }
     
    </>
  )
};

export default Register;
