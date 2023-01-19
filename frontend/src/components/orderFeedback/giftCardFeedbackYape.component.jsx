import { Box, Grid, IconButton, Typography } from "@mui/material"
import React from "react";
import NavBar from "../navbar/navbar.component";
import { useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import ThankYouImage from '../../images/thankyou_order.jpg';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import theme from "../../utils/theme";
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';

const GiftCardFeedbackYape = () => {
    const currentOrder = useSelector(state => state.orders);
    const formButtons = useSelector(state => state.formButtons);
    const photos = useSelector(state => state.photos);
    const additionalPhrases = useSelector(state => state.additionalPhrases);
    const step = useSelector(state => state.step);
    const delivery = useSelector(state => state.delivery);
    const userInfo = useSelector(state => state.userInfo);
    const letters = useSelector(state => state.letters);
    const appliedDiscount = useSelector(state => state.appliedDiscount);
    const paymentMethod = useSelector(state => state.paymentMethod);
    const totalPrice = useSelector(state => state.totalPrice);
    const errorMessages = useSelector(state => state.errorMessages);
    const uploadedUser = useSelector(state => state.uploadedUser);
    const uploadedDiscounts = useSelector(state => state.uploadedDiscounts);
    const uploadedAdditionalPhrases = useSelector(state => state.uploadedAdditionalPhrases);
    console.log("START");
    console.log("order", currentOrder);
    console.log("formButtons", formButtons);
    console.log("photos", photos);
    console.log("additionalPhrases", additionalPhrases);
    console.log("step", step);
    console.log("delivery", delivery);
    console.log("userInfo", userInfo);
    console.log("letters", letters);
    console.log("paymentMethod", paymentMethod);
    console.log("appliedDiscount", appliedDiscount);
    console.log("userInfo", userInfo);
    console.log("totalPrice", totalPrice);
    console.log("errorMessages", errorMessages);
    console.log("uploadedUser", uploadedUser);
    console.log("uploadedDiscounts", uploadedDiscounts);
    console.log("uploadedAdditionalPhrases", uploadedAdditionalPhrases);
    console.log("END");

    return(
        <Box sx={{
        }}>
            <NavBar/>
            <Grid container sx={{
                display: 'flex',
                justifyContent: 'center',
            }}>
                
                <Grid item xs={6} sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    pt: 5,
                    
                }}>
                    <Box sx={{
                        height: '250px',
                        width: '50%',
                        borderRadius: '10px',
                        overflow: 'hidden',
                    }}>
                        <img src={ThankYouImage} alt="Thank you for your order" height={'100%'} width={'100%'}/>
                    </Box>
                </Grid>
                <Grid item xs={12} sx={{textAlign: 'center', pt: 3.5, pb: 3.5}}>
                    <Typography variant="h3" sx={{fontFamily: 'Questrial', fontSize: '3.5em', fontWeight: '', "span": {color: "#FF66C4"}}}>
                        Gracias por tu compra<span>.</span>
                    </Typography>
                </Grid>

                
                <Grid item xs={6} sx={{textAlign: 'center'}}>
                    <Typography variant="p" sx={{
                        fontSize: '1.1em',
                        fontFamily: 'Questrial'
                    }}>
                        Envíanos el comprobante de pago por WhatsApp y recibirás tu Gift Card en menos de 24 horas.<br />
                    </Typography>
                </Grid>
                <Grid item xs={7} sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    pt: 0,
                    pb: 0,
                    mt: -0.8
                }}>
                    <Box sx={{
                        height: '50px',
                        p: 2,
                        mt: 0
                    }}>
                        <a href="https://wa.me/51972043075">
                            <WhatsAppIcon sx={{fontSize: '1.3em', color: 'rgb(100,100,100)'}} />
                        </a>
                        <Typography variant="p" sx={{
                            fontSize: '1.1em',
                            fontFamily: 'Questrial',
                            position: 'relative',
                            top: '-4px',
                            pl: 0.5
                        }}>
                            972 043 075
                        </Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} sx={{textAlign: 'center', pb: 1, mt: 0}}>
                    <Typography variant="p" sx={{
                        fontSize: '1.2em',
                        fontFamily: 'Questrial',
                        fontWeight: 'bold'
                    }}>
                        Síguenos en nuestras redes sociales
                    </Typography>
                </Grid>
                <Grid item xs={12} sx={{display: 'flex', justifyContent: 'center'}}>
                    <Box sx={{pr: 1}}>
                        <a href="https://wa.me/51972043075">
                            <InstagramIcon sx={{fontSize: '2em', color: theme.palette.primary.main}} />
                        </a>
                    </Box>
                    <Box>
                        <a href="https://wa.me/51972043075">
                            <FacebookIcon sx={{fontSize: '2em', color: theme.palette.primary.main}} />
                        </a>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    )
}

export default GiftCardFeedbackYape;