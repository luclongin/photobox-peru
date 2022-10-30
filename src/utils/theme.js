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
      }
    },
});

export default theme;
