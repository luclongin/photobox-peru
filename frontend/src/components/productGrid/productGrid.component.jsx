import { Typography, FormControl, Grid, Box } from "@mui/material";
import ProductCard from "../productCard/productCard.component";
import {OrderStepTitle} from "../OrderStepTitle/orderStepTitle.component";
import { useSelector } from "react-redux";

const ProductGrid = () => {
      const appliedDiscount = useSelector(state => state.appliedDiscount);
      console.log("applied discount:", appliedDiscount);
      return(
            <Box sx={{height: "100%", direction: 'column', display:'flex', justifyContent: 'center', alignItems: 'center'}}>
                  <Grid container spacing={4} wrap='wrap' display="flex" alignItems="center" justifyContent='center' sx={{
                        mb: 4
                  }}>
                        <Grid item xs={12}>
                              <OrderStepTitle title="Escoje tu producto" marginBottom={3} marginTop={0} />
                        </Grid>
                        <Grid item justifyContent="center" alignItems="center">
                              <ProductCard title="Mismo Tamaño" productName="sameSize" />
                        </Grid>
                        <Grid item justifyContent="center" alignItems="center">
                              <ProductCard title="Letras" productName="letras" />
                        </Grid>
                        <Grid item justifyContent="center" alignItems="center">
                              <ProductCard title="Gift Card" productName="giftCard" />
                        </Grid>
                  </Grid>
            </Box>
      );
}

export default ProductGrid;