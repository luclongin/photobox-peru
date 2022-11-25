import React, {useState} from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import CartItem from "./cartItem/cartItem.component";
import { getPrice } from "../../utils/pricing";
import { Box, Button, Grid, Typography } from "@mui/material";
import Divider from '@mui/material/Divider';
import { incrementStep, setStep } from "../../features/step/stepSlice";
import { OrderStepTitle } from "../OrderStepTitle/orderStepTitle.component";
import { setTotalPrice } from "../../features/totalPrice/totalPrice";


const Cart = () => {
      const dispatch = useDispatch();
      const photos = useSelector(state => state.photos);
      const addedPhrases = useSelector(state => state.additionalPhrases);
      const product = useSelector(state => state.product);
      const totalPrice = getPrice(product, photos.length) + getPrice("additionalPhrase", addedPhrases.length);
      const delivery = useSelector(state => state.delivery);
      const appliedDiscount = useSelector(state => state.appliedDiscount);
      const [finalPrice, setFinalPrice] = useState(0);

      const handleClick = () => {
            dispatch(incrementStep());
      }

      // User deletes all items from Cart
      const restartProcessOrNot = () => {
            if(photos.length === 0 && addedPhrases.length === 0) {
                  dispatch(setStep(0));
            }
      }

      let price = totalPrice + getPrice("delivery", delivery);
      if(appliedDiscount.type === "amount") {
            price = price + getPrice("delivery", delivery) - appliedDiscount.value;
      } else if (appliedDiscount.type === "percentage") {
            // toFixed(2) fixes the total amount to 2 decimals always
            price = ((1-(appliedDiscount.value/100))*(price + getPrice("delivery", delivery))).toFixed(2);
      } 

      if(price < 0) {
            price=0;
      }

      if(price >= 0) {
            //dispatch(setTotalPrice(price));
      }


      restartProcessOrNot();

      return(
            <Box sx={{
                  backgroundColor: '#FFFFFF',
                  width: 380,
                  height: '100%',
                  position: 'absolute',
                  right: 0,
                  boxShadow: 2
            }}>
                  <Grid container justifyContent="center" sx={{
                        height: "55vh",
                        maxHeight: "55vh",
                  }}>
                       <Grid item xs={12}>
                              <OrderStepTitle title="Mi carrito" marginBottom="3" />
                        </Grid>
                        <Grid container justifyContent="center" sx={{
                              height: "40vh",
                              maxHeight: "40vh",
                              overflowY: "scroll"
                        }}>
                              <Grid item xs={10}>
                                    {(photos.length > 0) && 
                                          <CartItem
                                                id="photosSet"
                                                title={`Set ${product}`}
                                                image={null} 
                                                quantity={photos.length} 
                                                price={getPrice(product, photos.length)}
                                          />
                                    }
                                    {addedPhrases.map((phrase) => {
                                          console.log("phrase added:", phrase);
                                          return(
                                                <CartItem
                                                      key={phrase.id}
                                                      id={phrase.id}
                                                      title={`Letrero ${phrase.phraseText}`}
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
                                    <Typography variant="carth1gray">{
                                          delivery === "gratis" ? "GRATIS" : "14 S/"
                                    }</Typography>            
                              </Grid>
                              { appliedDiscount.type === "amount" ?
                              <Grid item xs={9} justifyContent="space-between" display="flex" sx={{
                                    mt: 1
                              }}>
                                    <Typography variant="carth1gray">Descuento</Typography>      
                                    <Typography variant="carth1gray">
                                          {appliedDiscount.value} S/
                                    </Typography>            
                              </Grid>
                              : null
                              }
                              { appliedDiscount.type === "percentage" ?
                              <Grid item xs={9} justifyContent="space-between" display="flex" sx={{
                                    mt: 1
                              }}>
                                    <Typography variant="carth1gray">Descuento</Typography>      
                                    <Typography variant="carth1gray">
                                          {appliedDiscount.value} %
                                    </Typography>            
                              </Grid>
                              : null
                              }
                        </Grid>      
                        <Divider variant="middle" sx={{mt: 2, mb: 2}}/>  
                        <Grid container justifyContent="center">
                              <Grid item xs={9} justifyContent="space-between" display="flex">
                                    <Typography variant="carth1">Total</Typography>
                                    <Typography variant="carth1">{price} S/</Typography>
                              </Grid>
                        </Grid>
                        <Button variant="contained" sx={{
                              color: '#FFFFFF',
                              width: 180,
                              padding: 1,
                              fontSize: '1.2em',
                              mt: 5
                        }} onClick={handleClick}>
                              Hacer compra      
                        </Button>
                  </Box>      
            </Box>
      );
}

export default Cart;