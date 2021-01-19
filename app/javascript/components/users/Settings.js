// Import Packages
import React from 'react';
import { Redirect } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

// Import Components
import Destroy from '../global/Destroy';
import UpdateUser from './UpdateUser';

const Settings = props => {
  const [lang] = useTranslation('settings');

  return (
    <div>
      {props.session.log === 'NOT_LOGGED_IN' ?
        <Redirect to='/login' />
      :
      <>
        <h1>{lang('title')}</h1>
        <h2>{props.session.user.username}</h2>
        <button onClick={() => {props.history.push('/')}}>{lang('button')}</button>
        <UpdateUser {...props} />
        <Destroy history={props.history} type="users" id={props.session.user.id} confirmDestroy={`${lang('destroy')}/${props.session.user.username}`} />
      </>
      }
    </div>
  );
};

export default Settings;
