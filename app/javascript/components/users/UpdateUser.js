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
      <AllFields {...props} type={'update'}/>
    </div>
  )
}

export default UpdateUser;
