import Head from 'next/head';
import Image from 'next/image';
import Layout from '../components/Layout';

import { useState, useEffect } from 'react';
import { Container, Box, Grid, Typography } from '@mui/material';
import InfoProducto from '../components/InfoProducto';
import ImagenProducto from '../components/ImagenProducto';
import ItemProducto from '../components/ItemProducto';
import ProductoBoton from '../components/ProductoBoton';
import { data } from '../utils/data.js';
import db from '../utils/db';
import Product from '../models/Product';
/*
const API_PRODUCTOS = 'http://localhost:9002/api/v1/product'
const apiCategorias = 'http://localhost:9002/api/v1/category'
*/

export default function Home(props) {
  const {products} = props

  /*
  const [produc, setProduc] = useState()
  const [count, setCount] = useState(0);
  
  const productos = async() => {
    const res = await fetch(API_PRODUCTOS)
    const products = await res.json()
    setProduc(products)
  }
  /*/
  // //sx={{ display:'grid', gridTemplateColumns:'repeat(2,1fr)'}}>
  /* useEffect(() => {
    productos()
  }, [0])
  */

  return (
    <>
      <Layout>
          <h1> Products</h1>
          <Grid container spacing={0} maxWidth="sm">
            {!products
              ? 'No encuentra productos'
              : products.map((producto) => {
                  let { id, name, urlImage, price, discount, slug, category } =
                    producto;
                  return (
                    <Grid item xs={6} key={id}>
                      <ItemProducto slug={slug}>
                        <ImagenProducto urlImage={urlImage} />
                        <InfoProducto
                          name={name}
                          price={price}
                          discount={discount}
                        />
                        <ProductoBoton />
                      </ItemProducto>
                    </Grid>
                  );
                })}
          </Grid>
      </Layout>
    </>
  );
}

export async function getServerSideProps(){
  await db.connect()
  const products = await Product.find({}).lean()
  await db.disconnect()
  return {
    props: {
      products: products.map(db.convertDocToObj)
    }
  }
}