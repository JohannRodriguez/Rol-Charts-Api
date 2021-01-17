// Import Packages
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

// Import Components
import api_call from '../../api/api_call';

const ConfirmEmail = props => {
  const [lang] = useTranslation('email');
  const [token] = useState(props.location.search.split('?token=')[1] || null);
  const [response, setResponse] = useState('No token detected');

  useEffect(async () => {
    if (token) {
      const fetch = await api_call('POST', '/api/v1/email_confirmation', {token: token});
      setResponse(fetch.status);
    }
  });

  return (
    <>
      {response === 'SUCCESS' ? 
        <h2>{lang('confirm.success')}</h2>
      : response === 'NOT_FOUND' ?
        <h2>{lang('confirm.error')}</h2>
      :
        <h2>{lang('confirm.no_token')}</h2>
      }
    </>
  );
};

export default ConfirmEmail;