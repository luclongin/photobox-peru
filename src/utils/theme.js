import { createTheme } from '@mui/material/styles';
import { purple } from '@mui/material/colors';
import Button from '@mui/material/Button';

const theme = createTheme({
  palette: {
    primary: {
      main: '#FF66C4', // rgb(255, 102, 196)
    },
    secondary: {
      main: '#FFFFFF',
    }
  },
  typography: {
      fontFamily: [
            'Questrial', 'sans-serif'
      ],
      button: {
            textTransform: 'none'
      }
    },
});

export default theme;
