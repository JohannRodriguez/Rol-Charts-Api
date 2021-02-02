// Import Packages
import React from 'react';
import { useTranslation } from 'react-i18next';


const PasswordCharacters = props => {
  const [lang] = useTranslation('passchar');

  const check = key => {
    return props.value.match(props.regexes[key]);
  };

  return (
    <div>
      {Object.keys(props.regexes).map(key =>
        <div key={`${key}-div`}>
          <span key={key}>{lang(key)}</span>
          <span key={`${key}-char`}>
            {check(key) ? ':D' : '·-·'}
          </span>
        </div>
      )}
    </div>
  )
};

export default PasswordCharacters;
