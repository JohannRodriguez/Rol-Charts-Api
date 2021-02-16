import React, { useEffect, useLayoutEffect, useRef, useState} from 'react';
import styled, {css} from 'styled-components';

const styles = styles => {
  if (Object.prototype.toString.call(styles) === '[object Object]') {
    const keys = Object.keys(styles);
    const stylesArr = [];
    keys.map(e => {
      stylesArr.push(`${e.replace(/([A-Z])/g, "-$1").toLowerCase()}: ${styles[e]};`); 
    });
    return stylesArr.join(' ');
  }
};
const getChilds = childs => {
  if (Object.prototype.toString.call(childs) === '[object Object]') {
    return [childs];
  }
  return childs;
};
const flexDisposition = disposition => {
  switch (disposition) {
    case 'center':
      return css`
        justify-content: center;
        align-items: center;
      `;
    case 'spread-center':
      return css`
        justify-content: space-between;
        align-items: center;
      `
    case 'left-center':
      return css`
        justify-content: start;
        align-items: center;
      `
    default:
      break;
  }
};
const checkElement = (width, type) => {
  if (Object.prototype.toString.call(width) === '[object Array]') {
    for (let i = 0; i < width.length; i++) {
      if (!type.includes(width[i].type)) {
        return false;
      }
    }
    return true;    
  }
  return false;
};
const textBreaks = (breaks, base, width) => {
  let num = 16;
  if (width) {
    if (base) num = (width / base);
    if (breaks) {
     breaks.map(e => {
      if (e.min && width < e.min) {
        if (!e.base) num = (e.min / base);
        else num = (e.min / e.base);
      } else if (e.max && width > e.max) {
        if (!e.base) num = (e.max / base);
        else num = (e.max / e.base);
      } else if (width < e.break) {
        num = (width / e.base);
      }
     }); 
    }
    if (!base && !breaks) num = (width / 5);
  }
  return num;
};
const propsHandler = (props, type) => {
  return css`
    ${props.styles ? styles(props.styles) : null}
    ${props.after ? css`
      &::after {
        content: '${props.after.content}';
        ${styles(props.after.styles)};
      }
    ` : null}
    ${props.before ? css`
      &::before {
        content: '${props.before.content}';
        ${styles(props.before.styles)};
      }
    ` : null}
    ${props.hover ? props.hover.map(e => css`
      &:hover ${e.target} { ${styles(e.styles)} }
    `) : null}
    ${type === 'flex' ? css`
      ${props.params.flex ? css`
        & > * {flex: ${props.params.flex};}`
      : null}
      ${props.params.disposition ? flexDisposition(props.params.disposition) : null}
    ` : null}
  `;
};

export const Cont = styled.div`
${props => console.log(props)}
  ${props => props.styles ?
    css`
      ${props.styles.width ? null : css`width: 100%;`}
      ${props.styles.height ? null : css`height: auto;`}
      ${props.styles.position ? null : css`position: relative;`}
    `
  : null}
  ${props => propsHandler(props)}
`;
Cont.defaultProps = {
  styles: {},
};
export const Flex = styled.div`
  ${props => props.styles ?
    css`
      ${props.styles.width ? null : css`width: 100%;`}
      ${props.styles.height ? null : css`height: auto;`}
      ${props.styles.position ? null : css`position: relative;`}
    `
  : null}
  
  ${props => propsHandler(props, 'flex')}
  display: flex;
`;
Flex.defaultProps = {
  params: {},
  styles: {},
  children: [],
};

const SvgParent = styled.svg`
  ${props => props.styles.width ? null : css`width: 100%;`}
  ${props => props.styles.fill ? null : css`fill: black;`}
  ${props => props.styles.stroke ? null : css`stroke: none;`}
  ${props => props.styles.strokeWidth ? null : css`stroke-width: 0;`}
  ${props => styles(props.styles)}
`;

