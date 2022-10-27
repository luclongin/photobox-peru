import { FormControl, Grid } from "@mui/material";
import ProductCard from "../productCard/productCard.component";

const ProductGrid = () => {
      return(
            <FormControl>
                  <Grid container spacing={5}>
                        <Grid item xs={4}>
                              <ProductCard title="Mismo Tamaño" productName="sameSize" />
                        </Grid>
                        <Grid item xs={4}>
                              <ProductCard title="Soñados" productName="sonados" />
                        </Grid>
                        <Grid item xs={4}>
                              <ProductCard title="Mix" productName="mix" />
                        </Grid>
                        <Grid item xs={4}>
                              <ProductCard title="Mix2" productName="mix2" />
                        </Grid>
                        <Grid item xs={4}>
                              <ProductCard title="Mix3" productName="mix3" />
                        </Grid>
                        <Grid item xs={4}>
                              <ProductCard title="Mix4" productName="mix4" />
                        </Grid>
                  </Grid>
            </FormControl>
      );
}

export default ProductGrid;