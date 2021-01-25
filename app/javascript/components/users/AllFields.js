// Import Packages
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

// Import Components
import Authenticate from './Authenticate';
import validateField, { checkValidations, createStates, defaultFields } from './helpers/all_fields_helper';
import api_call from '../../api/api_call';

const AllFields = props => {
  const [lang] = useTranslation('all_fields');

  const [field, setField] = useState(null);
  const [response, setResponse] = useState(null);
  const [users, setUsers] = useState(null);
  const [validation, setValidation] = useState(null);
  const [validateDefault, setValidateDefault] = useState(false);
  const [visiblePassword, setVisiblePassword] = useState(false);

  useEffect(async () => {
    if (!validation && !field) {
      createStates(props.show, props.display, setValidation, setField);
    }
    if (field && !validateDefault) {
      defaultFields(field, validation, setValidation)
      setValidateDefault(true);
    }
    if (!users) {
      const fetch = await api_call('GET', `/api/v1/users`);
      setUsers(fetch);
    }
  });

  const handleSubmit = async event => {
    event.preventDefault();
    
    if (checkValidations(validation)) {
      if (props.type === 'register') {
        const fetch = await api_call('POST', '/api/v1/users', { user: field, });
        setResponse(fetch);
        props.history.push('/');
      } else if (props.type === 'update') {
        const fetch = await api_call('PATCH', `/api/v1/users/${props.session.user.id}`, { user: field, });
        setResponse(fetch);
      }
      else {
        console.log('Incorrect path');
      }
    }
    else {
      console.log('Not passed validations');
    }
  };

  const handleChange = event => {
    setField({
      ...field,
      [event.target.name]: event.target.value
    });

    validateField(event.target.name, event.target.value, field,
      validation, setValidation, users, props.session.user.username
    );
  };

  const visibilityToggle = () => {
    setVisiblePassword(visiblePassword ? false : true);
  };

  return (
    <>
      <form className="all-fields" onSubmit={handleSubmit}>
        {props.show.username ?
          <>
            <input className="blue-focus" id="username"
              type="text" name="username" placeholder={lang('placeholders.user')}
              value={field ? field.username : ''} onChange={handleChange} required
              autoComplete="off"
            />
            {validation && validation.username.uniqueness.verify === 'bad' ||
             response && response.error && response.error.username.includes('uniqueness') ?
              <p>{lang('error.uniqueness')}</p> : null
            }
            {validation && validation.username.length.verify === 'short' ||
             response && response.error && response.error.username.includes('short') ?
              <p>{lang('val.user.short')}</p>
            :validation && validation.username.length.verify === 'long' ||
             response && response.error && response.error.username.includes('long') ?
              <p>{lang('val.user.long')}</p>
            :
              null
            }
            {validation && validation.username.characters.verify === 'bad' ||
             response && response.error && response.error.username.includes('format') ?
              <p>{lang(('val.user.special'))}</p> : null
            }
            
          </>
        :
          null
        }
        {props.show.email ?
          <>
            <input
              type="email" name="email" placeholder={lang('placeholders.email')}
              value={field ? field.email : ''} onChange={handleChange} required
            />
          </>
        :
          null
        }
        {props.show.password ?
          <>
            <input
              type={visiblePassword ? "text" : "password"} name="password" placeholder={lang('placeholders.password')}
              value={field ? field.password : ''} onChange={handleChange} required
            />
            <p onClick={visibilityToggle}>eye icon mock</p>
            <p>
              {lang('val.password.length')}:
              {validation && validation.password.length.verify === 'good' ?
                <span className="good">  :D</span> : <span className="bad">  :|</span>}
            </p>
            <p>
              {lang('val.password.lower_c')}:
              {validation && validation.password.characters.lower_case.verify === 'good' ? 
                <span className="good">  :D</span> : <span className="bad">  :|</span>}
            </p>
            <p>
              {lang('val.password.upper_c')}:
              {validation && validation && validation.password.characters.upper_case.verify === 'good' ?
                <span className="good">  :D</span> : <span className="bad">  :|</span>}
            </p>
            <p>
              {lang('val.password.number')}:
              {validation && validation.password.characters.number.verify === 'good' ?
                <span className="good">  :D</span> : <span className="bad">  :|</span>}
            </p>
            <p>
              {lang('val.password.special')}:
              {validation && validation.password.characters.special.verify === 'good' ?
                <span className="good">  :D</span> : <span className="bad"> :|</span>}
            </p>
          </>
        :
          null
        }
        {props.show.password_confirmation ?
          <>
            <input
              type={visiblePassword ? "text" : "password"} name="password_confirmation" placeholder={lang('placeholders.password_confirmation')}
              value={field ? field.password_confirmation : ''} onChange={handleChange} required
            />
            {validation && validation.password_confirmation.match.verify === 'bad' ?
              <p>{lang('val.password_confirmation')}</p>
            :
              null
            }
          </>
        :
          null
        } <br/>
        <button className="submit" type="submit">{lang(`buttons.${props.type}`)}</button>
      </form>
      {response && response.status === 'NOT_AUTH' ?
        <Authenticate />
      :
        null
      }
    </>
  );
};

export default AllFields;