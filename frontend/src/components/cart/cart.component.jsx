import React, {useState} from "react";
import { Fragment } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import CartItem from "./cartItem/cartItem.component";
import { getPrice } from "../../utils/pricing";
import Divider from '@mui/material/Divider';
import { incrementStep, setStep } from "../../features/step/stepSlice";
import { OrderStepTitle } from "../OrderStepTitle/orderStepTitle.component";
import { setTotalPrice } from "../../features/totalPrice/totalPrice";
import { Box, FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton, Button, FormControlLabel, FormGroup, Grid, Radio, RadioGroup, Typography, TextField, FormHelperText, Tooltip } from "@mui/material";
import { checkDiscount } from "../../features/discountUpload/discountUpload";
import { setAppliedDiscount } from "../../features/appliedDiscount/appliedDiscountSlice";
import SearchIcon from '@mui/icons-material/Search';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

const Cart = () => {
      const dispatch = useDispatch();
      const photos = useSelector(state => state.photos);
      const addedPhrases = useSelector(state => state.additionalPhrases);
      const product = useSelector(state => state.product);
      const totalPrice = getPrice(product, photos.length) + getPrice("additionalPhrase", addedPhrases.length);
      const delivery = useSelector(state => state.delivery);
      const appliedDiscount = useSelector(state => state.appliedDiscount);
      const [finalPrice, setFinalPrice] = useState(0);
      const [discountCode, setDiscountCode] = useState("");
      const [discountApplied, setDiscountApplied] = useState(null);
      const [discountCodeFailed, setDiscountCodeFailed] = useState(false);

      const handleClick = () => {
            dispatch(incrementStep());
      }

      // User deletes all items from Cart
      const restartProcessOrNot = () => {
            if(photos.length === 0 && addedPhrases.length === 0) {
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
                        height: "40vh",
                        minHeight: "40vh",
                        width: '100%'
                  }}>
                        <Divider variant="middle" sx={{mb: 2}}/>  
                        <FormGroup sx={{width: "100%", display: 'flex', justifyContent: 'center'}}>
                        <Grid container xs={12} display="flex" justifyContent="center">

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
                              Realizar Pago
                        </Button>
                  </Box>      
            </Box>
      );
}

export default Cart;