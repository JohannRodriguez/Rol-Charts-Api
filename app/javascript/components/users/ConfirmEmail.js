import React, { useState, useEffect } from 'react';
import confirm_email_call from './api_calls/confirm_email_call';

const ConfirmEmail = props => {
  const [token] = useState(props.location.search.split('?token=')[1]);
  const [response, setResponse] = useState('No token detected');

  

  useEffect(() => {
    if (token) {
      confirm_email_call(token, setResponse);
    }
  });

  return (
    <>
      {response === 'succes' ? 
        <>
          <h2>Your email was succesfully verified, you can close this tab and login to your account</h2>
        </>
      : response === 'failure' ?
        <>
          <h2>Soemthing went wrong, this email is already verified or you request to resend the verification</h2>
        </>
      :
        <>
          <h2>{response}</h2>
        </>
      }
    </>
  );
};

export default ConfirmEmail;