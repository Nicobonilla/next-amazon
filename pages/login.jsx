import {
  Button,
  Grid,
  List,
  ListItem,
  TextField,
  Typography,
  Link,
} from '@mui/material';
import NextLink from 'next/link';
import React, { useState, useContext, useEffect } from 'react';
import Layout from '../components/Layout';
import axios from 'axios';
import { Store } from '../utils/Store';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import { Controller, useForm } from 'react-hook-form';
import { useSnackbar } from 'notistack';

export default function Login() {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const router = useRouter();
  const { redirect } = router.query; //login?redirect=/shipping
  const { state, dispatch } = useContext(Store);
  const { userInfo } = state;

  useEffect(() => {
    if (userInfo) {
      router.push('/');
    }
  }, []);

  const submitHandler = async ({ email, password }) => {
    closeSnackbar()
    // th
    try {
      const { data } = await axios.post('/api/users/login', {
        email,
        password,
      });
      dispatch({ type: 'USER_LOGIN', payload: data });
      router.push(redirect || '/');
    } catch (err) {
      enqueueSnackbar(
        err.response.data ? err.response.data.message : err.message,
        { variant: 'error' }
      );
    }
  };
  return (
    <Layout title="Login">
      <Grid
        sx={{ pt: 10 }}
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <form onSubmit={handleSubmit(submitHandler)}>
          <Typography component="h1" variant="h1">
            Login
          </Typography>
          <List>
            <ListItem>
              <Controller
                name="email"
                control={control}
                defaultValue=""
                rules={{
                  required: true,
                  pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/, // Regular expresion for email validation
                }}
                render={({ field }) => (
                  <TextField
                    variant="outlined"
                    fullWidth
                    id="email"
                    label="Email"
                    inputProps={{ type: 'email' }}
                    error={Boolean(errors.email)}
                    helperText={
                      errors.email
                        ? errors.email.type === 'pattern'
                          ? 'El email no es válido'
                          : 'Ingrese su email'
                        : ''
                    }
                    {...field}
                  ></TextField>
                )}
              ></Controller>
            </ListItem>

            <ListItem>
              <Controller
                name="password"
                control={control}
                defaultValue=""
                rules={{
                  required: true,
                  minLength: 6,
                }}
                render={({ field }) => (
                  <TextField
                    variant="outlined"
                    fullWidth
                    id="password"
                    label="Password"
                    inputProps={{ type: 'password' }}
                    error={Boolean(errors.password)}
                    helperText={
                      errors.password
                        ? errors.password.type === 'minLength'
                          ? 'El largo de la contraseña es mayor a 5 caracteres'
                          : 'Debe ingresar su contraseña'
                        : ''
                    }
                    {...field}
                  ></TextField>
                )}
              ></Controller>
            </ListItem>

            <ListItem>
              <Button
                variant="contained"
                type="sumbit"
                fullWidth
                color="primary"
              >
                Login
              </Button>
            </ListItem>

            <ListItem>
              Aún no tienes una cuenta ? &nbsp;
              <NextLink href={`/register?redirect=${redirect || '/'}`} passHref>
                <Link>Registrarse</Link>
              </NextLink>
            </ListItem>
          </List>
        </form>
      </Grid>
    </Layout>
  );
}
