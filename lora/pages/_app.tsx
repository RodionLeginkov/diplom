import { useState, useEffect } from "react";
import { useMediaQuery } from "@mui/material";

import * as React from 'react';
import Head from 'next/head';
import { AppProps } from 'next/app';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider, EmotionCache } from '@emotion/react';
import theme from '../styles/theme';
import ColorModeContext from "../styles/ColorModeContext";
import createEmotionCache from '../styles/createEmotionCache';
import darkTheme from "../styles/darkTheme";
import NextNProgress from "nextjs-progressbar"

import Layout from '../components/Layout';

const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

export default function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

    const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const mode = localStorage.getItem("mode");

    setDarkMode(Boolean(mode));
  }, []);

  useEffect(() => {
    localStorage.setItem("mode", darkMode.toString());
  }, [darkMode]);

  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  useEffect(() => {
    setDarkMode(prefersDarkMode);
  }, [prefersDarkMode]);

  return (
    <CacheProvider value={clientSideEmotionCache}>
      <Head>
        <title>Next.js MUI</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ColorModeContext.Provider value={{ darkMode, setDarkMode }}>
        <ThemeProvider theme={darkMode ? darkTheme : theme}>
          <CssBaseline />
          <Layout>
            <NextNProgress options={{ showSpinner: true }} />
            <Component {...pageProps} />
          </Layout>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </CacheProvider>
  );
}
