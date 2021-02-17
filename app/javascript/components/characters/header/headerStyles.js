import colors from '../../../styles/colors.json';

const headerStyles = {
  flexParent: {
    params: { flex: `${100 / 6}%`, },
    styles: { height: 'auto', },
  },
  flexMain: {
    after: {
      styles: {
        width: '100%',
        height: '4px',
        borderRadius: '10px',
        position: 'absolute',
        bottom: '-20%',
        backgroundColor: colors.blue,
      },
    },
    hover: [
      { styles: {
          backgroundColor: colors.darkGrey,
          transition: '0.3s',
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
    params: { disposition: 'center', },
    styles: (i, arr) => {
      return {
        margin: (i == 0 ? '0.7% 0.7% 0.7% 0.45%' : i === (arr.length - 1) ? '0.7% 0.45% 0.7% 0.7%' : '0.7%'),
        padding: '10px 0',
        cursor: 'pointer',
        borderRadius: '5px',
        transition: '0.3s',
      };
    },
  },
  svg: {
    active: {
      fill: colors.blue,
      stroke: 'none',
      width: '30px',
    },
    inactive: {
      fill: 'none',
      stroke: colors.lightGrey,
      strokeWidth: 5,
      width: '30px',
    },
  },
};

export default headerStyles;
