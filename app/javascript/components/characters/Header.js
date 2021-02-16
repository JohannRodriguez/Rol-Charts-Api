import React from 'react';
import svg from '../../packs/svg.json';
import { Flex, Svg } from '../../styles/blossom';
import colors from '../../styles/colors.json';

const Header = props => {
  const items = [
    {
      redirect: `${props.user}/characters`,
      path: 'characters',
      svg: 'home',
    },
    {
      redirect: `new_character`,
      path: 'new_character',
      svg: 'home',
    },
    {
      redirect: `new_character`,
      path: 'new_character',
      svg: 'home',
    },
    {
      redirect: `new_character`,
      path: 'new_character',
      svg: 'home',
    },
    {
      redirect: `new_character`,
      path: 'new_character',
      svg: 'home',
    },{
      redirect: `new_character`,
      path: 'new_character',
      svg: 'home',
    }
  ]
  const after = { styles: { width: '100%', height: '4px', borderRadius: '10px', position: 'absolute', bottom: '-20%', backgroundColor: colors.blue, } };
  const active = { fill: colors.blue, stroke: 'none', width: '30px', };
  const inactive = { fill: 'none', stroke: colors.lightGrey, strokeWidth: 5, width: '30px', }

  const redirect = target => {
    props.history.push(`/${target}`);
  };
  const currentPath = path => {
    if (props.path.includes(path)) return true;
    return false;
  };

  return (
    <Flex params={{ flex: `${100 / 6}%`, }} styles={{ height: 'auto', }}>
      {items.map((e, i) =>
        <Flex styles={{ margin: (i == 0 ? '10px 10px 10px 5px' : i === (items.length - 1) ? '10px 5px 10px 10px' : '10px'), padding: '10px 0', cursor: 'pointer', borderRadius: '5px' }} key={`${e.path}-${i}`} hover={currentPath(e.path) ? null : [{ styles: { backgroundColor: colors.darkGrey, }, }, { target: 'svg', styles: { stroke: colors.blue }, }]} onClick={() => redirect(e.redirect)} params={{ disposition: 'center', }} after={currentPath(e.path) ? after : null}>
          <Svg path={svg[e.svg]} styles={currentPath(e.path) ? active : inactive} />
        </Flex>
      )}
    </Flex>
  )
};


export default Header;
