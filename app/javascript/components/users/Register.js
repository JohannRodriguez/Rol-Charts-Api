import React from 'react'
import AllFields from './AllFields';

const Register = props => {
  return (
    <div className="register">
      {props.session.log === 'LOGGED_IN' ?
        <Redirect to='/' />
      :
        <>
          <h1>Register</h1>
          <AllFields
            type={'register'}
            show={{ username: true, email: true, password: true, password_confirmation: true}}
          />
          <button onClick={() => {<Redirect to='/login' />}}>Login</button>
        </>
      }
     
    </div>
  )
}

export default Register
