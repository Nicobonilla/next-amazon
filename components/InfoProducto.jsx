import { Box, Typography } from '@mui/material';
import NumberFormat from 'react-number-format';

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
        <Box>
          <NumberFormat
            value={price}
            displayType="text"
            prefix="$"
            decimalSeparator={','}
            thousandSeparator={'.'}
          />
        </Box>
        <Box> {discount} </Box>
      </Typography>
    </>
  );
};

export default InfoProducto;
