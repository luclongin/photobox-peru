import React, {useState} from "react";
import { Box, Divider, Button, FormControlLabel, FormGroup, Grid, Radio, RadioGroup, Typography } from "@mui/material";
import { OrderStepTitle } from "../OrderStepTitle/orderStepTitle.component";
import Cart from "../cart/cart.component";
import AddressDialog from "../addressDialog/addressDialog.component";
import { useDispatch, useSelector } from "react-redux";
import { setDelivery } from "../../features/delivery/deliverySlice";
import { createOrder, uploadCroppedPhotos } from "../../features/order/orders";
import dataURLtoFile from "../../utils/dataURLtoFile";
import { nanoid } from "@reduxjs/toolkit";

const Checkout = () => {
      const dispatch = useDispatch();
      const photos = useSelector(state => state.photos);
      const additionalPhrases = useSelector(state => state.additionalPhrases);
      const productType = useSelector(state => state.product);
      const delivery = useSelector(state => state.delivery);
      const userInfo = useSelector(state => state.userInfo);
      console.log("photos:", photos);
      
      const handleDelivery = (e) => {
            dispatch(setDelivery(e.target.value));
      }
      
      const [open, setOpen] = useState(false);

      const handleOpen = () => {
            setOpen(true);
      };

      const handleClose = () => {
            setOpen(false);
      };

      const getFileFromUrl = async (url, name) => {
            let file = await fetch(url).then(async r => await r.blob())
            .then(blobFile => new File([blobFile], name, {type: "image/jpeg"}));
            return file;
      }

      const getFormData = object => Object.keys(object).reduce((formData, key) => {
            formData.append(key, object[key]);
            return formData;
        }, new FormData());

      /*const convertDataToFormData = (photos) => {
            // IN PHOTOS
            // GET ALL PHOTOS PERTAINING TO UNIQUE ID
            
            //IN ORDERS
            // 1 UNIQUE ID IS ENOUGH TO GET PHOTOS..
            // DELIVERY TYPE
            // ADDRESS
            // TOTAL PRICE
            // HOW MANY PHOTOS + ADD. PHRASES
            let formData = new FormData();
            
            return formData;
      }*/
      
      //console.log("trying: ", convertPhotosToFormData(photos));

      const uploadPhotos = async e => {  
            e.preventDefault();

            // HANDLING UPLOAD OF PHOTOS
            let photosFormData = new FormData();
            // a way to execute await in a for loop all simultaneously
            await Promise.all(photos.map(async (photo) => {
                  const photoName = photo.id + '-' + photo.name;
                  const newImage = await getFileFromUrl(photo.imgResult, photoName);
                  photosFormData.append('file', newImage);
            }));

            dispatch(uploadCroppedPhotos(photosFormData)).unwrap()
            .then(data => {
                  console.log(data);
                  // revoke all URLs
                  photos.forEach(photo => {
                        URL.revokeObjectURL(photo.imgResult);
                        URL.revokeObjectURL(photo.imgSrc);
                  })
            }).catch(e => {
                  console.log("merde", e);
            });

            // HANDLING ORDER 
            let orderData = new FormData();
            // create new id 
            orderData.append('orderId', nanoid());
            orderData.append('userId', userInfo.userId);
            orderData.append('productType', productType);
            orderData.append('deliveryType', delivery);
            
            dispatch(createOrder(orderData)).unwrap()
            .then(data => {
                  console.log(data);
            }).catch(e => {
                  console.log("oh merde", e);
            })
      }

      return(
            <Box>
                  <Grid container sx={{
                        paddingLeft: 30
                  }}>
                        <Grid item xs={5}>
                              <OrderStepTitle title="Mi pedido" marginBottom={5}/>
                              <Grid container>
                                    <Grid item xs={12} display="flex" justifyContent="center" alignItems="flex-start"> 
                                          <FormGroup sx={{
                                    }}>
                                                <Typography variant="orderh1" sx={{textAlign: 'left'}}>
                                                      Delivery
                                                </Typography>
                                                <RadioGroup
                                                      aria-labelledby="delivery-select"
                                                      name="delivery-selection"
                                                      onChange={handleDelivery}
                                                      value={delivery}
                                                >
                                                      <FormControlLabel value="gratis" control={<Radio />} label="Delivery Gratis (entregado en 1 semana)" sx={{
                                                            mt: 2
                                                      }}/>
                                                      <FormControlLabel value="express" control={<Radio />} label="Delivery Express (entregado en 48 horas)" sx={{
                                                            mt: -1
                                                      }} />
                                                </RadioGroup>
                                          </FormGroup>
                                    </Grid>

                              </Grid>

                              <Divider variant="middle" sx={{mt: 2, mb: 2, ml: -1}}/> 
                              
                              <Grid container>
                                    <Grid item xs={12} display="flex" justifyContent="center" alignItems="flex-start"> 
                                          <FormGroup sx={{
                                    }}>
                                                <Typography variant="orderh1" sx={{textAlign: 'left', mt: 2}}>
                                                      Dirección
                                                </Typography>
                                                <Button variant="contained" sx={{
                                                      color: "#FFFFFF",
                                                      width: 200,
                                                      padding: 1,
                                                      fontSize: '1.1em',
                                                      mt: 2,
                                                      mb: 2
                                                }} onClick={handleOpen}>
                                                      Añadir dirección
                                                </Button>
                                                <AddressDialog open={open} handleClose={handleClose} />
                                          </FormGroup>
                                          <AddressDialog open={open} handleClose={handleClose} />
                                    </Grid>
                              </Grid>
                              <Divider variant="middle" sx={{mt: 2, mb: 2, ml: -1}}/> 
                              <Grid container>
                                    <Grid item xs={12} display="flex" justifyContent="center" alignItems="flex-start"> 
                                          <FormGroup sx={{
                                    }}>
                                                <Typography variant="orderh1" sx={{textAlign: 'left', mt: 2}}>
                                                      Métodos de pago
                                                </Typography>
                                                <Button onClick={uploadPhotos}>
                                                      Subir fotos en FS
                                                </Button>
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