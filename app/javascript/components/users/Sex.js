// Import Packages
import React from 'react';
import { useTranslation } from 'react-i18next';

const Sex = props => {
  const [lang] = useTranslation('sex');

  return (
    <div className="select">
      <select onChange={props.change} name="sex" id="sex">
        <option value="neutro">{lang('neutro')}</option>
        <option value="female">{lang('female')}</option>
        <option value="male">{lang('male')}</option>
      </select>
    </div>
  )
};

export default Sex;
