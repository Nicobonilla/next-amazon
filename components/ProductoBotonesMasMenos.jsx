import {Box, Button} from '@mui/material'

const ProductoBotonMasMenos = (count) => {
    const menos = (count) => count > 1 && setCount(count-1)
    return (
        <>
            <Button variant="contained" sx={{height: 25, minWidth: 25, width: 25, mr:3 }}
                onClick={() => { menos(count) }}
            >    
                - 
            </Button> 
            {count}
            <Button 
                variant="contained" sx={{height: 25, minWidth: 25, width: 25, ml:3 }} 
                onClick={() => setCount(count + 1)}
            >
                +
            </Button>
        </>
    );
};

export default ProductoBotonMasMenos();
