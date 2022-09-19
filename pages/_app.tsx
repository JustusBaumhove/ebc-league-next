import type { AppProps } from "next/app";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import React from "react";
import {
  ThemeProvider,
  createTheme,
  CssBaseline,
  responsiveFontSizes,
} from "@mui/material";

declare module "@mui/material/styles" {
  interface Palette {
    custom: { [key: string]: string };
  }
  interface PaletteOptions {
    custom: { [key: string]: string };
  }
}

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  let theme = createTheme({
    palette: {
      mode: "dark",
      custom: {
        bronze: "#cc8e34",
        silver: "#aaa9ad",
        gold: "#e2b007",
        pro: "#8C0E03",
      },
    },
  });

  theme = responsiveFontSizes(theme);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
