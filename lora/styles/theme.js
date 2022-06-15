import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";

const theme = createTheme({
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          height: '100%',
          '> div:first-of-type': {
            height: '100%'
          }
        },
        html:{
          height: '100%'
        },
        '#root': {
          height: '100%'
        },
        a: {
          color: '#8dc647'
        }
      }
    }
  },
  palette: {
    primary: {
      main: '#f1f5f9',
      light: "#f1f5f9"
    },
    secondary: {
      main: "#8dc647"
    },
    table: {
      hover: "#F8FAFD"
    },
    text: {
      primary: "#1A324A",
      secondary: "#00BFFF",
      title: '#8dc647'
    },
    error: {
      main: red.A400
    }
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 768,
      md: 900,
      lg: 1200,
      xl: 1536
    }
  },
  typography: {
    fontFamily: [
      "Lato",
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"'
    ].join(","),
    button: {
      textTransform: 'none',
    },
    body1: {
      fontSize: "1.125rem"
    },
  }
});

export default theme;
