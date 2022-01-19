import {
  Typography,
  Grid,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Link,
  Button,
  Card,
  List,
  ListItem,
  CircularProgress,
} from '@mui/material';
import NumberFormat from 'react-number-format';
import React, { useContext, useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { Store } from '../utils/Store';
import NextLink from 'next/link';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import axios from 'axios';
import { useRouter } from 'next/router';
import { getError } from '../utils/error';
import { useSnackbar } from 'notistack';
import CheckoutWizard from '../components/CheckoutStepperWizard';
import Cookies from 'js-cookie';

function PlaceOrder() {
  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  const {
    userInfo,
    cart: { cartItems, shippingAddress, paymentMethod },
  } = state;

  const itemsPrice = cartItems.reduce((a, c) => a + c.price * c.quantity, 0);
  const shippingPrice = itemsPrice > 20000 ? 0 : 2000;
  const taxPrice = itemsPrice * 0.2;
  const totalPrice = itemsPrice + shippingPrice + taxPrice;

  useEffect(() => {
    if (!paymentMethod) {
      router.push('/payment');
    }
    if (cartItems.length === 0) {
      router.push('/cart');
    }
  }, []);

  const { closeSnackbar, enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);

  const placeOrderHandler = async () => {
    closeSnackbar();
    try {
      setLoading(true);
      const { data } = await axios.post(
        '/api/orders',
        {
          orderItems: cartItems,
          shippingAddress,
          paymentMethod,
          itemsPrice,
          shippingPrice,
          taxPrice,
          totalPrice,
        },
        {
          headers: {
            authorization: `Bearer ${userInfo.token}`,
          },
        }
      );
      dispatch({ type: 'CART_CLEAR' });
      Cookies.remove('cartItems');
      setLoading(false);
      router.push(`/order/${data._id}`);
    } catch (err) {
      setLoading(false);
      enqueueSnackbar(getError(err), { variant: 'error'});
    }
  };
  return (
    <Layout title="Realizar Pedido">
      <CheckoutWizard activeStep={3} />
      <Typography component="h1" variant="h1">
        Realizar Pedido
      </Typography>
      <Grid container spacing={1}>
        <Grid sx={{ flexGrow: true }} item md={9} xs={12}>
          <Card sx={{ m: 1 }}>
            <List>
              <ListItem>
                <Typography component="h2" variant="h2">
                  Dirección de Envío
                </Typography>
              </ListItem>
              <ListItem>
              {shippingAddress.fullName}, {shippingAddress.address}, {shippingAddress.comuna},{' '}
                {shippingAddress.postalCode}, {shippingAddress.region}
              </ListItem>
            </List>
          </Card>

          <Card sx={{ m: 1 }}>
            <List>
              <ListItem>
                <Typography component="h2" variant="h2">
                  Método de Pago
                </Typography>
              </ListItem>
              <ListItem>{paymentMethod}</ListItem>
            </List>
          </Card>

          <Card sx={{ m: 1 }}>
            <List>
              <ListItem>
                <Typography component="h2" variant="h2">
                  Articulos por Comprar
                </Typography>
              </ListItem>
              <ListItem>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Imagen</TableCell>
                        <TableCell>Producto</TableCell>
                        <TableCell align="right">Cantidad</TableCell>
                        <TableCell align="right">Precio</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {cartItems.map((item) => (
                        <TableRow key={item._id}>
                          <TableCell>
                            <NextLink href={`/product/${item.slug}`} passHref>
                              <Link>
                                <Image
                                  src={item.urlImage}
                                  alt={item.name}
                                  width={50}
                                  height={50}
                                  unoptimized="true"
                                />
                              </Link>
                            </NextLink>
                          </TableCell>

                          <TableCell>
                            <NextLink href={`/product/${item.slug}`} passHref>
                              <Link>
                                <Typography>{item.name}</Typography>
                              </Link>
                            </NextLink>
                          </TableCell>

                          <TableCell align="right">
                            <Typography>{item.quantity}</Typography>
                          </TableCell>
                          <TableCell align="right">
                            <Typography>
                              <NumberFormat
                                value={item.price}
                                displayType="text"
                                decimalSeparator={','}
                                thousandSeparator={'.'}
                                prefix="$"
                              />
                            </Typography>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </ListItem>
            </List>
          </Card>
        </Grid>
        <Grid item md={3} xs={12}>
          <Card sx={{ m: 1 }}>
            <List>
              <ListItem>
                <Typography variant="h2">Resumen de Compra</Typography>
              </ListItem>

              <ListItem>
                <Grid container>
                  <Grid item xs={6}>
                    <Typography>Productos:</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography align="right">
                      <NumberFormat
                        value={itemsPrice}
                        displayType="text"
                        decimalSeparator={','}
                        thousandSeparator={'.'}
                        prefix="$"
                      />
                    </Typography>
                  </Grid>
                </Grid>
              </ListItem>

              <ListItem>
                <Grid container>
                  <Grid item xs={6}>
                    <Typography>Impuestos:</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography align="right">
                      <NumberFormat
                        value={taxPrice}
                        displayType="text"
                        decimalSeparator={','}
                        thousandSeparator={'.'}
                        prefix="$"
                      />
                    </Typography>
                  </Grid>
                </Grid>
              </ListItem>

              <ListItem>
                <Grid container>
                  <Grid item xs={6}>
                    <Typography>Costo de Envío:</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography align="right">
                      <NumberFormat
                        value={shippingPrice}
                        displayType="text"
                        prefix="$"
                        decimalSeparator={','}
                        thousandSeparator={'.'}
                      />
                    </Typography>
                  </Grid>
                </Grid>
              </ListItem>

              <ListItem>
                <Grid container>
                  <Grid item xs={6}>
                    <Typography>
                      <strong>Total:</strong>
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography align="right">
                      <strong>
                        <NumberFormat
                          value={totalPrice}
                          displayType="text"
                          decimalSeparator={','}
                          thousandSeparator={'.'}
                          prefix="$"
                        />
                      </strong>
                    </Typography>
                  </Grid>
                </Grid>
              </ListItem>

              <ListItem>
                <Button
                  onClick={placeOrderHandler}
                  variant="contained"
                  color="primary"
                  fullWidth
                >
                  Realizar Pedido
                </Button>
              </ListItem>

              {loading && (
                <ListItem>
                  <CircularProgress />
                </ListItem>
              )}
            </List>
          </Card>
        </Grid>
      </Grid>
    </Layout>
  );
}

export default dynamic(() => Promise.resolve(PlaceOrder), { ssr: false });
