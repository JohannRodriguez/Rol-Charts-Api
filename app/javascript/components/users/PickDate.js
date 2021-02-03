import React from 'react';
import { useTranslation } from 'react-i18next';

import { getFields, submit, validationChange } from './helpers/handler';

const PickDate = props => {
  const [lang] = useTranslation('months');

  const date = new Date();
  const days = Array.from([...Array(31).keys()], x => x + 1);
  const years = Array.from([...Array(101).keys()], x => x + (date.getFullYear() - 100));
  const getMonths = () => {
    const array = [];
  
    for (let i = 1; i < 13; i++) {
      array.push(lang(`${i}`));    
    }
    return array;
  }
  const months = getMonths();

  return (
    <div className="date">
      <div className="select f-gbv01">
        <select onChange={e => validationChange(e, props.fields, props.setFields, props.validation, props.setValidation)}
        name="day" defaultValue={date.getDate()}>
          {days.map(key =>
            <option key={`day-${key}`} value={key}>
              {key}
            </option>
          )}
        </select>
      </div>
      <div className="select f-gbv01">
        <select onChange={e => validationChange(e, props.fields, props.setFields, props.validation, props.setValidation)}
        name="month" defaultValue={lang(`${date.getMonth() + 1}`)}>
          {months.map(key =>
            <option key={`month-${key}`} value={key}>
              {key}
            </option>
          )}
        </select>
      </div>
      <div className="select f-gbv01">
        <select onChange={e => validationChange(e, props.fields, props.setFields, props.validation, props.setValidation)}
        name="year" defaultValue={date.getFullYear()}>
          {years.reverse().map(key =>
            <option key={`year-${key}`} value={key}>
              {key}
            </option>
          )}
        </select>
      </div>
    </div>
  )
};

export default PickDate;
