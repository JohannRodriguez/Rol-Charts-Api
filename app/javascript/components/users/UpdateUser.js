// Import Packages
import React from 'react';
import { useTranslation } from 'react-i18next';

// Import Components

const UpdateUser = props => {
  const [lang] = useTranslation('settings');

  return (
    <div className="update">
      <h1>{lang('account.title')}</h1>
    </div>
  )
}

export default UpdateUser;
