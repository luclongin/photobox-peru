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
import SearchIcon from '@mui/icons-material/Search';
import { checkDiscount } from "../../features/discountUpload/discountUpload";
import { setAppliedDiscount, setDiscountAmount } from "../../features/appliedDiscount/appliedDiscountSlice";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { Fragment } from "react";
import { deleteDiscount } from "../../features/discountUpload/discountUpload";
import { useEffect } from "react";

const Checkout = () => {
      const dispatch = useDispatch();
      const photos = useSelector(state => state.photos);
      const productType = useSelector(state => state.product);
      const delivery = useSelector(state => state.delivery);
      const userInfo = useSelector(state => state.userInfo);
      const additionalPhrases = useSelector(state => state.additionalPhrases);
      const letters = useSelector(state => state.letters);
      const [discountCode, setDiscountCode] = useState("");
      const [discountApplied, setDiscountApplied] = useState(null);
      const [discountCodeFailed, setDiscountCodeFailed] = useState(false);

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

      const handleAdditionalPhrase = async (e, orderId) => {
            e.preventDefault();
            //create new phrase
            await Promise.all(additionalPhrases.map(async (phrase) => {
                  let phraseData = new FormData();
                  const phraseId = nanoid();
                  phraseData.append('phraseId', phraseId);
                  phraseData.append('orderId', orderId);
                  phraseData.append('phraseType', phrase.phraseType);
                  phraseData.append('phraseText', phrase.phraseText);
                  phraseData.append('phraseColor', phrase.phraseColor);
                  
                  dispatch(createAdditionalPhrase(phraseData)).unwrap()
                  .then(data => {
                        console.log(data);
                  }).catch(e => {
                        console.log("merde addphrase", e);
                  })
            }));
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

      const handleCreateLetter = async (e, orderId) => {
            e.preventDefault();
            const letterData = new FormData();
            //create new letters input\
            letterData.append('orderId', orderId);
            letterData.append('letter1', letters.letter1);
            letterData.append('letter2', letters.letter2);
            letterData.append('letter3', letters.letter3);
            dispatch(createLetter(letterData)).unwrap().then(data => {
                  console.log(data);
            }).catch(e => {
                  console.log("oh merde letter", e);
            })
      }

      const handleCheckout = async e => {  
            const orderId = await handleCreateOrder(e);
            handlePhotoUpload(e, orderId);
            handleCreateUser(e);
            handleAdditionalPhrase(e, orderId);
            if(letters.letter1) {
                  handleCreateLetter(e, orderId);
            }
            console.log("discountApplied from handleCheckout", discountApplied);
            if(discountApplied) {
                  // if there is an applied discount
                  // remove discount from db
                  dispatch(deleteDiscount(discountCode));
            } 
      }

      const handleDiscountChange = (e) => {
            setDiscountCode(e.target.value);
            if(e.target.value === "") {
                  setDiscountCodeFailed(false);
            }
      }

      const handleDiscount = () => {
            dispatch(checkDiscount(discountCode)).then(res => {
                  if(res.payload !== false) {
                        setDiscountApplied(true);
                        setDiscountCodeFailed(false);     
                        let amount = null;
                        let typeOfDiscount = "";
                        if(res.payload.discountAmount !== "") {
                              amount = res.payload.discountAmount;
                              typeOfDiscount = "amount";
                        } else {
                              amount = res.payload.discountPercentage;
                              typeOfDiscount = "percentage";
                        }
                        dispatch(setAppliedDiscount({
                              type: typeOfDiscount,
                              value: amount
                        }));
                  } else {
                        // if discount doesn't exist
                        // error message
                        setDiscountCodeFailed(true);
                  }
            });
      }

      const handleRemoveDiscount = () => {
            setDiscountCode("");
            setDiscountApplied(null);
            setDiscountCodeFailed(false);
            dispatch(setAppliedDiscount({
                  type: "",
                  value: ""
            }));
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
                                    <Grid item xs={6} display="flex"> 
                                          <FormGroup sx={{
                                    }}>
                                                <Typography variant="orderh1" sx={{textAlign: 'left', mt: 2}}>
                                                      Dirección
                                                </Typography>
                                                <AddressAddition />
                                          </FormGroup>
                                    </Grid>

                                    <Grid item xs={6} display="flex">
                                          <FormGroup>
                                                <Typography variant="orderh1" sx={{textAlign: 'left', mt: 2}}>
                                                Descuentos
                                          </Typography>

                                          <FormControl sx={{mt: 2}}>
                                                <InputLabel htmlFor="outlined-adornment-discount">Añadir descuento</InputLabel>
                                                <OutlinedInput
                                                      label="Añadir descuento"
                                                      id="outlined-adornment-discount"
                                                      size="medium"
                                                      color={(discountApplied===null) ? null: "success"}
                                                      disabled={(discountApplied!==null)}
                                                      error={discountCodeFailed===true}
                                                      value={discountCode}
                                                      onChange={handleDiscountChange}
                                                      endAdornment={
                                                            <InputAdornment position="end">
                                                                  { discountApplied===null ?
                                                                        
                                                                        <IconButton
                                                                              aria-label="toggle search"
                                                                              edge="end"
                                                                              onClick={handleDiscount}
                                                                              sx={{
                                                                              }}
                                                                        >
                                                                              <SearchIcon/>
                                                                        </IconButton>
                                                                        
                                                                        :
                                                                        <Fragment>
                                                                        <CheckCircleOutlineIcon sx={{color:"#3CB371", marginRight: -1}} />
                                                                        <Tooltip title="Eliminar descuento">
                                                                        <IconButton
                                                                              onClick={handleRemoveDiscount}
                                                                              sx={{
                                                                                    marginRight: -2
                                                                              }}
                                                                        >
                                                                              <HighlightOffIcon />
                                                                        </IconButton>
                                                                        </Tooltip>
                                                                        </Fragment>
                                                                  }
                                                            </InputAdornment>
                                                      }
                                                />
                                                {
                                                      // show if tried and failed
                                                      discountCodeFailed ?
                                                      <FormHelperText error sx={{ml: 0}}>El codigo no es valido</FormHelperText>
                                                      : null
                                                }
                              
                                                {(discountApplied!==null) ?
                                                      <FormHelperText sx={{ml: 0, mt: 0, color: '#3CB371'}}>El descuento esta anadido</FormHelperText> : null
                                                }
                                                </FormControl>
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