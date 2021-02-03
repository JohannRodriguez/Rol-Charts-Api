// Import Packages
import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

// Import Components
import Account from './settings/Account';
import Destroy from '../global/Destroy';
import Authenticate from './Authenticate';
import Security from './settings/Security';

const Settings = props => {
  const [lang] = useTranslation('settings');

  const [deleteModal, setDeleteModal] = useState(false);
  const [response, setResponse] = useState({});
  const [modal, setModal] = useState(false);

  useEffect(() => {
    if (response.status === 'NOT_AUTH') {
      setModal(true);
      setResponse({});
    }
  });

  return (
    <>{props.session.log === 'LOGGED_IN' ?
      <>
      <main className="settings">
        <div className="menu">
          <h2>{lang('title')}</h2>
          <div
            className={props.location.search === '?tab=account' ?
              'highlight menu-btn' : 'menu-btn'}
            onClick={() => {props.history.push({ search: '?tab=account'})}}
          >
            <span>{lang('menu.account')}</span>
          </div>
          <div
            className={props.location.search === '?tab=security' ?
              'highlight menu-btn' : 'menu-btn'}
            onClick={() => {props.history.push({ search: '?tab=security'})}}
          >
            <span>{lang('menu.security')}</span>
          </div>
        </div>
        <div className="tabs">
          {props.location.search === '?tab=account' ?
          <>
            <h2>{lang('titles.account')}</h2>
            <div className="arguments">
              <Account user={props.session.user} setResponse={setResponse} />
              <div className="danger">
                <button className="delete-btn"
                  onClick={() => {setDeleteModal(true)}}>{lang('buttons.destroy')}</button>
              </div>
            </div>
          </>
          : props.location.search === '?tab=security' ?
          <> 
            <h2>{lang('titles.security')}</h2>
            <div className="arguments">
              <Security user={props.session.user} setResponse={setResponse} />
            </div>
          </>
          :null
          }
        </div>
      </main>
      <Destroy modal={deleteModal} setModal={setDeleteModal}
        message={lang('destroy.message')}
        type="users" id={props.session.user.id} 
        confirmDestroy={`${lang('destroy.type')}/${props.session.user.username}`}
      />
      <Authenticate modal={modal} setModal={setModal} />
      </>
    : <Redirect to='/login' />}</>
  );
};

export default Settings;
