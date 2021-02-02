// Import Packages
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

// Import Components
import Errors from '../Errors';
import Gender from '../Gender';
import { getFields, submit, validationChange } from '../helpers/handler';
import validationFields from '../helpers/validationFields';

const Account = props => {
  const [lang] = useTranslation('settings');
  const [ph] = useTranslation('placeholders');

  const [fields, setFields] = useState({});
  const [response, setResponse] = useState({});
  const [validation, setValidation] = useState({
    username: { first: true }, email: { first: true }
  });

  useEffect(() => {
    if (response.status) {
      props.setResponse(response);
      setResponse({});
    }
    if (Object.keys(fields).length === 0) {
      validationFields({
        username: props.user.username,
        email: props.user.email,
        gender: props.user.gender,
      }, setFields, true);
    }
  });

  e => submit(e, 'PATCH', `/api/v1/users/${props.user.id}`, getFields(fields, 'user'), setResponse)
  return (
    <form onSubmit={e => submit(e, 'PATCH', `/api/v1/users/${props.user.id}`, getFields(fields, 'user'), setResponse)}>
      <div className="dfi-bv01 f-gbv01">
        <input className="fi-bv01"
          type="text" name="username"
          placeholder={ph('username')}
          value={fields.username ? fields.username.field : ''}
          onChange={e => validationChange(e, fields, setFields, validation, setValidation)}
        />
      </div>
      {Object.keys(validation).length > 0 ?
        <Errors type='username' error={Array.isArray(validation.username) ? validation.username : null } />
      :
        <Errors type='username' error={response.error ? response.error.username : null} />
      }
      <div className="dfi-bv01 f-gbv01">
        <input className="fi-bv01"
          type="email" name="email"
          placeholder={ph('email')}
          value={fields.email ? fields.email.field : ''}
          onChange={e => validationChange(e, fields, setFields, validation, setValidation)}
        />
      </div>
      {Object.keys(validation).length > 0 ?
        <Errors type='email' error={Array.isArray(validation.email) ? validation.email : null } />
      :
        <Errors type='email' error={response.error ? response.error.email : null} />
      }
      <Gender change={e => validationChange(e, fields, setFields, validation, setValidation)} default={props.user.gender} />
      <button type="submit">{lang('account.button')}</button>
    </form>
  )
};

export default Account;
