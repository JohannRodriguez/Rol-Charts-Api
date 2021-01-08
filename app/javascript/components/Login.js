import React, { useState } from 'react';
import { default as callApi } from 'axios';

const Login = () => {
  const [field, setField] = useState({
    email: '',
    password: '',
    registrationErrors: '',
  });

  const handleSubmit = event => {
    event.preventDefault();

    const { email, password } = field;
    callApi
      .post(
        '/api/v1/sessions',
        {
          user: {
            email: email,
            password: password,
          },
        },
        { withCredentials: true }
      )
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log('registration error', error);
      })
  };

  const handleChange = event => {
    setField({
      ...field,
      [event.target.name]: event.target.value
    });
  };

  return (
    <>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={field.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={field.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Login</button>
      </form>
    </>
  );
};

export default Login;
