import { Box, Card, CardActionArea } from '@mui/material';
import NextLink from 'next/link';


const ItemProducto = ({ children, slug }) => {
  return (
    <>
      <NextLink href={`/product/${slug}`} passHref>
        <CardActionArea
          sx={{
            display: 'grid',
            px: 1,
            pb: 2,
            border: 1,
            borderColor: 'grey.300',
          }}
        >
          {children}
        </CardActionArea>
      </NextLink>
    </>
  );
};

export default ItemProducto;
