import React, {useState} from "react";
import { Fragment } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import CartItem from "./cartItem/cartItem.component";
import { getPrice } from "../../utils/pricing";
import Divider from '@mui/material/Divider';
import { createAdditionalPhrase } from "../../features/additionalPhraseUpload/additionalPhraseUploadSlice";
import { createLetter } from "../../features/lettersUpload/lettersUploadSlice"; 
import { createOrder } from "../../features/order/orders";
import { createPhoto, uploadCroppedPhotos } from "../../features/photoUpload/photoUpload";
import { createUser } from "../../features/userInfoUpload/userInfoUpload";
import { incrementStep, setStep } from "../../features/step/stepSlice";
import { OrderStepTitle } from "../OrderStepTitle/orderStepTitle.component";
import { setTotalPrice } from "../../features/totalPrice/totalPrice";
import { Box, FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton, Button, FormControlLabel, FormGroup, Grid, Radio, RadioGroup, Typography, TextField, FormHelperText, Tooltip } from "@mui/material";
import { checkDiscount } from "../../features/discountUpload/discountUpload";
import { setAppliedDiscount } from "../../features/appliedDiscount/appliedDiscountSlice";
import SearchIcon from '@mui/icons-material/Search';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import MercadoPagoButton from "../mercadoPagoButton/mercadoPagoButton.component";
import YapePopUp from "../yapePopUp/yapePopUp.component";
import { nanoid } from "@reduxjs/toolkit";

const Cart = () => {

      const dispatch = useDispatch();
      const letters = useSelector(state => state.letters);
      const userInfo = useSelector(state => state.userInfo);
      const photos = useSelector(state => state.photos);
      const additionalPhrases = useSelector(state => state.additionalPhrases);
      const product = useSelector(state => state.product);
      const totalPrice = getPrice(product, photos.length) + getPrice("additionalPhrase", additionalPhrases.length);
      const delivery = useSelector(state => state.delivery);
      const appliedDiscount = useSelector(state => state.appliedDiscount);
      const [finalPrice, setFinalPrice] = useState(0);
      const [discountCode, setDiscountCode] = useState("");
      const [discountApplied, setDiscountApplied] = useState(null);
      const [discountCodeFailed, setDiscountCodeFailed] = useState(false);
      const step = useSelector(state => state.step);
      const paymentMethod = useSelector(state => state.paymentMethod);
      const [yapeIsOpen, setYapeIsOpen] = useState(false);
      const yapeState = useSelector(state => state.dialogs);
      const [plinIsOpen, setPlinIsOpen] = useState(false);

      const handleClick = (e) => {
            e.preventDefault();

            console.log("selected method:", paymentMethod);
            // step === 3 means final checkout, because of 1 step lag
            if (step.value === 3) {
                  console.log("paymentMethod from click", paymentMethod);
                  if(paymentMethod === "card") {
                        document.getElementsByClassName("mercadopago-button")[0].click();
                  } else if(paymentMethod === "yape") {
                        setYapeIsOpen(true);
                  } else if(paymentMethod === "plin") {
                        setPlinIsOpen(true);
                  }
            } else {
                  dispatch(incrementStep());
            }
      }

      // User deletes all items from Cart
      const restartProcessOrNot = () => {
            if(photos.length === 0 && additionalPhrases.length === 0) {
                  dispatch(setStep(0));
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
                  console.log("res.payload:", res.payload);
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
            })
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

      const getCartItemTitle = (product) => {
            switch(product) {
                  case "sameSize":
                        return "Mismo Tamaño";
                  case "letras":
                        return "Letras";
                  default:
                        return null;
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
            dispatch(setTotalPrice(price));
      }

      if(price >= 0) {
            dispatch(setTotalPrice(price));
      }

      restartProcessOrNot();

      // CHECKOUT
      // These next functions handle checkout btn

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
            orderData.append('productType', product);
            orderData.append('deliveryType', delivery);
            orderData.append('totalPrice', price);
            orderData.append('paymentType', paymentMethod);
            // if yape/plin: desconocido -> check your payment system
            // if card than should be TRUE as this function is always 
            // executed after the payment has been successful..
            let hasPaidValue = '';

            if(paymentMethod === "yape" || paymentMethod === "plin") {
                  hasPaidValue = 'unknown';
            } else {
                  hasPaidValue = 'si';
            }
            orderData.append('hasPaid', hasPaidValue);
            
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
            console.log("order created");
            console.log("orderId:", orderId);
            handlePhotoUpload(e, orderId);
            handleCreateUser(e);
            handleAdditionalPhrase(e, orderId);
            if(letters.letter1) {
                  handleCreateLetter(e, orderId);
            }
            //console.log("discountApplied from handleCheckout", discountApplied);
            /*if(discountApplied) {
                  // if there is an applied discount
                  // remove discount from db
                  dispatch(deleteDiscount(discountCode));
            } */
      }

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
                        height: "50vh",
                        maxHeight: "50vh",
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
                                                title={`Set ${getCartItemTitle(product)}`}
                                                image={null} 
                                                quantity={photos.length} 
                                                price={getPrice(product, photos.length)}
                                                subtitle="20x20cm"
                                          />
                                    }
                                    {additionalPhrases.map((phrase) => {
                                          return(
                                                <CartItem
                                                      key={phrase.id}
                                                      id={phrase.id}
                                                      title={`Letrero "${phrase.phraseText}"`}
                                                      image={null}
                                                      quantity={1}
                                                      price={getPrice("additionalPhrase", 1)}
                                                      subtitle="20x40cm"
                                                />
                                          );
                                    })}
                              </Grid>
                        </Grid>
                  </Grid>
                  <Box sx={{
                        height: "40vh",
                        minHeight: "40vh",
                        width: '100%'
                  }}>
                        <Divider variant="middle" sx={{mb: 2}}/>  
                        <FormGroup sx={{width: "100%", display: 'flex', justifyContent: 'center'}}>
                        <Grid container display="flex" justifyContent="center">

                        <Grid item xs={9} sx={{}}>
                              <FormControl sx={{position: 'relative', width: '100%'}}>
                                    <InputLabel htmlFor="outlined-adornment-discount"
                                    sx={{m: 0, p: 0, position: 'absolute', top: "-7px",
                                          "&.Mui-focused": {
                                                mt: "6px"
                                          },
                                    }}>Añadir descuento</InputLabel>
                                    <OutlinedInput
                                          label="Añadir descuento"
                                          id="outlined-adornment-discount"
                                          size="small"
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
                              </Grid>
                        </Grid>
                        </FormGroup>
                        <Grid container justifyContent="center" sx={{pt: 2}}>
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
                        <Divider variant="middle" sx={{pt: 2}}/>  
                        <Grid container justifyContent="center" sx={{pt: 2}}>
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
                              mt: 3
                        }} onClick={handleClick}>
                              {// step 2 because we're at a 1 step lag
                              // step 2 onclick gives step 2, meaning we'll be in step 3
                              (step.value === 3) ? "Realizar Pago" : "Siguiente"
                              }
                        </Button>
                        {
                              /*<Button onClick={handleCheckout}>Handle Checkout</Button>*/
                        }

                        <Box sx={{display: 'none'}}>
                              <MercadoPagoButton/>
                        </Box>
                        <YapePopUp handlePayment={handleCheckout} open={yapeIsOpen} handleOpen={setYapeIsOpen} price={"100"} />
                        {
                        // have to create a new component for plin. Saving for later.
                        }
                        <YapePopUp open={plinIsOpen} handleOpen={setPlinIsOpen} price={"100"} />
                  </Box>      
            </Box>
      );
}

export default Cart;