// Import Packages
import React from 'react';
import { Flex, Svg } from '../../../styles/blossom';

// Import data
import svg from '../../../packs/svg.json';
import colors from '../../../styles/colors.json';
import headerData from './headerData';
import headerStyles from './headerStyles';

const Header = props => {
  const redirect = target => {
    props.history.push(`/${target}`);
  };
  const currentPath = path => {
    if (props.path.includes(path)) return true;
    return false;
  };

  return (
    <Flex params={headerStyles.flexParent.params} styles={headerStyles.flexParent.styles}>
      {headerData(props).map((e, i) =>
        <Flex key={`${e.path}-${i}`}
          styles={headerStyles.flexMain.styles(i, headerData(props))} 
          hover={currentPath(e.path) ? null : headerStyles.flexMain.hover}
          onClick={() => redirect(e.redirect)}
          params={headerStyles.flexMain.params}
          after={currentPath(e.path) ? headerStyles.flexMain.after : null}>
          <Svg path={svg[e.svg]} styles={currentPath(e.path) ? headerStyles.svg.active : headerStyles.svg.inactive} />
        </Flex>
      )}
    </Flex>
  )
};


export default Header;
