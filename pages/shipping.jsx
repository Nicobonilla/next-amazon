import { Button, List, ListItem, TextField, Typography } from '@mui/material';
import React, { useState, useContext, useEffect } from 'react';
import Layout from '../components/Layout';
import { Store } from '../utils/Store';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import { Controller, useForm } from 'react-hook-form';
import CheckoutWizard from '../components/CheckoutStepperWizard';

export default function Shipping() {
  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    getValues,
  } = useForm();

  const router = useRouter();
  const { redirect } = router.query;
  const { state, dispatch } = useContext(Store);
  const {
    userInfo,
    cart: { shippingAddress },
  } = state;

  useEffect(() => {
    if (!userInfo) {
      router.push('/login?redirect=/shipping');
    }
    if (shippingAddress) {
      setValue('fullName', shippingAddress.fullName);
      setValue('address', shippingAddress.address);
      setValue('postalCode', shippingAddress.postalCode);
      setValue('comuna', shippingAddress.comuna);
      setValue('region', shippingAddress.region);
    }
  }, []);

  const submitHandler = ({ fullName, address, postalCode, comuna, region }) => {
    dispatch({
      type: 'SAVE_SHIPPING_ADDRESS',
      payload: { fullName, address, postalCode, comuna, region },
    });
    Cookies.set('shippingAddress', {
      fullName,
      address,
      postalCode,
      comuna,
      region,
    });
    router.push('/payment');
  };
  return (
    <>
      <Layout title="Dirección de Envío">
        <CheckoutWizard activeStep={1} />
        <form onSubmit={handleSubmit(submitHandler)}>
          <Typography component="h1" variant="h1">
            Dirección de Envío
          </Typography>

          <List>
            <ListItem>
              <Controller
                name="fullName"
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
                    id="fullName"
                    label="Nombre Completo"
                    error={Boolean(errors.fullName)}
                    helperText={
                      errors.fullName
                        ? errors.fullName.type === 'minLength'
                          ? 'El nombre completo debe tener más de 1 caracter'
                          : 'El nombre completo es obligatorio'
                        : ''
                    }
                    {...field}
                  ></TextField>
                )}
              ></Controller>
            </ListItem>

            <ListItem>
              <Controller
                name="rut"
                control={control}
                defaultValue=""
                rules={{
                  required: true,
                  minLength: 7,
                }}
                render={({ field }) => (
                  <TextField
                    variant="outlined"
                    fullWidth
                    id="rut"
                    label="Rut: 11.111.111-1"
                    inputProps={{ type: '' }}
                    error={Boolean(errors.rut)}
                    helperText={
                      errors.rut
                        ? errors.rut.type === 'minLength'
                          ? 'El rut debe tener al menos 7 caracter'
                          : 'El rut es obligatorio'
                        : ''
                    }
                    {...field}
                  ></TextField>
                )}
              ></Controller>
            </ListItem> 

            <ListItem>
              <Controller
                name="address"
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
                    id="address"
                    label="Dirección"
                    inputProps={{ type: ' ' }}
                    error={Boolean(errors.address)}
                    helperText={
                      errors.address
                        ? errors.address.type === 'minLength'
                          ? 'La dirección debe tener más de 1 caracter'
                          : 'La dirección es obligatoria'
                        : ''
                    }
                    {...field}
                  ></TextField>
                )}
              ></Controller>
            </ListItem>

            <ListItem>
              <Controller
                name="postalCode"
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
                    id="postalCode"
                    label="Código Postal"
                    error={Boolean(errors.postalCode)}
                    helperText={
                      errors.postalCode
                        ? errors.postalCode.type === 'minLength'
                          ? 'El código postal debe tener más de 1 caracter'
                          : 'El código postal es obligatorio'
                        : ''
                    }
                    {...field}
                  ></TextField>
                )}
              ></Controller>
            </ListItem>

            <ListItem>
              <Controller
                name="comuna"
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
                    id="comuna"
                    label="País"
                    error={Boolean(errors.comuna)}
                    helperText={
                      errors.comuna
                        ? errors.comuna.type === 'minLength'
                          ? 'La comuna debe tener más de 1 caracter'
                          : 'La comuna es es obligatorio'
                        : ''
                    }
                    {...field}
                  ></TextField>
                )}
              ></Controller>
            </ListItem>

            <ListItem>
              <Controller
                name="region"
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
                    id="region"
                    label="Región"
                    error={Boolean(errors.region)}
                    helperText={
                      errors.region
                        ? errors.region.type === 'minLength'
                          ? 'La región debe tener más de 1 caracter'
                          : 'La región es obligatorio'
                        : ''
                    }
                    {...field}
                  ></TextField>
                )}
              ></Controller>
            </ListItem>

            <ListItem>
              <Controller
                name="telefono"
                control={control}
                defaultValue=""
                rules={{
                  required: true,
                  minLength: 9,
                }}
                render={({ field }) => (
                  <TextField
                    variant="outlined"
                    fullWidth
                    id="telefono"
                    label="Cel: +56 - 9 XXXX XXXX"
                    error={Boolean(errors.telefono)}
                    helperText={
                      errors.telefono
                        ? errors.telefono.type === 'minLength'
                          ? 'El número debe tener 9 dígitos'
                          : 'El número es obligatorio'
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
                Continuar
              </Button>
            </ListItem>
          </List>
        </form>
      </Layout>
    </>
  );
}
