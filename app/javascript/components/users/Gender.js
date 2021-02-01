// Import Packages
import React from 'react';
import { useTranslation } from 'react-i18next';

const Gender = props => {
  const [lang] = useTranslation('gender');

  return (
    <div className="select f-gbv01 gender">
      <select onChange={props.change} name="gender" id="gender">
        <option value="neutral">{lang('neutral')}</option>
        <option value="female">{lang('female')}</option>
        <option value="male">{lang('male')}</option>
      </select>
    </div>
  )
};

export default Gender;
