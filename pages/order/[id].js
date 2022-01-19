import React, { useContext, useEffect, useReducer, useState } from 'react';
import dynamic from 'next/dynamic';
import Layout from '../../components/Layout';
import { Store } from '../../utils/Store';
import NextLink from 'next/link';
import Image from 'next/image';
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
  Card,
  List,
  ListItem,
  CircularProgress,
} from '@mui/material';
import NumberFormat from 'react-number-format';
import axios from 'axios';
import { useRouter } from 'next/router';
import { getError } from '../../utils/error';
import { useSnackbar } from 'notistack';
import CheckoutWizard from '../../components/CheckoutStepperWizard';
import Cookies from 'js-cookie'
//const round2 = num => Math.round(num+100)/100 // 123.456 => 123.46

function reducer(state, action) {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true, error: '' };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, order: action.payload, error: '' };
    case 'FETCH_FAIL':
      return { ...state, loading: false, order: action.payload };
    default:
      state;
  }
}

function Order({ params }) {
  const orderId = params.id;
  const router = useRouter();
  const { state } = useContext(Store);

  const { userInfo } = state;

  // definicion of reducer
  const [{ loading, error, order }, dispatch] = useReducer( reducer, {
    loading: true,
    order: {},
    error: '',
  }); 

  const {
    shippingAddress,
    paymentMethod,
    orderItems,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = order;

  useEffect(() => {
    if (!userInfo) {
      return router.push('/login');
    }
    const fetchOrder = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' });
        const { data } = await axios.get(`/api/orders/${orderId}`, {
          headers: { authorization: `Bearer ${userInfo.token}` },
        });
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
      }
    };
    if (!order._id || (order._id && order.id !== orderId)) {
      fetchOrder();
    }
  }, [order]);

  const { closeSnackbar, enqueueSnackbar } = useSnackbar();

  return (
    <Layout title={`Detalle Pedido ${orderId} `}>
      <CheckoutWizard activeStep={3} />
      <Typography component="h1" variant="h1">
        Pedido ID {orderId}
      </Typography>
      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Typography sx={{color:'#f04040'}}>{error}</Typography>
      ) : (
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

                  {shippingAddress.address}, {shippingAddress.comuna},{' '}
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
                        {orderItems.map((item) => (
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
              </List>
            </Card>
          </Grid>
        </Grid>
      )}
    </Layout>
  );
}

export async function getServerSideProps({ params }) {
  return { props: { params } };
}

export default dynamic(() => Promise.resolve(Order), { ssr: false });
