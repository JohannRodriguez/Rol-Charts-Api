// Import Packages
import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

const Container = styled.div`
  margin-bottom: 10px;
  position: relative;
  top: -10px;
`;

const Errors = props => {
  const [lang] = useTranslation('errors');

  return (
    <>
    {props.error ?
      <Container>
        {props.error.map(error =>
          <p key={`${props.type}-${error}`}>
            {lang(`${props.type}.${error}`)}
          </p>
        )}
      </Container>
    : null}
    </>
  )
};

export default Errors;
