// Import Packages
import React from 'react'
import { Redirect } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

// Import Components
import AllFields from './AllFields';

const Register = props => {
  const [lang] = useTranslation('register');

  return (
    <div className="register">
      {props.session.log === 'LOGGED_IN' ?
        <Redirect to='/' />
      :
        <>
          <h1>{lang('title')}</h1>
          <AllFields {...props}
            type={'register'}
            show={{ username: true, email: true, password: true, password_confirmation: true}}
            display={{}}
          />
          <button onClick={() => {props.history.push('/login')}}>{lang('button')}</button>
        </>
      }
     
    </div>
  )
}

export default Register
