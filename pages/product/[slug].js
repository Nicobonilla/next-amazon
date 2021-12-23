import React from 'react';
import Image from 'next/image';
import Layout from '../../components/Layout';
import NextLink from 'next/link';
import {
  Link,
  Box,
  Grid,
  ListItem,
  List,
  Typography,
  Card,
  Button,
} from '@mui/material';
import Product from '../../models/Product.js';
import db from '../../utils/db.js';

export default function ProductScreen(props) {
  const {product} = props

  if (!product) {
    return <div> Product Not Found </div>;
  }
  return (
    <Layout title={product.name} description={product.description}>
      <Box sx={{ mt: 3, mb: 2 }}>
        <NextLink href="/" passHref>
          <Link>Back to products</Link>
        </NextLink>
      </Box>
      <Grid container spacing={1}>
        <Grid item md={6} xs={12}>
          <Image
          unoptimized = "true"
            loader={() => product.urlImage}
            src={product.urlImage}
            alt={product.name}
            width={640}
            height={640}
            layout="responsive"
          />
        </Grid>
        <Grid item md={3} xs={12}>
          <List>
          <Typography component="h1" variant="h6">
              <ListItem>{product.name}</ListItem>{' '}
            </Typography>
            <Typography>
              <ListItem>Category: {product.category}</ListItem>{' '}
            </Typography>
            <Typography>
              <ListItem>Brand: {product.brand}</ListItem>{' '}
            </Typography>
            <Typography>
              <ListItem>
                Rating: {product.rating} starts ({product.numReviews} reviews)
              </ListItem>
            </Typography>
            <Typography>
              <ListItem>
                Description:
                <Typography>{product.description}</Typography>
              </ListItem>
            </Typography>
          </List>
        </Grid>
        <Grid item md={3} xs={12}>
          <Card>
            <List>
              <ListItem>
                <Grid container>
                  <Grid item xs={6}>
                    <Typography>Price</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography>${product.price}</Typography>
                  </Grid>
                </Grid>
              </ListItem>
              <ListItem>
                <Grid container>
                  <Grid item xs={6}>
                    <Typography>Status</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography>
                      {product.conuntInStock > 0 ? 'In Stock' : 'Unavailable'}
                    </Typography>
                  </Grid>
                </Grid>
              </ListItem>
              <ListItem>
                  <Button fullWidth variant="contained" color="primary">
                      Add to cart
                  </Button>
              </ListItem>
              
            </List>
          </Card>
        </Grid>
      </Grid>
    </Layout>
  );
}

export async function getServerSideProps(context){
    const {params} = context
    const {slug} = params

    await db.connect()
    const product = await Product.findOne({slug}).lean()
    await db.disconnect()
    return {
      props: {
        product: db.convertDocToObj(product)
      }
    }
  }