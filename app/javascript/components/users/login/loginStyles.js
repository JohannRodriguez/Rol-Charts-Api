import colors from '../../../styles/colors.json';
import styled from 'styled-components';

const loginStyles = {
  contParent: {
    styles: {
      maxWidth: '420px',
      margin: '5% auto 2%',
      padding: '0 20px',
    }
  },
  borderInput: {
    styles: {
      height: '40px',
      margin: '0 0 20px',
    },
  },
  button: {
    styles: {
      height: '45px',
      margin: '10px 0 30px',
    },
  },
};

export const SpanBullet = styled.span`
  font-size: 14px;
  margin-right: 5px;
  &::after {
    content: '\\2022';
    margin-left: 5px;
  }
`;
export const Span = styled.span`
  cursor: pointer;
  font-size: 14px;
  &:hover {
    text-decoration: underline;
  }
`;
export const H1 = styled.h1`
  margin-bottom: 25px;
`;

export default loginStyles;
