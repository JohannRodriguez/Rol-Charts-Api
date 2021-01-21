// Import Packages
import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

// Import Components
import AllFields from './AllFields';
import Destroy from '../global/Destroy';

const Settings = props => {
  const [lang] = useTranslation('settings');

  const [modal, setModal] = useState(true);

  return (
    <>
      {props.session.log === 'LOGGED_IN' ?
      <>
      <main className="settings">
        <div className="menu">
          <div className="menu-btn" onClick={() => {props.history.push({ search: '?tab=account'})}}>
            <span>{lang('menu.account')}</span>
          </div>
          <div className="menu-btn" onClick={() => {props.history.push({ search: '?tab=security'})}}>
            <span>{lang('menu.security')}</span>
          </div>
        </div>
        <div>
        {props.location.search === '?tab=account' ?
        <>
          <h2>{lang('titles.account')}</h2>
          <AllFields {...props}
            type={'update'}
            show={{ username: true, }}
            display={{ username: props.session.user.username }}
          />
          <div className="danger">
            <p className="delete-btn"
              onClick={() => {setModal(true)}}>{lang('buttons.destroy')}</p>
          </div>
        </>
        : props.location.search === '?tab=security' ?
          <p>{lang('titles.security')}</p>
        :null
        }
        </div>
      </main>
      <Destroy modal={modal} setModal={setModal}
        message={lang('destroy.message')}
        type="users" id={props.session.user.id} 
        confirmDestroy={`${lang('destroy.type')}/${props.session.user.username}`}
      />
      </>
      :
        <Redirect to='/login' />
      }
    </>
  );
};

export default Settings;
