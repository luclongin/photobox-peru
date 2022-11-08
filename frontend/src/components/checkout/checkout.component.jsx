import React, {useState} from "react";
import { Box, Divider, Button, FormControlLabel, FormGroup, Grid, Radio, RadioGroup, Typography } from "@mui/material";
import { OrderStepTitle } from "../OrderStepTitle/orderStepTitle.component";
import Cart from "../cart/cart.component";
import AddressDialog from "../addressDialog/addressDialog.component";
import { useDispatch, useSelector } from "react-redux";
import { setDelivery } from "../../features/delivery/deliverySlice";
import { uploadCroppedPhotos } from "../../features/order/orders";
import dataURLtoFile from "../../utils/dataURLtoFile";

const Checkout = () => {
      const dispatch = useDispatch();
      const photos = useSelector(state => state.photos);
      const additionalPhrases = useSelector(state => state.additionalPhrases);

      const delivery = useSelector(state => state.delivery);
      
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

      const uploadPhotos = async e => {  
            e.preventDefault();
            let formData = new FormData();
            // a way to execute await in a for loop all simultaneously
            await Promise.all(photos.map(async (photo) => {
                  const photoName = photo.id + '-' + photo.name;
                  const newImage = await getFileFromUrl(photo.imgResult, photoName);
                  formData.append('file', newImage);
            }));
            dispatch(uploadCroppedPhotos(formData)).unwrap()
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