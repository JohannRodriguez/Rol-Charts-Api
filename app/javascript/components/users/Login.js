import React, { useState } from 'react';
import login_call from './api_calls/login_call';

const Login = () => {
  const [field, setField] = useState({
    email: '',
    password: '',
  });

  const [response, setResponse] = useState(null);

  const handleSubmit = event => {
    event.preventDefault();

    login_call(field, setResponse);
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
      <p>{response}</p>
    </>
  );
};

export default Login;
