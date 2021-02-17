// Import Packages
import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { Flex } from '../../styles/blossom';

const Good = styled.span`
  margin-left: 10px;
  color: green;
  &::after {
    content: '\\2713';
  }
`;
const Bad = styled.span`
  margin-left: 10px;
  color: red;
  &::after {
    content: '\\2717';
  }
`;
const Container = styled.div`
  margin-bottom: 20px;
`;

const PasswordCharacters = props => {
  const [lang] = useTranslation('pass_char');

  const check = key => {
    return props.value.match(props.regexes[key]);
  };

  return (
    <Container>
      {Object.keys(props.regexes).map(key =>
        <Flex params={{ disposition: 'spread-center' }} styles={{ width: '25%' }} key={key}>
          <span>{lang(key)}</span>
          {check(key) ? <Good /> : <Bad />}
        </Flex>
      )}
    </Container>
  )
};

export default PasswordCharacters;
