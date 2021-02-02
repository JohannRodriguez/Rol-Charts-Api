// Import Packages
import React from 'react';
import { useTranslation } from 'react-i18next';

import { getFields, submit, validationChange } from './helpers/handler';

const Gender = props => {
  const [lang] = useTranslation('gender');

  return (
    <div className="select f-gbv01 gender">
      <select onChange={e => validationChange(e, props.fields, props.setFields, props.validation, props.setValidation)} name="gender" id="gender" defaultValue={props.default || 'neutral'}>
        <option value="neutral">{lang('neutral')}</option>
        <option value="female">{lang('female')}</option>
        <option value="male">{lang('male')}</option>
      </select>
    </div>
  )
};

export default Gender;
