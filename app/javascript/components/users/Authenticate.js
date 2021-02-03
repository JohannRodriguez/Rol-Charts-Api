// Import Packages
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

// Import Components
import api_call from '../../api/api_call';

const Authenticate = props => {
  const [lang] = useTranslation('authenticate');

  const [field, setField] = useState({password: ''});
  const [response, setResponse] = useState({});

  const handleSubmit = async event => {
    event.preventDefault();

    const fetch = await api_call('POST', '/api/v1/authenticate', {user: field});
    setResponse(fetch);
  };

  const handleChange = event => {
    setField({
      ...field,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <>{props.modal ?
      <div>
        {response.status === 'USER_AUTH' ?
          <p>{lang('success')}</p>
        :
          <>
            <h1>{lang('title')}</h1>
            <p onClick={() => props.setModal(false)}>x</p>
            <form onSubmit={handleSubmit}>
              <input
                type="password"
                name="password"
                placeholder={lang('placeholder')}
                value={field.password}
                onChange={handleChange}
                required
              />
              <button type="submit">{lang('button')}</button>
            </form>
            {response.status === 'BAD_PASSWORD' ?
              <p>{lang('errors.password')}</p>
            : response.status === 'NO_USER_FOUND' ?
              <p>{lang('errors.user')}</p>
            :
              null
            }
          </>
        }
      </div>
    : null}</>
  );
};

export default Authenticate;
