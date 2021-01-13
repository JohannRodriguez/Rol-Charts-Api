import React, { useState } from 'react';
import authenticate_call from './api_calls/authenticate_call';

const Authenticate = () => {
  const [field, setField] = useState({password: ''});
  const [response, setResponse] = useState(null);

  const handleSubmit = event => {
    event.preventDefault();

    authenticate_call(field, setResponse);
  };

  const handleChange = event => {
    setField({
      ...field,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <div>
      { response != 'USER-AUTH' ?
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
          {response === 'AUTH-BAD-PASSWORD' ?
            <p>Inconrrect password</p>
          :
          response === 'AUTH_NO_USER_FOUND' ?
            <p>User not found</p>
          :
            null
          }
        </>
      :
        <p>User was succesfully autheticated</p>
      }
    </div>
  );
};

export default Authenticate;
