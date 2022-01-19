import React, { useContext, useState } from 'react';
import Head from 'next/head';
import NextLink from 'next/link';
import {
  AppBar,
  Container,
  Grid,
  Toolbar,
  Typography,
  Link,
  Box,
  CssBaseline,
  Switch,
  Badge,
  Button,
  Menu,
  MenuItem,
} from '@mui/material';
import { ThemeProvider } from '@mui/system';
import { createTheme } from '@mui/material/styles';
import { Store } from '../utils/Store';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';

export default function Layout({ title, description, children }) {
  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  const { darkMode, cart, userInfo } = state;

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
    dispatch({ type: darkMode ? 'DARK_MODE_OFF' : 'DARK_MODE_ON' });
    const newDarkMode = !darkMode;
    Cookies.set('darkMode', newDarkMode ? 'ON' : 'OFF');
  };
  const [anchorEl, setAnchorEl] = useState(false);
  const loginClickHandler = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const loginMenuCloseHandler = () => {
    setAnchorEl(false);
  };
  const logoutClickHandler = () => {
    setAnchorEl(false);
    dispatch({ type: 'USER_LOGOUT' });
    Cookies.remove('userInfo');
    Cookies.remove('cartItems');
    router.push('/');
  };
  const open = Boolean(anchorEl);
  
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
              <Switch size="small" checked={darkMode} onChange={darkModeChangeHandler}>
                {' '}
              </Switch>
              <NextLink href="/cart" passHref>
                <Link>
                  {cart.cartItems.length > 0 ? (
                    <Badge
                      color="secondary"
                      badgeContent={cart.cartItems.length}
                    >
                      Cart
                    </Badge>
                  ) : (
                    'Cart'
                  )}
                </Link>
              </NextLink>
              {userInfo ? (
                <>
                  <Button
                    id="basic-button"
                    aria-controls={open ? 'basic-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={loginClickHandler}
                    sx={{
                      color: '#ffffff',
                      fontWeight: 'regular',
                    }}
                  >
                    {userInfo.name}
                  </Button>
                  <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={anchorEl}
                    onClose={loginMenuCloseHandler}
                    MenuListProps={{
                      'aria-labelledby': 'basic-button',
                    }}
                  >
                    <MenuItem onClick={loginMenuCloseHandler}>Profile</MenuItem>
                    <MenuItem onClick={loginMenuCloseHandler}>
                      My account
                    </MenuItem>
                    <MenuItem onClick={logoutClickHandler}>Logout</MenuItem>
                  </Menu>
                </>
              ) : (
                <NextLink href="/login" passHref>
                  <Link>Login</Link>
                </NextLink>
              )}
            </div>
          </Toolbar>
        </AppBar>
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justifyContent="center"
        >
            {children}
        </Grid>
        <footer>
          <Typography sx={{ textAlign: 'center' }}>
            All rights reserver. Next Amazon
          </Typography>
        </footer>
      </ThemeProvider>
    </div>
  );
}
