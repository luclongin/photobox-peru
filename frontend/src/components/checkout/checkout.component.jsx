import React, {useState} from "react";
import { Box, Divider, Button, FormControlLabel, FormGroup, Grid, Radio, RadioGroup, Typography } from "@mui/material";
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

const Checkout = () => {
      const dispatch = useDispatch();
      const photos = useSelector(state => state.photos);
      const productType = useSelector(state => state.product);
      const delivery = useSelector(state => state.delivery);
      const userInfo = useSelector(state => state.userInfo);
      console.log("userInfo", userInfo);
      
      const handleDelivery = (e) => {
            dispatch(setDelivery(e.target.value));
      }

      const getFileFromUrl = async (url, name) => {
            let file = await fetch(url).then(async r => await r.blob())
            .then(blobFile => new File([blobFile], name, {type: "image/jpeg"}));
            return file;
      }

      const addFileExtension = (type) => {
            switch(type) {
                  case "image/jpeg":
                        return ".jpg";
                  case "image/png":
                        return ".png";
                  default:
                        return;
            }
      }

      const handlePhotoUpload = async (e, orderId) => {
            e.preventDefault();

            // HANDLING UPLOAD OF PHOTOS
            let photosFormData = new FormData();
            // a way to execute await in a for loop all simultaneously
            await Promise.all(photos.map(async (photo) => {
                  const photoName = photo.id + addFileExtension(photo.type);
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

            // HANDLE CREATE PHOTOS IN DB
            await Promise.all(photos.map(async (photo) => {
                  let photoData = new FormData();
                  photoData.append('photoId', photo.id);
                  photoData.append('orderId', orderId);
                  const photoName = photo.id + addFileExtension(photo.type);
                  photoData.append('photoName', photoName);
                  dispatch(createPhoto(photoData)).unwrap()
                  .then(data => {
                        console.log(data);
                  }).catch(e => {
                        console.log("oh merde photo upload", e);
                  });
            }));
      };

      const handleCreateOrder = async e => {
            e.preventDefault();
            // HANDLING ORDER 
            let orderData = new FormData();
            // create new id 
            const orderId = nanoid();
            orderData.append('orderId', orderId);
            orderData.append('userId', userInfo.userId);
            orderData.append('productType', productType);
            orderData.append('deliveryType', delivery);
            
            dispatch(createOrder(orderData)).unwrap()
            .then(data => {
                  console.log(data);
            }).catch(e => {
                  console.log("oh merde", e);
            });
            return orderId;
      };

      const handleCreateUser = async e => {
            e.preventDefault();

            const userData = new FormData();
            //create new user
            userData.append('userId', userInfo.userId);
            userData.append('userFullName', userInfo.userFullName);
            userData.append('userEmail', userInfo.userEmail);
            userData.append('userAddress', userInfo.userAddress);
            userData.append('userPhoneNumber', userInfo.userPhoneNumber);
            userData.append('userDistrict', userInfo.userDistrict);
            userData.append('userCity', userInfo.userCity);

            dispatch(createUser(userData)).unwrap().then(data => {
                  console.log(data);
            }).catch(e => {
                  console.log("oh merde user", e);
            });
      }

      const handleCheckout = async e => {  
            const orderId = await handleCreateOrder(e);
            handlePhotoUpload(e, orderId);
            handleCreateUser(e);
      }

      return(
            <Box>
                  <Grid container sx={{
                        paddingLeft: 30
                  }}>
                        <Grid item xs={5}>
                              <OrderStepTitle title="Mi pedido" marginBottom={5}/>
                              <Grid container>
                                    <Grid item xs={12} display="flex"> 
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
                                    <Grid item xs={12} display="flex"> 
                                          <FormGroup sx={{
                                    }}>
                                                <Typography variant="orderh1" sx={{textAlign: 'left', mt: 2}}>
                                                      Dirección
                                                </Typography>
                                                <AddressAddition />
                                          </FormGroup>
                                    </Grid>
                              </Grid>
                              <Divider variant="middle" sx={{mt: 2, mb: 2, ml: -1}}/> 
                              <Grid container>
                                    <Grid item xs={12} display="flex"> 
                                          <FormGroup sx={{
                                    }}>
                                                <Typography variant="orderh1" sx={{textAlign: 'left', mt: 2}}>
                                                      Métodos de pago
                                                </Typography>
                                                <Button onClick={handleCheckout}>
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