import React, { useState } from 'react';
import { default as api } from 'axios';

const Home = props => {
  const logout = () => {
    api
      .delete('/api/v1/logout', { withCredentials: true })
      .then(response => {
        console.log(response);
        props.handleLogout();
      })
      .catch(error => console.log(error));
  };

  return(
    <>
      <h1>Home</h1>
      <h2>{props.user}</h2>
      <button onClick={() => logout()}>Logout</button>
    </>
  );
};

export default Home;
