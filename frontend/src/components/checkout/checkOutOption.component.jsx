import { Box, Typography, Grid, Card, CardActionArea, CardContent, RadioGroup, FormControlLabel } from "@mui/material";
import React, {useState} from "react";
import CustomRadioButton from "../customRadioButton/customRadioButton.component";
import {FormGroup} from "@mui/material";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { setDelivery } from "../../features/delivery/deliverySlice";
import { useEffect } from "react";
import CreditCardIcon from '@mui/icons-material/CreditCard';
import YapeIcon from '../../images/yape.png';
import PlinIcon from '../../images/plin.png';

const CheckOutOption = ({size="250px", selectedState, setStateFn, title, subtitle, option}) => {
    const dispatch = useDispatch();
    

    const getPaymentIcon = (paymentType) => {
        switch(paymentType) {
            case "card":
                return <CreditCardIcon sx={{
                    fontSize: "2.2em",
                    color: '#9B8E9A',
                }}/>
            case "yape":
                return <img src={YapeIcon} width={"35px"}/>
            case "plin":
                return <img src={PlinIcon} width={"35px"}/>
            default:
                return <img src="" />
        }
    }
    //const selectedDelivery = useSelector(state => state.delivery);

    // Returns checked for radio
    const getChecked = () => {
        if(selectedState === option && selectedState !== "") {
            return(true);
        } else {
            return false;
        }/*
        if (selectedDelivery === deliveryOption && selectedDelivery !== "") {
              return(true)
        }
        return(false);*/
    }

    const handleClick = (e) => {
        dispatch(setStateFn(option));
        //dispatch(setDelivery(deliveryOption));
    }

    return(
        <Card sx={{width: size, height: 60, mt: 2, backgroundColor: '#fff'}}>
                  <CardActionArea sx={{
                              width: '100%',
                              height: '100%'
                        }} onClick={handleClick}>
                        <CardContent sx={{position: 'relative', height: "100%", padding: 0}}>
                              <Box sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    height: "100%"
                              }}>
                                <Grid container>
                                    <Grid item xs={2} sx={{
                                        display: 'flex', 
                                        justifyContent: 'center',
                                        alignItems: 'center'
                                    }}>
                                        <RadioGroup
                                        row
                                        aria-labelledby="chooseProduct-sameSize"
                                        name="chooseProduct"
                                        sx={{
                                        }}
                                        >
                                            <FormControlLabel checked={getChecked()} value={option} control={<CustomRadioButton size="18px" checked={getChecked()} />} sx={{
                                                margin: '0',
                                            }}/>
                                        </RadioGroup>
                                    </Grid>  
                                    <Grid item xs={8}>
                                        <Grid container sx={{display: 'flex', alignItems: 'center', textAlign: 'left'}}>
                                            <Grid item xs={12}>
                                                <Typography variant="deliveryTitle" sx={{
                                                    height: "50%",
                                                }}>
                                                    {title}
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <Typography variant="deliverySubtitle" sx={{
                                                    height: "50%"
                                                }}>
                                                    {subtitle}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={2} sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        pr: 2
                                    }}>
                                        {getPaymentIcon(option)}
                                    </Grid>
                                </Grid>
                              </Box>
                              
                    </CardContent>
                </CardActionArea>
        </Card>
    );
}

export default CheckOutOption;