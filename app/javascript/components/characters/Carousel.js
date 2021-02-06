// Import Packages
import React, { useState } from 'react';
import { useResizeDetector } from 'react-resize-detector';
import styled from 'styled-components';

// Import Modules
import ResponsiveText from './ResponsiveText';
const paleBlue = 'rgb(176, 202, 219)';
const offset = '150px';
const blue = 'rgb(93, 146, 207)';
const dark = 'rgb(27, 32, 39)';
const darkGrey = 'rgb(35, 44, 56)';
const prov = 'rgb(27, 32, 39)';
const grey = 'rgb(55, 68, 83)';
const resSize = '14.3%';
const metalicBlue = 'rgb(72, 89, 107)';

const ContScroll = styled.div`
  display: flex;
  flex-wrap: nowrap;
  height: max-content;
  box-sizing: border-box;
  width: 100%;
  overflow: hidden;
`;
const Container = styled.div`
  position: relative;
  height: max-content;
  display: flex;
  padding: 20px ${props => props.sidePad};
  box-sizing: border-box;
  transition: 0.6s;
  min-width: 100%;
`;
const ContResponsive = styled.div`
  flex-basis: ${props => props.basis};
  height: max-content;
  position: relative;
  left: -0.3%;
  
  &::after {
    content: '';
    display: block;
    padding-top: calc(100% * 1.2);
  }
`;
const Card = styled.div`
  left: 5px; right: 5px;
  position: absolute;
  user-select: none;
  height: 90%;
  box-sizing: border-box;
  border-radius: 3px;
  cursor: pointer;
  box-shadow: 5px 7px 10px 0px rgb(0, 0, 0);
  overflow: hidden;
  background-color: ${darkGrey};
  border: 1px solid ${grey};
  transition: 0.5s;
  transform: scale(1, 1) skewX(-5deg);
  &:hover {
    transition: 0.5s;
    transform: scale(1.16, 1.16) skewX(-5deg);
    box-shadow: none;
    z-index: 50;
    border: none;
  }
`;
const CardImgCont = styled.div`
  height: 70%;
  overflow: hidden;
  position: relative;
  img {
    transform: skewX(5deg);
    margin-left: ${props => props.offset};
    height: 100%;
  }
`;
const CharStars = styled.div`
  background-color: ${props => props.bg};
  width: 40%;
  position: absolute;
  left: -2px;
  z-index: 10;
  transform: skewX(-5deg);
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  &::after {
    content: '\\2605'
  }
  span {
    padding-right: 5px;
  }
`;
const Name = styled.div`
  width: 105%;
  height: calc(30% + 5px);
  display: flex;
  align-items: center;
  padding: 5px 10px 0;
  line-height: 14px;
  font-weight: bold;
  position: relative;
  top: -5px;
  left: -2.5%;
  background-color: ${darkGrey};
  transform: skewX(5deg);
  clip-path: polygon(0 0, 20% 0, 30% 10%, 70% 10%, 80% 0, 100% 0, 100% 100%, 0 100%);
  box-sizing: border-box;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;

  p {
    transform: skewX(-6deg);
    color: ${paleBlue};
    word-break: break-all;
    white-space: normal;
  }
`;
const CharPagesCont = styled.div`
  display: flex;
  justify-content: flex-end;

  .items {
    height: 40px;
    width: 380px;
    margin-bottom: 30px;
  }
  .item-cont {
    height: 10px;
    margin-left: 5px;
    width: 40px;
    display: inline-block;

    .item-color {
      cursor: pointer;
      width: 98%;
      height: 100%;
      background-color: rgba(176, 202, 219, 0.5);
      transform: skewX(-30deg);
      -webkit-box-shadow: 5px 7px 0px 0px rgba(0,0,0,0.75);
      -moz-box-shadow: 5px 7px 0px 0px rgba(0,0,0,0.75);
      box-shadow: 5px 5px 5px 0px rgb(0, 0, 0);

      &:hover {
        background-color: rgba(176, 202, 219, 0.8);
      }
    }
    .item-high {
      background-color: ${paleBlue};
    }
  }
`;
const Arrows = styled.div`
  ${props => props.type === 'left' ? 'left: 0;' : 'right: 0;'}
  min-width: ${props => props.size};
  height: max-content;
  position: absolute;
  z-index: 20;
  bottom: 20%;
  &::after {
    content: '';
    display: block;
    padding-top: calc(100% * 2.4);
  }
  .position {
    ${props => props.type === 'left' ? 'left: 0; right: -10px;' : 'right: 0; left: -10px;'}
    overflow: hidden;
    position: absolute;
    height: 90%;
    .functional {
      ${props => props.type === 'left' ?
        'left: -10px; right: 10px; border-top-right-radius: 3px; border-bottom-right-radius: 3px;'
      :
        'right: -10px; left: 10px; border-top-left-radius: 3px; border-bottom-left-radius: 3px;'
      }
      cursor: pointer;
      background-color: ${grey};
      opacity: 0.3;
      position: absolute;
      height: 100%;
      transform: skewX(-5deg);
      display: flex;
      align-items: center;
      justify-content: center;
      transition: 0.5s;
      &:hover {
        opacity: 0.8;
        transition: 0.5s;
      }
      &::after {
        ${props => props.type === 'left' ? `content: '\\276C';` : `content: '\\276D';`}
        font-size: 2vw;
      }
    }
  }
  
`;

