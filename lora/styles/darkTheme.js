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
          color: '#EEBC1D'
        }
      }
    }
  },
  palette: {
    mode: "dark",
    primary: {
      main: "#17171A",
      light: "#f1f5f9",
      secondary: "#EEBC1D"
    },
    secondary: {
      main: "#EEBC1D"
    },
    table: {
      hover: "#161924"
    },
    error: {
      main: red.A400
    },
    background: {
      default: '#20222C',
    },
    text: {
      primary: "#f1f5f9",
      secondary: "#94a3b8",
      title: '#EEBC1D'
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
    body: {
      height: '100%'
    }
  }
});

export default theme;
