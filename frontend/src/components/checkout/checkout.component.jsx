import React, {useState} from "react";
import { Box, Divider, FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton, Button, FormControlLabel, FormGroup, Grid, Radio, RadioGroup, Typography, TextField, FormHelperText, Tooltip } from "@mui/material";
import { OrderStepTitle } from "../OrderStepTitle/orderStepTitle.component";
import Cart from "../cart/cart.component";
import AddressDialog from "../addressDialog/addressDialog.component";
import { useDispatch, useSelector } from "react-redux";
import { setDelivery } from "../../features/delivery/deliverySlice";
import { createOrder } from "../../features/order/orders";
import { createPhoto, uploadCroppedPhotos } from "../../features/photoUpload/photoUpload";
import { nanoid } from "@reduxjs/toolkit";
import { createUser } from "../../features/userInfoUpload/userInfoUpload";
import AddressAddition from "../addressAddition/addressAddition.component";
import { createAdditionalPhrase } from "../../features/additionalPhraseUpload/additionalPhraseUploadSlice";
import { createLetter } from "../../features/lettersUpload/lettersUploadSlice"; 
import { checkDiscount } from "../../features/discountUpload/discountUpload";
import { setAppliedDiscount, setDiscountAmount } from "../../features/appliedDiscount/appliedDiscountSlice";
import { Fragment } from "react";
import { deleteDiscount } from "../../features/discountUpload/discountUpload";
import { useEffect } from "react";
import { setTotalPrice } from "../../features/totalPrice/totalPrice";
import CheckOutOption from "./checkOutOption.component";
import SelectPaymentComponent from "./selectPayment.component";
import YapePopUp from "../yapePopUp/yapePopUp.component";

const Checkout = () => {
      const dispatch = useDispatch();
      const photos = useSelector(state => state.photos);
      const productType = useSelector(state => state.product);
      const delivery = useSelector(state => state.delivery);
      const userInfo = useSelector(state => state.userInfo);
      const additionalPhrases = useSelector(state => state.additionalPhrases);
      const letters = useSelector(state => state.letters);
      const paymentMethod = useSelector(state => state.paymentMethod);

      const handleDelivery = (e) => {
            dispatch(setDelivery(e.target.value));
      }

      return(
            <Box>
                  <Grid container sx={{
                        paddingLeft: 30
                  }}>
                        <Grid item xs={6}>
                              <OrderStepTitle title="Mi pedido" marginBottom={4}/>
                              <Grid container>
                                    <Grid item xs={6} display="flex"> 
                                          <FormGroup sx={{
                                          mt: 2,
                                          mb: 2
                                    }}>
                                                <Typography variant="orderh1withoutUnderline" sx={{textAlign: 'left', mt: 1, mb: 1}}>
                                                      Dirección
                                                </Typography>
                                                <AddressAddition />
                                          </FormGroup>
                                    </Grid>
                              </Grid>
                              <Divider variant="middle" sx={{mt: 1, mb: 2, ml: -1}}/> 
                              <Grid container>
                                    <Grid item xs={12} display="flex"> 
                                          <FormGroup sx={{
                                    }}>
                                                <Typography variant="orderh1withoutUnderline" sx={{textAlign: 'left', paddingBottom: 0}}>
                                                      Tipo de delivery
                                                </Typography>
                                                <Grid container spacing={2} sx={{mt: "-15px", p: 0}}>
                                                      <Grid item xs={6}>
                                                            {
                                                                  // essentially you're sending the redux func to the component
                                                                  // you dispatch this fnc there
                                                            }
                                                            <CheckOutOption setStateFn={setDelivery} selectedState={delivery} option={"gratis"} title={"Delivery Gratis"} subtitle={"Entregado en 1 semana"}/>
                                                      </Grid>      
                                                      <Grid item xs={6}>
                                                            <CheckOutOption setStateFn={setDelivery} selectedState={delivery} option={"express"} title={"Delivery Express"} subtitle={"Entregado en 48h"}/>
                                                      </Grid>      
                                                </Grid>
                                          </FormGroup>
                                    </Grid>

                              </Grid>

                              <Divider variant="middle" sx={{mt: 3, mb: 0, ml: -1}}/> 

                              <Grid container>
                                    <Grid item xs={12} display="flex"> 
                                          <FormGroup sx={{
                                    }}>
                                                <Typography variant="orderh1withoutUnderline" sx={{textAlign: 'left', mt: 2}}>
                                                      Métodos de pago
                                                </Typography>

                                                <Grid container spacing={0} sx={{mt: 0, p: 0}}>
                                                      <Grid item xs={12} sx={{mt: 2}}>
                                                            <SelectPaymentComponent />
                                                      </Grid>       
                                                </Grid>
                                          </FormGroup>
                                    </Grid>
                              </Grid>
                        </Grid>
                        <Grid item xs={3}>
                              <Cart />
                        </Grid>

                  </Grid>
                  
            </Box>
      );
}

export default Checkout;