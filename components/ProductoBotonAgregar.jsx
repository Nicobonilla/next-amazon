import {useState} from 'react'
import {Button} from '@mui/material'

const ProductoBotonAgregar = () => {
    return (
        <>
            <Button variant="contained" 
            sx={{mt:2, width:140, height: 25}}
            onClick={() => setCount(1)}
            >
                Agregar
            </Button> 
        </>
  )
}

export default ProductoBotonAgregar();
