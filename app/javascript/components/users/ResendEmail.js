import React, { useState } from 'react'
import resend_email_call from './api_calls/resend_email_call';

const ResendEmail = () => {
  const [response, setResponse] = useState(null);
  const [field, setField] = useState({
    email: '',
  });

  const resend = event => {
    event.preventDefault();

    resend_email_call(field, setResponse);
  };

  const handleChange = event => {
    setField({
      ...field,
      [event.target.name]: event.target.value
    });
  };

  return (
    <>
      <h1>Resend email</h1>
      <form onSubmit={resend}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={field.email}
          onChange={handleChange}
          required
        />
        <button type="submit">Resend Email</button>
      </form>
      {response === '5-00' ?
        <p>Email was succesfully resended</p>
      : response === '5-01' ?
        <p>This email has already been verified</p>
      : response === '5-11' ?
        <p>Not user found with this email</p>
      :
        <p>{response}</p>
      }
    </>
  )
}

export default ResendEmail;