const ContResParent = styled.div`
  width: ${props => props.styles.width || '100%'};
  height: auto;
  position: ${props => props.styles.position || 'relative'};
  ${props => props.styles.zIndex ? css`z-index: ${props.styles.zIndex};` : null}
  &::after {
    content: '';
    display: block;
    padding-top: calc(100% / ${props => props.params.aspectRatio || 1});
  }
  & > div {
    top: ${props => {
      if (props.params.breach && props.params.breach.top) return props.params.breach.top;
      if (typeof props.params.breach === 'string') return props.params.breach;
      return 0;
    }};
    bottom: ${props => {
      if (props.params.breach && props.params.breach.bottom) return props.params.breach.bottom;
      if (typeof props.params.breach === 'string') return props.params.breach;
      return 0;
    }};
    left: ${props => {
      if (props.params.gap && props.params.gap.left) return props.params.gap.left;
      if (typeof props.params.gap === 'string') return props.params.gap;
      return 0;
    }};
    right: ${props => {
      if (props.params.gap && props.params.gap.right) return props.params.gap.right;
      if (typeof props.params.gap === 'string') return props.params.gap;
      return 0;
    }};
    position: absolute;
    ${props => {
      const obj = props;
      delete obj.styles.width;
      delete obj.styles.height;
      delete obj.styles.zIndex
      return propsHandler(obj);
    }}
  }
`;
export const ContRes = props => {
  const childs = getChilds(props.children);
  return (
    <ContResParent params={props.params} styles={props.styles} hover={props.hover}>
      <div onClick={props.onClick}>
        {childs.map((e) => e )}
      </div>
    </ContResParent>
  )
};
ContRes.defaultProps = {
  params: {},
  styles: {},
  children: [],
};

