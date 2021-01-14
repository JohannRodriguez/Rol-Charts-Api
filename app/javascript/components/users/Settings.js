import React from 'react';
import UpdateUser from './UpdateUser';
import Destroy from '../global/Destroy';



const Settings = props => {
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
      </>
      }
    </div>
  );
};

export default Settings;
