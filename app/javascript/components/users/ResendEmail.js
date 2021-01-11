import React, { useState } from 'react'
import { default as api } from 'axios';

const ResendEmail = () => {
  const [field, setField] = useState({
    email: '',
    registrationErrors: '',
  });

  const resend = event => {
    event.preventDefault();
    const { email } = field;
    api
      .post(
        '/api/v1/email_resend',
        { user: { email: email}},
        { withCredentials: true }
      )
      .then(response => console.log(response))
      .catch(error => console.log(error))
    ;
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
    </>
  )
}

export default ResendEmail;