const ResTextParent = styled.div.attrs(props => ({
  style: {
    fontSize: `${props.calc}px`,
  }
}))`
  ${props => props.styles.display && css`display: ${props.styles.display};`};
  ${props => propsHandler(props)}
  ${props => props.styles.flex ? css`flex: ${props.styles.flex};` : css`width: 100%;`}
`;
export const ResText = props => {
  const childs = getChilds(props.children);
  const ref = useRef();
  const [width, setWidth] = useState();
  const base = textBreaks(props.params.breaks, props.params.base, width);

  useEffect(() => {
    const handleResize = () => {
      setWidth(ref.current.offsetWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    }
  }, []);
  useLayoutEffect(() => {
    setWidth(ref.current.offsetWidth);
  });

  return (
    <ResTextParent ref={ref} calc={base} style={{fontSize: `${width / props.params.base}px`}} styles={props.styles} params={props.params}>
      {childs.map(e => e)}
    </ResTextParent>
  );
};
ResText.defaultProps = {
  params: {},
  styles: {},
  children: [],
};

export const Svg = props => {
  return (
    <SvgParent viewBox="0 0 100 100" styles={props.styles}>
      <g>
        <path d={props.path} />
      </g>
    </SvgParent>
  );
};
Svg.defaultProps = {
  styles: {},
}

const CarouselParent = styled.div`
  width: 100%;
  height: auto;
  position: relative;
  bottom: -4%;
  .pages {
    position: absolute;
    bottom: - 50px;
    width: 100%;
    display: flex;
    justify-content: center;
    & > div {
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      width: 50%;
      .inactive-page {
        opacity: 0.5;
      }
      & > div:hover {
        opacity: 0.75;
      }
      & > div {
        cursor: pointer;
        min-width: 50px;
        background-color: rgb(169, 181, 196);
        margin: 5px;
        height: 20px;
        transform: skewX(-20deg);
      }
    }
  }
  .arrow {
    position: absolute;
    top: -20%;
    ${props => props.slideGap && css`
      width: ${((100 - ((100 / props.items) * props.slideGap)) / props.items) * (props.slideGap / 2)}%;
    `}
    padding: 2% 0;
    height: 100%;
    z-index: 10;
    & > div {
      height: 100%;
      width: calc(100% + 30px);
      padding-bottom: 22%;
      overflow: hidden;
      position: relative;
      & > div {
        cursor: pointer;
        position: relative;
        width: 97.5%;
        height: 100%;
        background-color: black;
        border-radius: 3px;
        opacity: 0.6;
        transform: skew(-5deg);
        &:hover {
          opacity: 0.8;
        }
      }
    }
  }
  & > :last-child {
    right: 0;
    & > div{
      left: -30px;
      & > div {
        right: calc(-30px - 13%);
        padding-right: 30px;
        &::after {
          content: '\\276D';
          font-size: 2em;
          display: flex;
          justify-content:center;
          align-items: center;
          height: 100%;
          color: white;
        }
      }
    }
  }
  & > :first-child {
    left: 0;
    & > div > div {
      left: -30px;
      padding-left: 30px;
      &::after {
        content: '\\276C';
        font-size: 2em;
        display: flex;
        justify-content:center;
        align-items: center;
        height: 100%;
        color: white;
      }
    }
  }
 
`;
const CarouselSlides = styled.div`
  overflow: hidden;
  width: 100%;
  height: auto;
  position: relative;
  padding: 2% 0; 
`;
const Slider = styled.div.attrs(props => ({
  style: {
    transform: `translateX(${props.offset}%)`,
  }
}))`
  display: flex;
  flex-wrap: nowrap;
  ${props => props.transition && css`
    transition: transform 1s;
  `}
  .inactive {
    transform: scale(0.8) translateY(10%);
    opacity: 0.8;
  }
  & > div {
    ${props => props.transition && css`
      transition: 1s;
    `}
    min-width: 100%;
    height: auto;
    position: relative;
    box-sizing: border-box;
    display: flex;
    ${props => props.params.slideGap && css`
      padding: 0 ${((100 - ((100 / props.items) * props.params.slideGap)) / props.items) * (props.params.slideGap / 2)}%;
    `}
    & > * {
      width: ${props => `${(100 / props.items)}%`};
    }
  }
`;
export const Carousel = props => {
  const childs = getChilds(props.children);
  const ref = useRef();
  const [current, setCurrent] = useState(1);
  const [transition, setTransition] = useState(true);
  const [clickable, setClickable] = useState(true);
  const items = props.params.items;
  const length = Math.ceil(props.children.length / items);

  useEffect(() => {
    if (transition === null) setTransition(true);
    if (current === 0) {
      setTransition(false);
      setTimeout(() => {
        setCurrent(length);
        setTransition(true);
      }, 1000);
    }
    if (current === (length) + 1) {
      setTransition(false);
      setTimeout(() => {
        setCurrent(1);
        setTransition(true);
      }, 1000);
    }
    if (!clickable) {
      setTimeout(() => {
        setClickable(true);
      }, 1050);
    }
  }, [current, transition, clickable]);

  const scroll = op => {
    if (length > items) {
      if (clickable) {
        setCurrent(current + op);
      }
      setClickable(false);
    }
  };

  return (
    <CarouselParent items={items} slideGap={props.params.slideGap}>
      <div className="arrow">
        <div>
          <div onClick={() =>  scroll(-1)}></div>
        </div>
      </div>
      <CarouselSlides ref={ref}>
        <Slider params={props.params} offset={(100 * -current)} transition={transition} items={items}>
          <div className={current === 0 ? 'active' : 'inactive'}>
            {Array(childs.length % items === 0 ? items : childs.length % items).fill('carousel-08597').map((e, i) =>
              childs[(i + (items * ((childs.length / items) - 1)))]
            )}
          </div>
          {Array(length).fill('carousel-02837').map((item, index) =>
            <div className={(index + 1) === current ? 'active' : 'inactive'} key={`${item}-${index}`}>
              {Array(items).fill('carousel-08534').map((e, i) =>
                childs[(i + (items * index))]
              )}
            </div>
          )}
          <div className={current === (length + 1) ? 'active' : 'inactive'}>
            {Array((items)).fill('carousel-08597').map((e, i) =>
              childs[i]
            )}
          </div>
        </Slider>
      </CarouselSlides>
      <div className="pages">
        <div>
          {Array(length).fill('carousel-23578').map((e, i) => 
            <div key={`${e}-${i}`} className={
              (i + 1) === current ||
              i === (length - 1) && current === 0 ||
              i === 0 && current === (length + 1) ?
              'active-page' : 'inactive-page'}
              onClick={() => setCurrent(i + 1)}
            >
            </div>
          )}
        </div>
      </div>
      <div className="arrow">
        <div>
          <div onClick={() =>  scroll(1)}></div>
        </div>
      </div>
    </CarouselParent>
  );
};
Carousel.defaultProps = {
  params: {},
  styles: {},
  children: [],
};

