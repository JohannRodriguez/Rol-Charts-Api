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
      {props.user ?
        <>
        <h1>Update</h1>
        <AllFields {...props}
          type={'update'}
          show={{ username: true, password: true, password_confirmation: true}}
        />
        </>
      : null
      }
    </div>
  )
}

export default UpdateUser;
