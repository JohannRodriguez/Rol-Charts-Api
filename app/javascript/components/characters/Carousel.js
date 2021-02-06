// Import Packages
import React, { useState } from 'react';
import { useResizeDetector } from 'react-resize-detector';


// Import Modules
import ResponsiveText from './ResponsiveText';

const Carousel = props => {
  const [width, setWidth] = useState(0);
  const [current, setCurrent] = useState(0);
  const length = props.chars.length;
  const [baseDisplay, setBaseDisplay] = useState(14.3);

  const { ref } = useResizeDetector({
    onResize: (width) => {
      setWidth(width)
    }
  });
  console.log(current);
  const slide = (comp, arg, op = 1) => {
    setCurrent(current === comp ? arg : (current + op));
  }

  return (
    <>
    <div className="bscon">
      <div className="bullets">
          {Array(Math.ceil(length / 6)).fill('blt').map((item, index) =>
            <div key={`${item}-par-${index}`} className="bullet" onClick={() => setCurrent(index)}>
              <div key={`${item}-col-${index}`} className={index === current ?
                'b-color b-high': 'b-color'
              }></div>
            </div>
          )}
        </div>
    </div>
      <div className="cd-chl cd-chll">
        <div className="cd-ohi">
          <div className="cd-cmn" onClick={() => slide(0, Math.floor(length / 6), -1)}></div>
        </div>
      </div>
      <section ref={ref} className="h-scl" style={{
        transform: `translate(${(baseDisplay * 6) * -current}%, 0)`,
      }}>
        <div className="mock"></div>
        {props.chars.map((character, index) =>
          <div className={index >= (6 * current) && (index + 1) <= (6 * (current + 1))
            ? 'cd-mc cd-display' : 'cd-mc cd-await'}
          >
            <article ref={ref} className="cd-ma" key={`${character.id}-character`}>
              <div className="cd-img">
                <div className="cd-imgs"><span>4.0</span></div>
                <img key={`${character.id}-img`} src="https://static.13.cl/7/sites/default/files/esports/articulos/field-image/lol-champion-samira-lanzamiento.jpg" /> 
              </div>
              <ResponsiveText classType="cd-n" text={character.name} keyName={character.id} />
            </article>
            <div className="cd-bgeff">
              <div className="cd-bgefc1"></div>
              <div className="cd-bgefc2"></div>
              <div className="cd-bgefc3"></div>
              <div className="cd-bgefc4"></div>
            </div>
          </div>
        )}
      </section>
      <div className="cd-chl cd-chlr">
        <div className="cd-ohi">
          <div className="cd-cmn" onClick={() => slide(Math.floor(length / 6), 0)}></div>
        </div>
      </div>
    </>
  )
};

export default Carousel;
