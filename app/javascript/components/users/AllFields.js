import React, { useState, useEffect } from 'react';
import register_call from './api_calls/register_call';
import update_call from './api_calls/update_call';
import validateField, { checkValidations, createValidations } from './helpers/all_fields_helper';

const AllFields = props => {
  
  const [response, setResponse] = useState(null);
  const [visiblePassword, setVisiblePassword] = useState(false);
  const [field, setField] = useState({
    username: props.username_field || '',
    email: '',
    password: '',
    password_confirmation: '',
  });
  const [validation, setValidation] = useState(null);

  useEffect(() => {
    if (!validation) {
      createValidations(props.show, setValidation);
    }
  });

  const handleSubmit = event => {
    event.preventDefault();
    
    if (checkValidations(validation)) {
      if (props.type === 'register') {
        register_call(field, setResponse);
      } else if (props.type === 'update') {
        update_call(field, setResponse);
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
              value={field.username}
              onChange={handleChange}
              required
            /> <br/>
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
              value={field.email}
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
              value={field.password}
              onChange={handleChange}
              required
            /> <p onClick={visibilityToggle}>eye icon mock</p>
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
              value={field.password_confirmation}
              onChange={handleChange}
              required
            />
        <br/>
          </>
        :
          null
        }
        <button type="submit">{props.type}</button>
      </form>
    </>
  );
};

export default AllFields;