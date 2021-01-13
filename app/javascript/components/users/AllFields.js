import React, { useState } from 'react';
import register_call from './api_calls/register_call';
import update_call from './api_calls/update_call';
import validateField, { checkValidations } from './helpers/all_fields_helper';

const AllFields = props => {
  const [response, setResponse] = useState(null);
  const [visiblePassword, setVisiblePassword] = useState(false);
  const [field, setField] = useState({
    username: '',
    email: '',
    password: '',
    password_confirmation: '',
  });
  const [validation, setValidation] = useState({
    username: {
      length: {
        verify: null,
        min: 3,
        max: 16,
      },
      characters: {
        verify: null,
        special: {
          verify: null,
          regex: /[¿¡`!@#$%^&*()+\-=\[\]{};':"\\|,.<>\/?~]/,
          response: 'bad',
        },
      },
    },
    password: {
      length: {
        verify: null,
        min: 8,
        max: 28,
      },
      match: {
        verify: null,
        compare: 'password_confirmation',
      },
      characters: {
        verify: null,
        lower_case: {
          verify: null,
          regex: /[a-z]/,
          response: 'good',
        },
        upper_case: {
          verify: null,
          regex: /[A-Z]/,
          response: 'good',
        },
        special: {
          verify: null,
          regex: /[¿¡`!@#$%^&*()+\-=\[\]{};':"\\|,.<>\/?~]/,
          response: 'good',
        },
        number: {
          verify: null,
          regex: /[0-9]/,
          response: 'good',
        },
      },
    },
    password_confirmation: { match: { verify: null, compare: 'password', } },
  });

  const handleSubmit = event => {
    event.preventDefault();
    
    console.log(validation);
    console.log(checkValidations(validation));
    // if (checkFields(validation, field)) {
    //   if (props.type === 'register') {
    //     register_call(field, setResponse);
    //   } else if (props.type === 'update') {
    //     update_call(field, setResponse);
    //   }
    // }
    // else {
    //   console.log('Not passed validations');
    // }
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
        <input
          type="text"
          name="username"
          placeholder="User name"
          value={field.username}
          onChange={handleChange}
          required
        /> <br/>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={field.email}
          onChange={handleChange}
          required
        /> <br/>
        <input
          type={visiblePassword ? "text" : "password"}
          name="password"
          placeholder="Password"
          value={field.password}
          onChange={handleChange}
          required
        /> <p onClick={visibilityToggle}>eye icon mock</p> <br/>
        <input
          type={visiblePassword ? "text" : "password"}
          name="password_confirmation"
          placeholder="Confirm Password"
          value={field.password_confirmation}
          onChange={handleChange}
          required
        />
        <br/>
        <button type="submit">{props.type}</button>
      </form>
    </>
  );
};

export default AllFields;