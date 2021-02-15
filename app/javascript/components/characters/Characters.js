// Import Packages
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import svg from '../../packs/svg.json';
import silver_medal_t1 from '../../assets/silver_medal_t1.png';

// Import Modules
import api_call from '../../api/api_call';
import ownership from './helpers/global';
import Header from './Header';
import User from '../global/User';
import { Carousel, Cont, ContRes, Flex, ResText } from '../../styles/blossom';
import colors from '../../styles/colors.json';
import CharacterCard from './CharacterCard';


// const ContResponsive = styled.div`
//   width: 100%;
//   position: relative;
  
//   .holder {
//     padding: 1% 3%;
//     box-sizing: border-box;
//   }
//   &::after {
//     content: '';
//     display: block;
//     padding-top: calc(100% / (16 / 9));
//   }
//   .header {
//     display: flex;
//     align-items: center;
//     justify-content: space-between;
//     width: 100%;
//     position: relative;
//     .badge {
//       padding-right: 5%;
//       width: 13%;
//     }
//     .char-name {
//       display: flex;
//       align-items: center;
//       h2 {
//         font-size: 34px;
//         font-weight: bold;
//         margin: 0;
//         color: ${paleBlue};
//         line-height:35px
//       }
//       p {
//         font-weight: bold;
//         font-size: 22px;
//         color: rgb(190, 201, 204);
//       }
//     }
//   }
//   .holder {
//     position: absolute;
//     width: 100%;
//     height: 100%;
//   }
//   .bgimg {
//     position: absolute;
//     height: ${props => props.bgHeight};
//     ${props => props.mirror ? 'transform: scaleX(-1);': ''}
//     z-index: -10;
//     top: ${props => props.offsetTop};
//     left: ${props => props.offsetLeft};
//   }
//   .carousel {
//     position: absolute;
//     bottom: 0;
//     left: 0;
//     width: 100%;
//   }
// `;
// const BackGroundImage = styled.div`
//   background-image: url(${props => props.img});
//   width: 100%;
//   height: 100%;
//   overflow: hidden;
//   position: absolute;
//   top: 0;
//   left: 0;
//   background-repeat: no-repeat;
//   background-size: auto ${props => props.size};
// `;

const Characters = props => {
  const [lang] = useTranslation('characters');

  const [characters, setCharacters] = useState(
 [{   alias: "La rosa del desierto",
    bio: "Cazarecompensas noxiana",
    created_at: "2021-02-03T04:14:59.593Z",
    id: 1,
    name: "Samira",
    universe: "League of Legends",
    updated_at: "2021-02-03T04:14:59.593Z",
    user_id: 1,}]
    
  );
  const [owner, setOwner] = useState(null);
  const [usrRes, setUsrRes] = useState({});
  const [charDisplay, setCharDisplay] = useState({});

  useEffect(async () => {
    if (characters.length === 1) {
      const arr = [];
      for (let i = 0; i < 50; i++) {
        const obj = characters[0];
        arr.push(obj);
      }
      setCharacters(arr);
    }
    if (!usrRes.status) {
      const fetch = await api_call('GET', `/api/v1/users/${props.match.params.user}`);
      setUsrRes(fetch);
    }
    if (usrRes.status === 'SUCCESS' && owner === null && props.session.user) {
      setOwner(ownership(props.session.user.id, usrRes.user.id));
    }
    if (usrRes.status === 'SUCCESS' && !characters) {
      const fetch = await api_call('GET', `/api/v1/characters?user=${usrRes.user.id}`);
      setCharacters(fetch);
    }
    if (characters && characters.length > 0 && !charDisplay.name) {
      setCharDisplay(characters[0]);
    }
  });

  return (
    <Cont styles={{ width: '70vw', borderRight: `1px solid ${colors.grey}`, borderLeft: `1px solid ${colors.grey}`  }}>
      {usrRes.status === 'SUCCESS' ?
      <>
        {owner ?
          <Header path={props.location.pathname.split('/').filter(e => e)} history={props.history} user={props.session.user.username}/>
        : null}
        {characters && characters.length === 0 ?
          <p>{lang('empty_chars')}</p>
        : 
          <>
            <ContRes params={{ aspectRatio: (16 / 9), }} styles={{
              backgroundImage: 'url(https://site.groupe-psa.com/content/uploads/sites/3/2016/12/white-background-2.jpg)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              display: 'flex',
              alignItems: 'flex-end'
            }}>
              <Carousel params={{ items: 6, slideGap: 1, }}>
                {characters.map((e, i) =>
                  <CharacterCard key={`${e.name}-${i}`} character={e} />
                )}
              </Carousel>
            </ContRes>
          </>
        }
      </>
      : usrRes && usrRes.status === 'NO_USER' ?
        <p>{lang('errors.no_user')}{`${props.match.params.user}`}</p>
      :
        <p>{lang('erros.bad_request')}</p>
      }
    </Cont>
  )
};

{/* <>
            <ContRes params={{ gap: '5%', }} styles={{ width: '15%', backgroundColor: colors.darkGrey, border: `1px solid ${colors.grey}`, borderRadius: '3px', transform: 'skewX(-5deg)', overflow: 'hidden', }}>
              <Cont params={{ styles: { transform: 'skewX(5deg)', left: '-5%' }, width: '110%' , height: '70%', img: { src: 'https://static.13.cl/7/sites/default/files/esports/articulos/field-image/lol-champion-samira-lanzamiento.jpg' } }}>

              </Cont>
              <Flex params={{ disposition: 'center', styles: { top: '-5%', left: '-5%', transform: 'skewX(5deg)', width: '110%', backgroundColor: colors.darkGrey, height: '35%', clipPath: 'polygon(0 0, 20% 0, 30% 10%, 70% 10%, 80% 0, 100% 0, 100% 100%, 0 100%)'}, }}>
                <ResText params={{ bold: true, color: colors.paleBlue, align: 'center', base: 7}}>
                  <p>Samira</p>
                </ResText>
              </Flex>
            </ContRes>
          </> */}

{/* <ContResponsive>
              <div className="holder">
                <BackGroundImage size={`110%`} img={"https://images.contentstack.io/v3/assets/blt731acb42bb3d1659/blt1215d602efe4f66a/5f48197070ca0f65ba109ee6/Samira_BaseSplash_FINAL_optimized.jpg"} />
                <div className="header">
                  <div className="char-name">
                    <img className="badge" src={silver_medal_t1} alt={lang('badge')} />
                    <div>
                      <h2 className="name">{charDisplay.name}</h2>
                      <p className="alias">{charDisplay.alias}</p>
                    </div>
                  </div>
                  <User name={usrRes.user.username} img="https://i.pinimg.com/236x/83/ff/7c/83ff7ca8f68b1cb9b56759c41e5c15d4.jpg" />
                </div>
              {characters ?
                <Carousel chars={characters} setDisplay={setCharDisplay} />
              : null}
              </div>
            </ContResponsive> */}
export default Characters;
