// Import Packages
import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

// Import Components
import api_call from '../../api/api_call';
import Errors from './Errors';
import Gender from './Gender';
import PickDate from './PickDate';
import { getFields, submit, validationChange } from './helpers/handler';
import validationFields from './helpers/validationFields';

const Register = props => {
  const [lang] = useTranslation('register');
  const [m] = useTranslation('months');

  const [fields, setFields] = useState({});
  const [response, setResponse] = useState({});
  const [validation, setValidation] = useState({
    username: { first: true }, email: { first: true }, password: { first: true },
    password_confirmation: { first: true }
  });

  useEffect(async () => {
    console.log(fields);
    if (Object.keys(fields).length === 0) {
      validationFields({ username: '', email: '', password: '',
        password_confirmation: '', day: { field: new Date().getDate() },
        month: { field: m(`${new Date().getMonth() + 1}`)},
        year: { field: new Date().getFullYear() }, gender: 'neutral',
        }, setFields
      );
    }
    if (response.status === 'SUCCESS') {
      location.reload();
    }
  });

  const passArr = arr => {
    arr.splice(arr.indexOf('is invalid'));
    return arr;
  };
  const setBirthday = () => {
    const obj = fields;
    const birthday = `${obj.year.field}-${obj.month.field}-${obj.day.field}`;
    delete obj.day;
    delete obj.month;
    delete obj.year;
    obj.birthday = { field: birthday };
    return obj;
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
        <form onSubmit={e => submit(e, 'POST', '/api/v1/users/', getFields(setBirthday(), 'user'), setResponse)}>
          <div className="dfi-bv01 f-gbv01">
            <input className="fi-bv01"
              type="text" name="username" placeholder={lang('placeholders.username')}
              value={fields.username ? fields.username.field : ''} 
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
              type="email" name="email" placeholder={lang('placeholders.email')}
              value={fields.email ? fields.email.field : ''}
              onChange={e => validationChange(e, fields, setFields, validation, setValidation)}
            />
          </div>
          {Object.keys(validation).length > 0 ?
            <Errors type='email' error={Array.isArray(validation.email) ? validation.email : null } />
          :
            <Errors type='email' error={response.error ? response.error.email : null} />
          }
          <div className="dfi-bv01 f-gbv01">
            <input className="fi-bv01"
              type="password" name="password" placeholder={lang('placeholders.password')}
              value={fields.password ? fields.password.field : ''}
              onChange={e => validationChange(e, fields, setFields, validation, setValidation)}
            />
          </div>
          {Object.keys(validation).length > 0 ?
            <Errors type='password' error={Array.isArray(validation.password) ? passArr(validation.password) : null } />
          :
            <Errors type='password' error={response.error ? response.error.password : null} />
          }
          <div className="dfi-bv01 f-gbv01">
            <input className="fi-bv01"
              type="password" name="password_confirmation" placeholder={lang('placeholders.password_confirmation')}
              value={fields.password_confirmation ? fields.password_confirmation.field : ''}
              onChange={e => validationChange(e, fields, setFields, validation, setValidation)}
            />
          </div>
          {Object.keys(validation).length > 0 ?
            <Errors type='password_confirmation' error={Array.isArray(validation.password_confirmation) ? validation.password_confirmation : null } />
          :
            <Errors type='password_confirmation' error={response.error ? response.error.password_confirmation : null} />
          }
          <p className="label">{lang('labels.birthday')}</p>
          <PickDate fields={fields} setFields={setFields} validation={validation} setValidation={setValidation} />
          <p className="label">{lang('labels.gender')}</p>
          <Gender fields={fields} setFields={setFields} validation={validation} setValidation={setValidation} />
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
