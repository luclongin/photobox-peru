import React from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import CartItem from "./cartItem/cartItem.component";
import { getPrice } from "../../utils/pricing";
import { Box, Button, Grid, Typography } from "@mui/material";
import Divider from '@mui/material/Divider';


const Cart = () => {
      const photos = useSelector(state => state.photos);
      const addedPhrases = useSelector(state => state.additionalPhrases);
      const product = useSelector(state => state.product);
      const totalPrice = getPrice(product, photos.length) + getPrice("additionalPhrase", addedPhrases.length);

      return(
            <Box sx={{
                  backgroundColor: '#FFFFFF',
                  width: 380,
                  height: '100%',
                  position: 'absolute',
                  right: 0
            }}>
                  <Grid container justifyContent="center" sx={{
                        height: "55vh",
                        maxHeight: "55vh",
                  }}>
                       <Grid item xs={12}>
                              <Typography variant="h1" sx={{
                                    mt: 4, mb: 0
                              }}>Mi pedido</Typography>
                        </Grid>
                        <Grid container justifyContent="center" sx={{
                              height: "40vh",
                              maxHeight: "40vh",
                              overflowY: "scroll"
                        }}>
                              <Grid item xs={10}>
                                    <CartItem
                                          title={`Set ${product}`}
                                          image={null} 
                                          quantity={photos.length} 
                                          price={getPrice(product, photos.length)}
                                    />
                                    {addedPhrases.map((phrase) => {
                                          return(
                                                <CartItem
                                                      title={`Letrero ${phrase.text}`}
                                                      image={null}
                                                      quantity={1}
                                                      price={getPrice("additionalPhrase", 1)}
                                                />
                                          );
                                    })}
                              </Grid>

                        </Grid>
                  </Grid>
                  <Box sx={{
                        height: "35vh",
                        minHeight: "35vh",
                        width: '100%'
                  }}>
                        <Divider variant="middle" sx={{mpt: 3, mb: 2}}/>  
                        <Grid container justifyContent="center">
                              <Grid item xs={9} justifyContent="space-between" display="flex">
                                    <Typography variant="carth1gray">Subtotal</Typography>      
                                    <Typography variant="carth1gray">{totalPrice} S/</Typography>            
                              </Grid>
                              <Grid item xs={9} justifyContent="space-between" display="flex" sx={{
                                    mt: 1
                              }}>
                                    <Typography variant="carth1gray">Delivery</Typography>      
                                    <Typography variant="carth1gray">GRATIS</Typography>            
                              </Grid>
                        </Grid>      
                        <Divider variant="middle" sx={{mt: 2, mb: 2}}/>  
                        <Grid container justifyContent="center">
                              <Grid item xs={9} justifyContent="space-between" display="flex">
                                    <Typography variant="carth1">Total</Typography>
                                    <Typography variant="carth1">{totalPrice} S/</Typography>
                              </Grid>
                        </Grid>
                        <Button variant="contained" sx={{
                              color: '#FFFFFF',
                              width: 180,
                              padding: 1,
                              fontSize: '1.2em',
                              mt: 5
                        }}>
                              Hacer compra      
                        </Button>
                  </Box>      
            </Box>
      );
}

export default Cart;