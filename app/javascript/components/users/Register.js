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
  const [m] = useTranslation('months');

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
        uniqueness: 'pending',
      },
    },
    email: {
      field: '',
      validation: {
        email: true,
        presence: true,
        uniqueness: 'pending',
      },
    },
    password: {
      field: '',
      validation: {
        min: 8,
        max: 26,
        presence: true,
        match: {
          test: 'password_confirmation',
          target: 'password_confirmation',
        },
        include: {
          special: /[¿¡`!@#$%^&*()+\-=\[\]{};':"\\|,.<>\/?~]/,
          low_case: /[a-z]/,
          up_case: /[A-Z]/,
          number: /[0-9]/,
        },
      },
    },
    password_confirmation: {
      field: '',
      validation: {
        presence: true,
        match: {
          test: 'password',
          target: 'password_confirmation',
        },
      },
    },
    day: { field: new Date().getDate() },
    month: { field: m(`${new Date().getMonth() + 1}`)},
    year: { field: new Date().getFullYear() },
    gender: { field: 'neutral' },
  });
  const [response, setResponse] = useState({});
  const [validation, setValidation] = useState({
    username: { first: true }, email: { first: true }, password: { first: true },
    password_confirmation: { first: true }
  });

  useEffect(async () => {
    const lists = ['username', 'email'];
    lists.map(async list => {
      if (fields[list].validation.uniqueness === 'pending') {
        setFields({
          ...fields,
          [list]: {
            ...fields[list],
            validation: {
              ...fields[list].validation,
              uniqueness: await api_call('GET', `/api/v1/users?list=${list}`),
            }
          }
        });
      }
    });
    if (response.status === 'SUCCESS') {
      location.reload();
    }
  });

  const handleSubmit = async event => {
    event.preventDefault();
    const fetch = await api_call('POST', '/api/v1/users', { user: {
      username: fields.username.field,
      email: fields.email.field,
      password: fields.password.field,
      password_confirmation: fields.password_confirmation.field,
      birthday: `${fields.year.field}-${fields.month.field}-${fields.day.field}`,
      gender: fields.gender.field,
    }, });
    setResponse(fetch)
  };
  const passArr = arr => {
    arr.splice(arr.indexOf('is invalid'));
    return arr;
  };

  return (
    <>{props.session.log === 'LOGGED_IN' ?
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
              type="text" name="username"
              placeholder={lang('placeholders.username')} value={fields.username.field} 
              onChange={e => validationChange(e, fields, setFields, validation, setValidation)}
            />
          </div>
          {Object.keys(validation).length > 0 ?
            <Errors type='username' error={Array.isArray(validation.username) ? validation.username : null } />
          :
            <Errors type='username' error={response.error ? response.error.username : null} />
          }
          <div className="dfi-bv01 f-gbv01">
            <input className="fi-bv01"
              type="email" name="email"
              placeholder={lang('placeholders.email')}
              value={fields.email.field} onChange={e => validationChange(e, fields, setFields)}
            />
          </div>
          {Object.keys(validation).length > 0 ?
            <Errors type='email' error={Array.isArray(validation.email) ? validation.email : null } />
          :
            <Errors type='email' error={response.error ? response.error.email : null} />
          }
          <div className="dfi-bv01 f-gbv01">
            <input className="fi-bv01"
              type="password" name="password"
              placeholder={lang('placeholders.password')}
              value={fields.password.field} onChange={e => validationChange(e, fields, setFields)}
            />
          </div>
          {Object.keys(validation).length > 0 ?
            <Errors type='password' error={Array.isArray(validation.password) ? passArr(validation.password) : null } />
          :
            <Errors type='password' error={response.error ? response.error.password : null} />
          }
          <div className="dfi-bv01 f-gbv01">
            <input className="fi-bv01"
              type="password" name="password_confirmation"
              placeholder={lang('placeholders.password_confirmation')}
              value={fields.password_confirmation.field} onChange={e => validationChange(e, fields, setFields)}
            />
          </div>
          {Object.keys(validation).length > 0 ?
            <Errors type='password_confirmation' error={Array.isArray(validation.password_confirmation) ? validation.password_confirmation : null } />
          :
            <Errors type='password_confirmation' error={response.error ? response.error.password_confirmation : null} />
          }
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
