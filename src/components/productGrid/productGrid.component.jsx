import { FormControl, Grid } from "@mui/material";
import ProductCard from "../productCard/productCard.component";

const ProductGrid = ({formData, setFormData}) => {
      return(
            <FormControl>
                  <Grid container spacing={5}>
                        <Grid item xs={4}>
                              <ProductCard title="Mismo Tamaño" productName="sameSize" formData={formData} setFormData={setFormData}/>
                        </Grid>
                        <Grid item xs={4}>
                              <ProductCard title="Soñados" productName="sonados" formData={formData} setFormData={setFormData}/>
                        </Grid>
                        <Grid item xs={4}>
                              <ProductCard title="Mix" productName="mix" formData={formData} setFormData={setFormData}/>
                        </Grid>
                        <Grid item xs={4}>
                              <ProductCard title="Mix2" productName="mix2" formData={formData} setFormData={setFormData}/>
                        </Grid>
                        <Grid item xs={4}>
                              <ProductCard title="Mix3" productName="mix3" formData={formData} setFormData={setFormData}/>
                        </Grid>
                        <Grid item xs={4}>
                              <ProductCard title="Mix4" productName="mix4" formData={formData} setFormData={setFormData}/>
                        </Grid>
                  </Grid>
            </FormControl>
      );
}

export default ProductGrid;