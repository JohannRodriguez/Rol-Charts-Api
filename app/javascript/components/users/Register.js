import React from 'react'
import AllFields from './AllFields';

const Register = props => {
  return (
    <div className="register">
      <h1>Register</h1>
      <AllFields {...props} type={'register'}/>
    </div>
  )
}

export default Register
