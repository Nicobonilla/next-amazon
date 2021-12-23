import { Box, CardMedia } from '@mui/material';

const ImagenProducto = ({ urlImage }) => {
  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <CardMedia
          component="img"
          sx={{
            pt: 1,
            pb: 1,
            height: { xs: 150, md: 180 },
            width: { xs: 150, md: 180 },
          }}
          src={urlImage}
        />
      </Box>
    </>
  );
};

export default ImagenProducto;
