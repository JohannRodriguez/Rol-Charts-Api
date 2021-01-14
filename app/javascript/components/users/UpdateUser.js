import React, { useEffect } from 'react';
import AllFields from './AllFields';

const UpdateUser = props => {
  useEffect(() => {
    if (props.user.data === 'none') {
      {props.history.push('/login')}
    }
  });

  return (
    <div className="update">
      <h1>Update</h1>
      <AllFields {...props}
        type={'update'}
        show={{ username: true, password: true, password_confirmation: true}}
        display={{ username: props.user.username }}
      />
    </div>
  )
}

export default UpdateUser;
