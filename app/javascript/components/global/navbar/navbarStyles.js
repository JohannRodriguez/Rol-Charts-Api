import colors from '../../../styles/colors.json';

const navSys = {
  flex: {
    hover: [
      {
        styles: {
          backgroundColor: colors.darkGrey,
          cursor: 'pointer',
          color: colors.blue,
          transition: 'background-color 0.3s, color 0.3s',
        },
      },
      {
        target: 'svg',
        styles: {
          stroke: colors.blue,
          transition: '0.3s',
        },
      }
    ],
    params: { disposition: 'left-center', },
    styles: {
      padding: '5% 8%',
      borderRadius: '30px',
      transition: 'background-color 0.3s, color 0.3s',
    },
  },
  svg: {
    active: {
      fill: colors.blue,
      stroke: 'none',
      flex: '0 0 20%',
      marginRight: '5%',
    },
    inactive: {
      fill: 'none',
      stroke: colors.light,
      strokeWidth: 5,
      flex: '0 0 20%',
      marginRight: '5%',
      transition: '0.3s',
    },
  },
  resText: {
    params: { base: 14, },
    styles: {
      color: colors.light,
      padding: '2% 1%',
    },
  },
};

export default navSys;