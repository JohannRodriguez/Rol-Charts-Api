// Import Packages
import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

// Import Components
import PickDate from './PickDate';
import Sex from './Sex';

const Register = props => {
  const [lang] = useTranslation('register');

  const [field, setField] = useState({
    username: '',
    email: '',
    password: '',
    password_confirmation: '',
    day: new Date().getDate(),
    month: new Date().getMonth,
    year: new Date().getFullYear(),
    sex: '',
  });

  const handleSubmit = event => {
    event.preventDefault();
    console.log('Submititng ^·^', field);
  }

  const handleChange = event => {
    setField({
      ...field,
      [event.target.name]: event.target.value
    });
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
                value={field.username} onChange={handleChange}
              />
            </div>
            <div className="dfi-bv01 f-gbv01">
              <input className="fi-bv01"
                type="email" name="email"
                placeholder={lang('placeholders.email')}
                value={field.email} onChange={handleChange}
              />
            </div>
            <div className="dfi-bv01 f-gbv01">
              <input className="fi-bv01"
                type="password" name="password"
                placeholder={lang('placeholders.password')}
                value={field.password} onChange={handleChange}
              />
            </div>
            <div className="dfi-bv01 f-gbv01">
              <input className="fi-bv01"
                type="password" name="password_confirmation"
                placeholder={lang('placeholders.password_confirmation')}
                value={field.password_confirmation} onChange={handleChange}
              />
            </div>
            <p className="label">{lang('labels.birthday')}</p>
            <PickDate change={handleChange} />
            <p className="label">{lang('labels.sex')}</p>
            <Sex change={handleChange} />
            <div className="db-sbv01">
              <button className="fb-sbv01" type="submit">
                <span className="sb-msg">{lang('buttons.reg.secondary')}</span>
                <span className="mb-msg">{lang('buttons.reg.main')}</span>
              </button>
            </div>
          </form>
        </div>
      }
     
    </>
  )
};

export default Register;
