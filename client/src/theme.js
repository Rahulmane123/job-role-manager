import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#0f766e"
    },
    secondary: {
      main: "#f97316"
    },
    background: {
      default: "#f6f6ef",
      paper: "#fffdf7"
    },
    text: {
      primary: "#17212b",
      secondary: "#46545f"
    }
  },
  shape: {
    borderRadius: 20
  },
  typography: {
    fontFamily: "'Trebuchet MS', 'Segoe UI', sans-serif",
    h2: {
      fontWeight: 800
    },
    h4: {
      fontWeight: 800
    },
    h5: {
      fontWeight: 700
    },
    button: {
      textTransform: "none",
      fontWeight: 700
    }
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          border: "1px solid rgba(15, 118, 110, 0.08)",
          boxShadow: "0 18px 45px rgba(23, 33, 43, 0.08)"
        }
      }
    }
  }
});
