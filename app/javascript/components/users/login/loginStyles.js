import colors from '../../../styles/colors.json';

const loginStyles = {
  contParent: {
    styles: {
      maxWidth: '600px',
      margin: '5% auto 2%',
      padding: '0 20px',
    }
  },
  contInput: {
    styles: {
      padding: '1px',
      borderRadius: '5px',
      backgroundColor: colors.blue,
      marginBottom: '20px',
      background: `linear-gradient(340deg, ${colors.blue}, ${colors.darkBlue})`,
    },
  },
};

export default loginStyles;
