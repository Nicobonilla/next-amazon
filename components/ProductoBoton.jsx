import { useState, useEffect, createContext, useContext } from 'react';
import { Box, Button, Typography } from '@mui/material';
import ProductoBotonesMasMenos from '../components/ProductoBotonesMasMenos';
import ProductoBotonAgregar from '../components/ProductoBotonAgregar';

const ProductoBoton = () => {
  return (
    <>
        <Box display="flex" sx={{ alignItems: 'flex-end', mt: 3,  justifyContent: 'center' }}>
          <Button
            variant="contained"
            size="small"
            sx={{ mt: 2, width: 140, height: 25 }}
          >
            <Typography variant="button">Agregar</Typography>
          </Button>
        </Box>
    </>
  );
};

export default ProductoBoton;
