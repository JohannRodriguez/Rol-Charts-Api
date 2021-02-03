// Import Packages
import React from 'react';
import { useTranslation } from 'react-i18next';

const Errors = props => {
  const [lang] = useTranslation('errors');

  return (
    <>
    {props.error ?
      <div className="errors">
        {props.error.map(error =>
          <p key={`${props.type}-${error}`}>
            {lang(`${props.type}.${error}`)}
          </p>
        )}
      </div>
    : null}
    </>
  )
};

export default Errors;
