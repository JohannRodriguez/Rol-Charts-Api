import React, { useState, useEffect } from 'react';
import Authenticate from './Authenticate';
import register_call from './api_calls/register_call';
import update_call from './api_calls/update_call';
import validateField, { checkValidations, createStates, defaultFields } from './helpers/all_fields_helper';

const AllFields = props => {
  const [response, setResponse] = useState(null);
  const [visiblePassword, setVisiblePassword] = useState(false);
  const [field, setField] = useState(null);
  const [validation, setValidation] = useState(null);
  const [validateDefault, setValidateDefault] = useState(false);

  useEffect(() => {
    if (!props.user.data && !validation && !field) {
      createStates(props.show, props.display, setValidation, setField);
    }
    if (field && !validateDefault) {
      defaultFields(field, validation, setValidation)
      setValidateDefault(true);
    }
    if (response && response.status === 'SUCCES') {
      window.location.reload();
    }
  });

  const handleSubmit = event => {
    event.preventDefault();
    
    if (checkValidations(validation)) {
      if (props.type === 'register') {
        register_call(field, setResponse);
      } else if (props.type === 'update') {
        update_call(field, 'user', 'patch', `/api/v1/users/${props.user.id}`, setResponse);
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

    validateField(event.target.name, event.target.value, field, validation, setValidation);
  };

  const visibilityToggle = () => {
    setVisiblePassword(visiblePassword ? false : true);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        {props.show.username ?
          <>
            <input
              type="text"
              name="username"
              placeholder="User name"
              value={field ? field.username : ''}
              onChange={handleChange}
              required
            /> <br/>
            {validation ? 
              <>
              {validation.username.length.verify != 'good' ?
                <p>{validation.username.length.verify}</p> : null
              }
              {validation.username.characters.verify != 'good' ?
                <p>{validation.username.characters.verify}</p> : null
              }
              </>
            :
              null
            }
          </>
        :
          null
        }
        {props.show.email ?
          <>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={field ? field.email : ''}
              onChange={handleChange}
              required
            /> <br/>
          </>
        :
          null
        }
        {props.show.password ?
          <>
            <input
              type={visiblePassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={field ? field.password : ''}
              onChange={handleChange}
              required
              
            />
            <p onClick={visibilityToggle}>eye icon mock</p>
            {validation ? 
              <>
              <p>Length: {validation.password.length.verify === 'good' ? ':D': '·-·'}</p>
              <p>Lower Caser: {validation.password.characters.lower_case.verify === 'good' ? ':D': '·-·'}</p>
              <p>Upper Caser: {validation.password.characters.upper_case.verify === 'good' ? ':D': '·-·'}</p>
              <p>Number: {validation.password.characters.number.verify === 'good' ? ':D': '·-·'}</p>
              <p>Special Character: {validation.password.characters.special.verify === 'good' ? ':D': '·-·'}</p>
              </>
            :
              null
            }
          </>
        :
          null
        }
        {props.show.password ?
          <>
            <input
              type={visiblePassword ? "text" : "password"}
              name="password_confirmation"
              placeholder="Confirm Password"
              value={field ? field.password_confirmation : ''}
              onChange={handleChange}
              required
            /> <br/>
            {validation ?
              <p>{validation.password_confirmation.match.verify || null}</p>
            : null }
          </>
        :
          null
        }
        <button type="submit">{props.type}</button>
      </form>
      {!response ? null :
      response.status === 'NOT_AUTH' ?
        <Authenticate />
      :
        null
      }
    </>
  );
};

export default AllFields;