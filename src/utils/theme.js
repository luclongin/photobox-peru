import { createTheme } from '@mui/material/styles';
import { purple } from '@mui/material/colors';
import Button from '@mui/material/Button';

const theme = createTheme({
  palette: {
    primary: {
      main: '#FF66C4',
    },
    secondary: {
      main: '#FFFFFF',
    },
  },
  typography: {
      fontFamily: [
            'Questrial', 'sans-serif'
      ],
    },
});

export default theme;
