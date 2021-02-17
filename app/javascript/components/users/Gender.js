// Import Packages
import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

// Import Components
import { validationChange } from './helpers/handler';
import { BlueBorderInput, Select } from '../../styles/global';

const Container = styled.div`
  margin: 10px 0 20px;
`;

const Gender = props => {
  const [lang] = useTranslation('gender');

  return (
    <Container>
      <BlueBorderInput select={true} styles={{ height: '40px' }}>
        <Select onChange={e => validationChange(e, props.fields, props.setFields, props.validation, props.setValidation)} name="gender" id="gender" defaultValue={props.default || 'neutral'}>
          <option value="neutral">{lang('neutral')}</option>
          <option value="female">{lang('female')}</option>
          <option value="male">{lang('male')}</option>
        </Select>
      </BlueBorderInput>
    </Container>
  )
};

export default Gender;
