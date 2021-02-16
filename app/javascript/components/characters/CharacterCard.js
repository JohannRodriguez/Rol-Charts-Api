import React from 'react';
import { Cont, ContRes, Flex, ResText } from '../../styles/blossom';
import colors from '../../styles/colors.json';

const CharacterCard = props => {

  const showCharacter = character => {
    console.log(character);
  };

  return (
    <ContRes
      onClick={() => showCharacter(props.character)} params={{ aspectRatio: (1 / 1.2), gap: '5%', breach: { bottom: '10%' }, }}
      styles={{
        backgroundColor: colors.darkGrey,
        width: '15%',
        border: `2px solid ${colors.grey}`,
        borderRadius: '3px',
        transform: 'skewX(-5deg)',
        overflow: 'hidden',
        boxShadow: '5px 7px 10px 0px rgb(0, 0, 0)',
        transition: '0.5s',
        zIndex: 20,
      }}
      hover={[{ styles: { cursor: 'pointer', transform: 'scale(1.1) skewX(-5deg)', transition: '0.5s' }, }]}>
      <Cont styles={{
          backgroundImage: 'url(https://static.13.cl/7/sites/default/files/esports/articulos/field-image/lol-champion-samira-lanzamiento.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '70%',
          transform: 'skewX(5deg)',
          width: '110%',
          left: '-5%',
        }}>
      </Cont>
      <Flex params={{ disposition: 'center', }} styles={{
        top: '-5%', left: '-5%', transform: 'skewX(5deg)', width: '110%',
        backgroundColor: colors.darkGrey, height: '35%', paddingTop: '5%',
        clipPath: 'polygon(0 0, 20% 0, 30% 10%, 70% 10%, 80% 0, 100% 0, 100% 100%, 0 100%)',
        }}>
        <ResText params={{ base: 7, }} styles={{ color: colors.paleBlue, fontWeight: 'bold', textAlign: 'center', }}>
          <p>{props.character.name}</p>
        </ResText>
      </Flex>
    </ContRes>
  );
};

export default CharacterCard;
