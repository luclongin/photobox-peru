import { createTheme } from '@mui/material/styles';
import { purple } from '@mui/material/colors';
import Button from '@mui/material/Button';

const theme = createTheme({
  palette: {
    primary: {
      main: '#FF66C4', // rgb(255, 102, 196)
      darker: 'rgb(178, 71, 137)',
    },
    secondary: {
      main: '#FFFFFF',
    },
    background: {
      main: "#FAF9F9"
    }
  },
  typography: {
      fontFamily: [
            'Questrial',
            'Arial',
            'sans-serif'
      ].join(','),
      button: {
            textTransform: 'none'
      },
      h1 : {
        fontSize: '2em',
        color: '#000000'
      },
      h2 : {
        fontSize: '1.3em',
        color: '#9B8E9A'
      },
      carth1: {
        fontSize: '1.1em',
        color: '#000'
      },
      carth2: {
        fontSize: '1em'
      },
      carth3: {
        fontSize: '0.9em'
      },
      carth1gray: {
        fontSize: '1.1em',
        color: '#9B8E9A'
      },
      orderh1: {
        fontSize: '1.9em',
        textDecoration: 'underline',
        textDecorationColor: '#FF66C4',
        textDecorationThickness: 3,
      },
      orderh1withoutUnderline: {
        fontSize: '1.6em',
      },
      giftCardHowItWorks: {
        fontSize: '1.2em',
        lineHeight: '1.3em'
      },
      letrasinput: {
        fontSize: '11em',
        fontStyle: 'Bold',
        fontFamily: 'Arial',
        margin: '0',
        padding: '0',
        position: 'absolute',
        top: '-20px',
        left: '15px'
      },
      deliveryTitle: {
        fontSize: '1.2em',
        color: '#000000',
        fontFamily: 'Questrial'
      },
      deliverySubtitle: {
        fontSize: '0.95em',
        color: '#9B8E9A',
        fontFamily: 'Questrial'
      }
    },
});

export default theme;
