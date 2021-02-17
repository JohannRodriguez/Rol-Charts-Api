import styled, { keyframes } from 'styled-components';
import colors from '../../../styles/colors.json';

const registerStyles = {
  contParent: {
    styles: {
      widht: '100%',
      maxWidth: '500px',
      margin: '0 auto',
    },
  },
  headerFlex: {
    params: { disposition: 'spread-center', },
    styles: { padding: '20px 0', },
  },
  borderInput: {
    styles: {
      height: '40px',
      margin: '0 0 20px',
    },
  },
};

export const Span = styled.span`
  font-size: 14px;
  cursor: pointer;
  color: ${colors.blue};
  &:hover {
    text-decoration: underline;
  }
`;

export const Label = styled.p`
  font-size: 15px;
`;

const switchAnimOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    transform: skewX(40deg) translateX(70%);
    letter-spacing: 10px;
    opacity: 0;
  }
`;
const switchAnimIn = keyframes`
  to {
    transform: translateX(0);
    letter-spacing: 0;
    opacity: 1;
  }
`;
const switchMockIn = keyframes`
  to {
    opacity: 1;
  }
`;
export const BlueBtnSwitch  = styled.div`
  height: 50px;
  margin-top: 40px;
  button {
    height: 100%;
    width: 100%;
    background-color: ${props => props.rest ? colors.fadeBlue : colors.blue};
    position: relative;
    color: ${props => props.rest ? colors.fadeLight : colors.light};
    border: none;
    border-radius: 40px;
    font-weight: bold;
    font-size: 20px;
    box-shadow: 10px 10px 10px 0px rgba(0, 0, 0, 0.5);
    transition: transform 0.5s;
    overflow: hidden;
    span:last-of-type {
      opacity: 0;
      animation: ${switchMockIn} 0.5s linear forwards;
    }
    span:first-of-type {
      position: absolute;
      left: 0;
      right: 0;
      opacity: 0;
      transform: translateX(-50%) skewX(40deg);
      letter-spacing: 5px
    }
  }
  span {
    display: inline-block;
  }
  &:hover {
    button {
      transition: transform 0.5s;
      transform: translateY(-10px);
    }
    span:first-of-type {
      animation: ${switchAnimIn} 0.35s linear 0.3s forwards;
    }
    span:last-of-type {
      width: 100%;
      animation: ${switchAnimOut} 0.5s linear forwards;
    }
  }
`;

export default registerStyles;