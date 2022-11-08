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
            'Questrial'
      ],
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
      carth1gray: {
        fontSize: '1.1em',
        color: '#9B8E9A'
      },
      orderh1: {
        fontSize: '1.9em',
        textDecoration: 'underline',
        textDecorationColor: '#FF66C4',
        textDecorationThickness: 3,
      }
    },
});

export default theme;
