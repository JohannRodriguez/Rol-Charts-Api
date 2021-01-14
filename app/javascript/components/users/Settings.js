import React from 'react';
import { useTranslation } from 'react-i18next';

import UpdateUser from './UpdateUser';
import Destroy from '../global/Destroy';

const Settings = props => {
  const [lang, trans] = useTranslation(['global', 'something']);

  return (
    <div>
      { props.user.data === 'undefined' ?
        null
      : props.user.data === 'none' ?
        <Redirect to='/login' />
      :
      <>
        <h1>Settings</h1>
        <h2>{props.user.username}</h2>
        <UpdateUser {...props} />
        <Destroy history={props.history} type="users" id={props.user.id} confirmDestroy={`destroy-${props.user.username}'s-account`} />
        <h1>{lang('title')}</h1>
        <h1>{lang('something:smht')}</h1>
        <button onClick={() => trans.changeLanguage('es')}>Español</button>
        <button onClick={() => trans.changeLanguage('en')}>English</button>
      </>
      }
    </div>
  );
};

export default Settings;
