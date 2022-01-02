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
import React, { useState } from 'react';
import Layout from '../components/Layout';
import axios from 'axios';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submitHandler = async (e) => {
    e.preventDefault(); //para prevenir refresh page al hacer click en login
    try {
        const { data } = await axios.post('/api/users/login', { 
            email,
            password
        });
        alert('Login exitoso')
    } catch (error) {
        alert(error.message)
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
        <form onSubmit={submitHandler}>
          <Typography component="h1" variant="h1">
            Login
          </Typography>
          <List>
            <ListItem>
              <TextField
                variant="outlined"
                fullWidth
                id="email"
                label="Email"
                inputProps={{ type: 'email' }}
                onChange={e=> setEmail(e.target.value)}
              ></TextField>
            </ListItem>

            <ListItem>
              <TextField
                variant="outlined"
                fullWidth
                id="password"
                label="Password"
                inputProps={{ type: 'password' }}
                onChange={e=> setPassword(e.target.value)}
              ></TextField>
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
              <NextLink href="/register" passHref>
                <Link>Registrarse</Link>
              </NextLink>
            </ListItem>
          </List>
        </form>
      </Grid>
    </Layout>
  );
}
