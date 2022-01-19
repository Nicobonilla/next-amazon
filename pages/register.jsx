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
import React, { useContext, useEffect } from 'react';
import Layout from '../components/Layout';
import axios from 'axios';
import { Store } from '../utils/Store';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import { Controller, useForm } from 'react-hook-form';
import { useSnackbar } from 'notistack';

export default function Register() {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const router = useRouter();
  const { redirect } = router.query;
  const { state, dispatch } = useContext(Store);
  const { userInfo } = state;

  useEffect(() => {
    if (userInfo) {
      router.push('/');
    }
  }, []);

  /* const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');*/

  const submitHandler = async ({ name, email, password, confirmPassword }) => {
    closeSnackbar();
    if (password !== confirmPassword) {
      enqueueSnackbar('Las contraseñas no cohinciden', { variant: 'error' });
      return;
    }
    try {
      const { data } = await axios.post('/api/users/register', {
        name,
        email,
        password,
      });
      dispatch({ type: 'USER_LOGIN', payload: data });
      Cookies.set('userInfo', data);
      router.push(redirect || '/');
    } catch (err) {
      enqueueSnackbar(
        err.response.data ? err.response.data.message : err.message,
        { variant: 'error' }
      );
    }
  };
  return (
    <Layout title="Registrarse">
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <form onSubmit={handleSubmit(submitHandler)}>
          <Typography component="h1" variant="h1">
            Registrarse
          </Typography>
          <List>
            <ListItem>
              <Controller
                name="name"
                control={control}
                defaultValue=""
                rules={{
                  required: true,
                  minLength: 2,
                }}
                render={({ field }) => (
                  <TextField
                    variant="outlined"
                    fullWidth
                    id="name"
                    label="Nombre Usuario"
                    inputProps={{ type: 'name' }}
                    error={Boolean(errors.name)}
                    helperText={
                      errors.name
                        ? errors.name.type === 'minLength'
                          ? 'El nombre de usuario debe tener más de 1 caracter'
                          : 'El nombre es obligatorio'
                        : ''
                    }
                    {...field}
                  ></TextField>
                )}
              ></Controller>
            </ListItem>

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
                          ? 'La contraseña debe tener al menos 6 caracteres'
                          : 'Ingrese su contraseña'
                        : ''
                    }
                    {...field}
                  ></TextField>
                )}
              ></Controller>
            </ListItem>

            <ListItem>
              <Controller
                name="confirmPassword"
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
                    id="confirmPassword"
                    label="Confirmár contraseña"
                    inputProps={{ type: 'password' }}
                    error={Boolean(errors.confirmPassword)}
                    helperText={
                      errors.confirmPassword
                        ? errors.confirmPassword.type === 'minLength'
                          ? 'La contraseña tiene más de 5 caracteres'
                          : 'La confirmación de la contraseña es obligatoria'
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
                Registrarse
              </Button>
            </ListItem>

            <ListItem>
              Ya tienes una cuenta? &nbsp;
              <NextLink href={`/login?redirect=${redirect || '/'}`} passHref>
                <Link>Ingresar</Link>
              </NextLink>
            </ListItem>
          </List>
        </form>
      </Grid>
    </Layout>
  );
}
