import React, { useState } from 'react';
import { default as api } from 'axios';

const Authenticate = () => {
  const [field, setField] = useState({
    password: '',
    registrationErrors: '',
  });

  const handleSubmit = event => {
    event.preventDefault();

    const { password } = field;
    api
      .post(
        '/api/v1/authenticate',
        {
          user: {
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
      <h1>Authenticate</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={field.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Authenticate</button>
      </form>
    </>
  );
};

export default Authenticate;

