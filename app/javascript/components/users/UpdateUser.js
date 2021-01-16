// Import Packages
import React from 'react';
import { useTranslation } from 'react-i18next';

// Import Components
import AllFields from './AllFields';

const UpdateUser = props => {
  const [lang] = useTranslation('settings');

  return (
    <div className="update">
      <h1>{lang('account.title')}</h1>
      <AllFields {...props}
        type={'update'}
        button={lang('buttons.account')}
        show={{ username: true, password: true, password_confirmation: true}}
        display={{ username: props.session.user.username }}
      />
    </div>
  )
}

export default UpdateUser;
