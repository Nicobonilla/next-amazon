import Head from 'next/head';
import Image from 'next/image';
import Layout from '../components/Layout.jsx';

import { useState, useEffect, useContext } from 'react';
import { Container, Box, Grid, Typography, Button } from '@mui/material';
import InfoProducto from '../components/InfoProducto';
import ImagenProducto from '../components/ImagenProducto';
import ItemProducto from '../components/ItemProducto';
import ProductoBoton from '../components/ProductoBoton';
import db from '../utils/db';
import Product from '../models/Product';
import axios from 'axios';
import { Store } from '../utils/Store';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';

export default function Home(props) {
  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  const { products } = props;

  const addToCartHandler = async (product) => {
    const existItem = state.cart.cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1
    const { data } = await axios.get(`/api/products/${product._id}`);     
    if(data.countInStock < quantity){
      window.alert('Sorry. Product is out of stock')
      return
    }

    dispatch({ type: 'CART_ADD_ITEM', payload: { ...product, quantity } });
    router.push('/cart');
  };

  return (
    <>
      <Layout>
        <h1> Products</h1>
        <Grid container spacing={0} maxWidth="lg">
          {!products
            ? 'No encuentra productos'
            : products.map((producto) => {
                let { id, name, urlImage, price, discount, slug, category } =
                  producto;
                return (
                  <Grid item  xs={6} sm={4} md={4} lg={3} xl={3} key={id}>
                    <ItemProducto slug={slug}>
                      <ImagenProducto urlImage={urlImage} />
                      <InfoProducto
                        name={name}
                        price={price}
                        discount={discount}
                      />
                      <Box
                        display="flex"
                        sx={{
                          alignItems: 'flex-end',
                          mt: 3,
                          justifyContent: 'center',
                        }}
                      >
                        <Button
                          variant="contained"
                          size="small"
                          sx={{ mt: 2, width: 140, height: 25 }}
                          onClick={() => addToCartHandler(producto)}
                        >
                          <Typography variant="button">Agregar</Typography>
                        </Button>
                      </Box>
                    </ItemProducto>
                  </Grid>
                );
              })}
        </Grid>
      </Layout>
    </>
  );
}

export async function getServerSideProps() {
  await db.connect();
  const products = await Product.find({}).lean();
  await db.disconnect();
  return {
    props: {
      products: products.map(db.convertDocToObj),
    },
  };
}
