"use client";
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: "var(--font-geist-sans)",
  },
  colorSchemes: {
    light: {
      palette: {
        primary: {
          main: "#1976d2",
        },
        secondary: {
          main: "#dc004e",
        },
      },
    },
    dark: {
      palette: {
        primary: {
          main: "#90caf9",
        },
        secondary: {
          main: "#f48fb1",
        },
      },
    },
  },
});

export default theme;
