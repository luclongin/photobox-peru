import { FormControl, Grid, Box } from "@mui/material";
import ProductCard from "../productCard/productCard.component";

const ProductGrid = () => {
      return(
            <Box sx={{ flexGrow: 1, marginTop: '50px'}}>
            <Grid container spacing={3} wrap='wrap' justifyContent='center'>
                  <Grid item xs={3} justifyContent="center" alignItems="center">
                        <ProductCard title="Mismo Tamaño" productName="sameSize" />
                  </Grid>
                  <Grid item xs={3} justifyContent="center" alignItems="center">
                        <ProductCard title="Soñados" productName="sonados" />
                  </Grid>
                  <Grid item xs={3} justifyContent="center" alignItems="center">
                        <ProductCard title="Mix" productName="mix" />
                  </Grid>
            </Grid>
            <Grid container spacing={3} wrap='wrap' justifyContent='center' sx={{
                  marginTop: '5px'
            }}>
                  <Grid item xs={3} justifyContent="center" alignItems="center">
                        <ProductCard title="Mix2" productName="mix2" />
                  </Grid>
                  <Grid item xs={3} justifyContent="center" alignItems="center">
                        <ProductCard title="Mix3" productName="mix3" />
                  </Grid>
                  <Grid item xs={3} justifyContent="center" alignItems="center">
                        <ProductCard title="Mix4" productName="mix4" />
                  </Grid>
            </Grid>
            </Box>
      );
}

export default ProductGrid;