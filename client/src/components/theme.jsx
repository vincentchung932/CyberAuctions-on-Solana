// import { createMuiTheme } from "@mui/material";
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      light: '#70a6ff',
      main: '#2b78e4',
      dark: '#004db1',
      contrastText: '#ffffff',
    },
    secondary: {
      light: '#d1f5ff',
      main: '#9ec2f7',
      dark: '#6d92c4',
      contrastText: '#ffffff',
    },
  },
});

export default theme