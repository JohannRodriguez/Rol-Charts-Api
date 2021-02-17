// Import Packages
import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

// Import Components
import { validationChange } from './helpers/handler';
import { BlueBorderInput, Select } from '../../styles/global';

const Container = styled.div`
  display: flex;
  margin: 10px 0 20px;
  & > * {
    flex: 1;
    margin: 0 5px;
  }
  &:first-child {
    margin-left: 0;
  }
  &:last-child {
    margin-right: 0;
  }
`;

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
    <Container>
      <BlueBorderInput select={true} styles={{ height: '40px' }}>
        <Select onChange={e => validationChange(e, props.fields, props.setFields, props.validation, props.setValidation)}
        name="day" defaultValue={date.getDate()}>
          {days.map(key =>
            <option key={`day-${key}`} value={key}>
              {key}
            </option>
          )}
        </Select>
      </BlueBorderInput>
      <BlueBorderInput select={true} styles={{ height: '40px' }}>
        <Select onChange={e => validationChange(e, props.fields, props.setFields, props.validation, props.setValidation)}
        name="month" defaultValue={lang(`${date.getMonth() + 1}`)}>
          {months.map(key =>
            <option key={`month-${key}`} value={key}>
              {key}
            </option>
          )}
        </Select>
      </BlueBorderInput>
      <BlueBorderInput select={true} styles={{ height: '40px' }}>
        <Select onChange={e => validationChange(e, props.fields, props.setFields, props.validation, props.setValidation)}
        name="year" defaultValue={date.getFullYear()}>
          {years.reverse().map(key =>
            <option key={`year-${key}`} value={key}>
              {key}
            </option>
          )}
        </Select>
      </BlueBorderInput>
    </Container>
  )
};

export default PickDate;
