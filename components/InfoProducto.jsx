import { Box, Typography } from '@mui/material';

const InfoProducto = ({ name, price, discount }) => {
  return (
    <>
      <Box sx={{ mt: 1, display: 'flex' }}> Sin Stock o Oferta </Box>
      <Box sx={{ mt: 1 }}>
        {' '}
        <Typography variant="subtitle2">Marca</Typography>{' '}
      </Box>
      <Typography>
        <Box> {name} </Box>
        <Box> Medida </Box>
        <Box> ${price} label</Box>
        <Box> {discount} </Box>
      </Typography>
    </>
  );
};

export default InfoProducto;
