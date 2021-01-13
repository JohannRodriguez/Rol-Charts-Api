import React, { useState, useEffect } from 'react';
import Authenticate from '../users/Authenticate';
import destroy_call from './api_calls/destroy_call';

const Destroy = props => {
  const [modal, setModal] = useState(false);
  const [response, setResponse] = useState(null);
  const [field, setField] = useState({
    destroy: '',
  });

  const handleSubmit = event => {
    event.preventDefault();

    if (field.destroy === props.confirmDestroy) {
      destroy_call(props.type, props.id, setResponse);
    }
  };

  const handleChange = event => {
    setField({
      ...field,
      [event.target.name]: event.target.value
    });
  };

  const openModal = () => {
    setModal(true);
  };
  const closeModal = () => {
    setModal(false);
  };

  useEffect(() => {
    if (response === 'USER-DELETED') {
      {props.history.push('/login')}
    }
  });

  return (
    <div className={`destroy_${props.type}`}>
      <button onClick={openModal}>Delete Account</button>
      {modal ?
        <div className={`destroy_${props.type}_modal`}>
          <form onSubmit={handleSubmit}>
            <p>Write {props.confirmDestroy} below to delete it permanently</p>
            <input
              type="text"
              name="destroy"
              value={field.destroy}
              onChange={handleChange}
              required
            />
            <button type="submit">destroy</button>
            <p onClick={closeModal}>X</p>
          </form>
          {response === 'USER_NOT_AUTH' ?
            <Authenticate />
          :
            null
          }
        </div>
      : null}
    </div>
  )
};

export default Destroy;
