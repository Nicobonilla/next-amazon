import { useRouter } from 'next/router';
import React, { useEffect, useContext, useState } from 'react';
import { Store } from '../utils/Store';
import Layout from '../components/Layout';
import CheckoutWizard from '../components/CheckoutStepperWizard.jsx';
import Cookies from 'js-cookie';
import { useForm } from 'react-hook-form';

import {
  Button,
  FormControl,
  FormControlLabel,
  List,
  ListItem,
  Radio,
  RadioGroup,
  Typography,
  FormLabel,
} from '@mui/material';
import { useSnackbar } from 'notistack';

export default function Payment() {

  const router = useRouter();
  const [paymentMethod, setPaymentMethod] = useState('');
  //const [value, setValue] = useState('');
  const { state, dispatch } = useContext(Store);
  const {
    userInfo,
    cart: { shippingAddress },
  } = state;

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  useEffect(() => {
    if (!shippingAddress.address) {
      router.push('/shipping');
    } else {
        setPaymentMethod(Cookies.get('paymentMethod') || '' )
    }
  }, []);

  const hola = (e) => {

  }

  const submitHandler = (e) => {
      console.log("gola")
    closeSnackbar();
    e.preventDefault();
    if (!paymentMethod) {   
      enqueueSnackbar('Ingrese un método de pago, porfavor', {
        variant: 'error',
      });
    } else {
      dispatch({ type: 'SAVE_PAYMENT_METHOD', payload: paymentMethod });
      Cookies.set('paymentMethod', paymentMethod);
      router.push('/placeorder');
    }
  };
  return (
    <Layout title="Método de Pago">
      <CheckoutWizard activeStep={2} />
      <form onSubmit={submitHandler}>
        <List>
          <ListItem>
            <FormControl component="fieldset">
              <FormLabel component="legend">
                <Typography compoment="h1" variant="h1">
                  Método de Pago
                </Typography>
              </FormLabel>

              <RadioGroup
                aria-label="Forma de Pago"
                name="paymentMethod"
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                
              >
                <FormControlLabel
                  value="creditoDebito"
                  control={<Radio />}
                  label="Crédito o Débito"
                ></FormControlLabel>
                <FormControlLabel
                  value="deposito"
                  control={<Radio />}
                  label="Depósito"
                ></FormControlLabel>
                <FormControlLabel
                  value="efectivo"
                  control={<Radio />}
                  label="Efectivo"
                  ></FormControlLabel>
              </RadioGroup>
            </FormControl>
          </ListItem>

          <ListItem>
            <Button fullWidth type="submit" variant="contained" color="primary">
              Continuar
            </Button>
          </ListItem> 

          <ListItem>
            <Button
              fullWidth
              type = "button"
              variant="contained"
              color="secondary"
              onClick={() => router.push('/shipping')}
            >
              Atras
            </Button>
          </ListItem>
        </List>
      </form>
    </Layout>
  );
}
