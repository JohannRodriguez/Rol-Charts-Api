import React, { useEffect } from 'react';
import UpdateUser from './UpdateUser';
import Destroy from '../global/Destroy';



const Settings = props => {
  useEffect(() => {
    if (props.user.data === 'none') {
      props.history.push('/login')
    }
  });

  return (
    <div>
      <h1>Settings</h1>
      <h2>{props.user.username}</h2>
      <UpdateUser {...props} />
      <Destroy history={props.history} type="users" id={props.user.id} confirmDestroy={`destroy-${props.user.username}'s-account`} />
    </div>
  );
};

export default Settings;
