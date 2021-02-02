// Import Packages
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

// Import Components
import Errors from '../Errors';
import { getFields, submit, validationChange } from '../helpers/handler';
import validationFields from '../helpers/validationFields';

const Security = props => {
  const [lang] = useTranslation('settings');
  const [ph] = useTranslation('placeholders');

  const [fields, setFields] = useState({});
  const [response, setResponse] = useState({});
  const [validation, setValidation] = useState({
    password: { first: true }, password_confirmation: { first: true }
  });

  useEffect(() => {
    console.log(fields);
    if (response.status) {
      props.setResponse(response);
      setResponse({});
    }
    if (Object.keys(fields).length === 0) {
      validationFields({
        password: '',
        password_confirmation: '',
      }, setFields);
    }
  });

  return (
    <form onSubmit={e => submit(e, 'PATCH', `/api/v1/users/${props.user.id}`, getFields(fields, 'user'), setResponse)}>
      <div className="dfi-bv01 f-gbv01">
        <input className="fi-bv01"
          type="password" name="password"
          placeholder={ph('password')}
          value={fields.password ? fields.password.field : ''}
          onChange={e => validationChange(e, fields, setFields, validation, setValidation)}
        />
      </div>
      {Object.keys(validation).length > 0 ?
        <Errors type='password' error={Array.isArray(validation.password) ? validation.password : null } />
      :
        <Errors type='password' error={response.error ? response.error.password : null} />
      }
      <div className="dfi-bv01 f-gbv01">
        <input className="fi-bv01"
          type="password" name="password_confirmation"
          placeholder={ph('password_confirmation')}
          value={fields.password_confirmation ? fields.password_confirmation.field : ''}
          onChange={e => validationChange(e, fields, setFields, validation, setValidation)}
        />
      </div>
      {Object.keys(validation).length > 0 ?
        <Errors type='password_confirmation' error={Array.isArray(validation.password_confirmation) ? validation.password_confirmation : null } />
      :
        <Errors type='password_confirmation' error={response.error ? response.error.password_confirmation : null} />
      }
      <button type="submit">{lang('security.button')}</button>
    </form>
  )
};

export default Security;
