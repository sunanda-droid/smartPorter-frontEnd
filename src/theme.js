import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#1b5e20 ",
      contrastText: "#fff"
    },
    success: {
      main: "#1b5e20 ",
      contrastText: "#fff"
    }
  },
  components: {
    MuiButton: {
      defaultProps: {
        color: "primary"
      }
    }
  }
});

export default theme;