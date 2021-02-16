// Import Packages
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Flex, ResText, Svg } from '../../../styles/blossom';


// Import Components
import svg from '../../../packs/svg.json';
import navSys from './navbarStyles';
import navbarData from './navbarData';

const Navbar = props => {
  const [lang] = useTranslation('navbar');
  const [path, setPath] = useState(props.location.pathname.split('/'));

  useEffect(() => {
    if (props.location.pathname.split('/').join('') != path.join('')) {
      setPath(props.location.pathname.split('/').filter(e => e));
    }
  });

  const redirect = target => {
    props.history.push(`/${target}`);
  };

  return (
    <ResText params={navSys.resText.params} styles={navSys.resText.styles}>
      {navbarData(props).map(e => 
        <Flex onClick={() => redirect(e.redirect)} key={e.name} params={navSys.flex.params} styles={navSys.flex.styles} hover={navSys.flex.hover}>
          <Svg path={svg[e.name]} styles={e.current.method(path, e.current.argument) ? navSys.svg.active : navSys.svg.inactive} />
          <span>{lang(e.name)}</span>
        </Flex>
      )}
    </ResText>
  )
};

export default Navbar;
