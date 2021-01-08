import React, { useState } from 'react';
import { default as callApi } from 'axios';

const Register = () => {
  const [field, setField] = useState({
    username: '',
    email: '',
    password: '',
    password_confirmation: '',
    registrationErrors: '',
  });

  const handleSubmit = event => {
    const { username, email, password, password_confirmation } = field;
    callApi
      .post(
        '/api/v1/users',
        {
          user: {
            username: username,
            email: email,
            password: password,
            password_confirmation: password_confirmation,
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
    event.preventDefault();
  };

  const handleChange = event => {
    setField({
      ...field,
      [event.target.name]: event.target.value
    });
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
        />
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
        <input
          type="password"
          name="password_confirmation"
          placeholder="Confirm Password"
          value={field.password_confirmation}
          onChange={handleChange}
          required
        />
        <button type="submit">Register</button>
      </form>
    </>
  );
};

export default Register;