const Carousel = props => {
  const [width, setWidth] = useState(0);
  const [current, setCurrent] = useState(0);
  const length = props.chars.length;
  const [cards, setCards] = useState(6);

  const { ref } = useResizeDetector({
    onResize: (width) => {
      setWidth(width)
    }
  });
  const slide = (comp, arg, op = 1) => {
    setCurrent(current === comp ? arg : (current + op));
  }

  return (
    <>
      <CharPagesCont>
        <div className="items">
          {Array(Math.ceil(length / cards)).fill('cpitm').map((item, index) =>
            <div key={`${item}-cont-${index}`} className="item-cont" onClick={() => setCurrent(index)}>
              <div key={`${item}-itm-${index}`} className={index === current ?
                'item-color item-high': 'item-color'
              }></div>
            </div>
          )}
        </div>
      </CharPagesCont>
      <Arrows type="left" size={`${(100 / (cards + 1)) / 2}%`}>
        <div className="position">
          <div className="functional" onClick={() => slide(0, Math.floor(length / cards), -1)}>
          </div>
        </div>
      </Arrows>
      <ContScroll>
        {Array(Math.ceil(length / cards)).fill('cfitm').map((fItem, fIndex) =>
          <Container key={`${fItem}-${fIndex}`} sidePad={`${((100 / (cards + 1)) / 2)}%`}
            style={{ transform: `translate(-${100 * current}% ,0)` }}
          >
            {Array(cards).fill('cfitm').map((cItem, cIndex) =>
              <React.Fragment key={`${fIndex}-${cItem}-${cIndex}`}>{props.chars[(cIndex + (cards * fIndex))] ?
                <ContResponsive basis={`${100 / cards}%`}>
                  <Card>
                    <CardImgCont offset={`-30%`}>
                      <CharStars bg={blue}><span>4.0</span></CharStars>
                      <img alt='profile character image' src='https://static.13.cl/7/sites/default/files/esports/articulos/field-image/lol-champion-samira-lanzamiento.jpg' />
                    </CardImgCont>
                    <Name>{props.chars[(cIndex + (cards * fIndex))].name}</Name>
                  </Card>
                </ContResponsive>
              : null
              }</React.Fragment>
            )}
          </Container>
        )}
      </ContScroll>
      <section ref={ref} className="h-scl" style={{ transform: `translate(${((100 / (cards + 1)) * cards) * -current}%, 0)`, }}>
        {}
      </section>
      <Arrows type="right" size={`${(100 / (cards + 1)) / 2}%`}>
        <div className="position">
          <div className="functional" onClick={() => slide(Math.floor(length / cards), 0)}>
          </div>
        </div>
      </Arrows>
    </>
  )
};

export default Carousel;

/* {props.chars.map((character, index) =>
          <div className={index >= (cards * current) && (index + 1) <= (cards * (current + 1))
            ? 'cd-mc cd-display' : 'cd-mc cd-await'}
          >
            <article ref={ref} className="cd-ma" key={`${character.id}-character`}>
              <div className="cd-img">
                <div className="cd-imgs"><span>4.0</span></div>
                <img key={`${character.id}-img`} src="https://static.13.cl/7/sites/default/files/esports/articulos/field-image/lol-champion-samira-lanzamiento.jpg" /> 
              </div>
              <ResponsiveText classType="cd-n" text={'Samira'} keyName={1} />
            </article>
            <div className="cd-bgeff">
              <div className="cd-bgefc1"></div>
              <div className="cd-bgefc2"></div>
              <div className="cd-bgefc3"></div>
              <div className="cd-bgefc4"></div>
            </div>
          </div>
        )} */
