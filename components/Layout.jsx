import React, { useContext } from 'react';
import Head from 'next/head';
import NextLink from 'next/link';
import {
  AppBar,
  Container,
  Toolbar,
  Typography,
  Link,
  Box,
  CssBaseline,
  Switch
} from '@mui/material';
import { ThemeProvider } from '@mui/system';
import { createTheme } from '@mui/material/styles';
import { Store } from '../utils/Store';
import Cookies from 'js-cookie';


export default function Layout({ title, description, children }) {
  
  const { state, dispatch } = useContext(Store);
  const { darkMode } = state

  const theme = createTheme({
    typography: {
      h1: {
        fontSize: '1.6ren',
        fontWight: 400,
        margin: '1rem 0',
      },
      h2: {
        fontSize: '1.4ren',
        fontWight: 400,
        margin: '1rem 0',
      },
      body1: {
        fontWeight: 'normal',
      },
    },
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: {
        main: '#f0c000',
      },
      secondary: {
        main: '#208080',
      },
    },
  });

  const darkModeChangeHandler = () => {
    dispatch({ type: darkMode ? 'DARK_MODE_OFF' : 'DARK_MODE_ON'})
    const newDarkMode = !darkMode
    Cookies.set('darkMode', newDarkMode ? 'ON':'OFF')
  }

  return (
    <div>
      <Head>
        <title>{title ? `${title} - Next Amazon` : `Next Amazon`}</title>
        {description && <meta name="description" content={description} />}
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppBar
          position="static"
          sx={{
            bgcolor: '#203040',
            '& a': {
              ml: 5,
              color: '#ffffff',
            },
          }}
        >
          <Toolbar>
            <NextLink href="/" passHref>
              <Link underline="none" sx={{ flexGrow: 1 }}>
                <Typography
                  sx={{ fontSize: '1.5rem', fontWeight: 'bold', flexGrow: 1 }}
                >
                  Amazon
                </Typography>
              </Link>
            </NextLink>

            <div>
              <Switch checked={darkMode} onChange={darkModeChangeHandler}> </Switch>
              <NextLink href="/cart" passHref>
                Cart
              </NextLink>
              <NextLink href="/login" passHref>
                Login
              </NextLink>
            </div>
          </Toolbar>
        </AppBar>
        <Box sx={{ minHeight: '80vh' }}>{children}</Box>
        <footer>
          <Typography sx={{ textAlign: 'center' }}>
            All rights reserver. Next Amazon
          </Typography>
        </footer>
      </ThemeProvider>
    </div>
  );
}
