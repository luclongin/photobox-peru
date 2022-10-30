import { Typography, FormControl, Grid, Box } from "@mui/material";
import ProductCard from "../productCard/productCard.component";
import theme from "../../utils/theme";
import {OrderStepTitle} from "../OrderStepTitle/orderStepTitle.component";
const ProductGrid = () => {
      return(
            <Box sx={{ flexGrow: 1, marginTop: 4}}>
            <OrderStepTitle title="Escoje tu producto" />
            <Grid container spacing={3} wrap='wrap' justifyContent='center'>
                  <Grid item justifyContent="center" alignItems="center">
                        <ProductCard title="Mismo Tamaño" productName="sameSize" />
                  </Grid>
                  <Grid item justifyContent="center" alignItems="center">
                        <ProductCard title="Soñados" productName="sonados" />
                  </Grid>
                  <Grid item justifyContent="center" alignItems="center">
                        <ProductCard title="Mix" productName="mix" />
                  </Grid>
            </Grid>
            <Grid container spacing={3} wrap='wrap' justifyContent='center' sx={{
                  marginTop: '5px'
            }}>
                  <Grid item justifyContent="center" alignItems="center">
                        <ProductCard title="Mix2" productName="mix2" />
                  </Grid>
                  <Grid item justifyContent="center" alignItems="center">
                        <ProductCard title="Mix3" productName="mix3" />
                  </Grid>
                  <Grid item justifyContent="center" alignItems="center">
                        <ProductCard title="Mix4" productName="mix4" />
                  </Grid>
            </Grid>
            </Box>
      );
}

export default ProductGrid;