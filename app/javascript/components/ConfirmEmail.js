import React, { useState, useEffect } from 'react';
import { default as api } from 'axios';

const ConfirmEmail = props => {
  const [token] = useState(props.location.search.split('?confirm_token=')[1]);

  const confirmEmail = () => {
      {confirmEmail}
      api
      .post('/api/v1/email_confirmation', { token: token }, { withCredentials: true })
      .then(response => console.log(response))
      .catch(error => console.log(error))
    ;
  }

  useEffect(() => confirmEmail());

  return (
    <>
      <h1>Confirm Email</h1>
    </>
  );
};

export default ConfirmEmail;