import React from 'react'
import AllFields from './AllFields';

const Register = props => {
  return (
    <div className="register">
      <h1>Register</h1>
      <AllFields {...props}
        type={'register'}
        show={{ username: true, email: true, password: true, password_confirmation: true}}
      />
      <button onClick={() => {props.history.push('/login');}}>Login</button>
    </div>
  )
}

export default Register
