// Import Packages
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Errors from '../Errors';
import Gender from '../Gender';
import { validationChange } from '../helpers/handleChange';
import validationFields from '../helpers/validationFields';

const Account = props => {
  const [ph] = useTranslation('placeholders');

  const [fields, setFields] = useState({});
  const [validation, setValidation] = useState({
    username: { first: true }, email: { first: true }
  });

  useEffect(() => {
    if (Object.keys(fields).length === 0) {
      validationFields({
        username: props.user.username,
        email: props.user.email,
        gender: props.user.gender,
      }, setFields, true);
    }
  });

  return (
    <form>
      <div className="dfi-bv01 f-gbv01">
        <input className="fi-bv01"
          type="username" name="username"
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
    </form>
  )
};

export default Account;
