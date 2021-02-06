// Import Packages
import React, { useState } from 'react';
import { useResizeDetector } from 'react-resize-detector';

const ResponsiveText = props => {
  const [width, setWidth] = useState(0);
  const { ref } = useResizeDetector({
    onResize: (width) => {
      setWidth(width)
    }
  });

  return (
    <div ref={ref} className={props.classType}>
      <p style={
        props.text < 7 ?
          {fontSize: (width / 6)}
        :
          {fontSize: (width / 7.2)}
        }
      key={`${props.keyName}-name`}>{props.text}
      </p>
    </div>
  )
};

export default ResponsiveText;
