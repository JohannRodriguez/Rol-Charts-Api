import React, { useState, useEffect } from 'react';
import register_call from './api_calls/register_call';
import validateField from './helpers/register_helper';

const Register = () => {
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
      length: null,
      characters: null,
    },
    password: {
      min: null,
      cap: null,
      s_char: null,
      number: null,
      length: null,
    },
    password_confirmation: { match: null },
  });

  const handleSubmit = event => {
    event.preventDefault();

    const val_arr = Object.values(validation);
    let val_pass = true;
    for (let i = 0; i < val_arr.length; i++) {
      let val_arr_child = Object.values(val_arr[i]);
      for (let i = 0; i < val_arr_child.length; i++) {
        if (val_arr_child[i] != 'correct') {
          val_pass = false;
          break;
        }
      }
    }
    if (val_pass) {
      register_call(field, setResponse)
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

    validateField(event.target.name, event.target.value, validation, setValidation, field);
  };

  const visibilityToggle = () => {
    setVisiblePassword(visiblePassword ? false : true);
  };

  return (
    <>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="User name"
          value={field.username}
          onChange={handleChange}
          required
        /> <br/>
        {validation.username.length ? <p>{validation.username.length}</p> : null}
        {validation.username.characters ? <p>{validation.username.characters}</p> : null}
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
        <p>Contains lower case:{validation.password.min ? <span> :D</span> : <span> X</span>}</p>
        <p>Contains upper case:{validation.password.cap ? <span> :D</span> : <span> X</span>}</p>
        <p>Contains a special character:{validation.password.s_char ? <span> :D</span> : <span> X</span>}</p>
        <p>Contains a number:{validation.password.number ? <span> :D</span> : <span> X</span>}</p>
        {validation.password.length ? <p>{validation.password.length}</p> : null}
        <input
          type={visiblePassword ? "text" : "password"}
          name="password_confirmation"
          placeholder="Confirm Password"
          value={field.password_confirmation}
          onChange={handleChange}
          required
        />
        {validation.password_confirmation.match ? <p>{validation.password_confirmation.match}</p> : null}
        <br/>
        <button type="submit">Register</button>
      </form>
    </>
  );
};

export default Register;