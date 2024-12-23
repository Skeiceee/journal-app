import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

const purpleTheme = createTheme({
  cssVariables: true,
  palette: {
    primary: {
      main: '#262254',
    },
    secondary: {
      main: '#543884',
    },
    error: {
      main: red.A400,
    },
  },
});

export default purpleTheme;