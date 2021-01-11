import React, { useState } from 'react';
import authenticate_call from './api_calls/authenticate_call';

const Authenticate = props => {
  const [state, setState] = useState({
    password: '',
    response: '',
  });

  const handleSubmit = event => {
    event.preventDefault();

    authenticate_call(state, setState);
  };

  const handleChange = event => {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <>
      { props.modal ?
      <div>
        <h1>Authenticate</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={state.password}
            onChange={handleChange}
            required
          />
          <button type="submit">Authenticate</button>
        </form>
      </div>
      : null }
    </>
  );
};

export default Authenticate;
