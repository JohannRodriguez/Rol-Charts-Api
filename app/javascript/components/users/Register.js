import React from 'react'
import { Redirect } from 'react-router-dom';

import AllFields from './AllFields';

const Register = props => {
  return (
    <div className="register">
      {props.session.log === 'LOGGED_IN' ?
        <Redirect to='/' />
      :
        <>
          <h1>Register</h1>
          <AllFields {...props}
            type={'register'}
            show={{ username: true, email: true, password: true, password_confirmation: true}}
            display={{}}
          />
          <button onClick={() => {props.history.push('/login')}}>Login</button>
        </>
      }
     
    </div>
  )
}

export default Register
