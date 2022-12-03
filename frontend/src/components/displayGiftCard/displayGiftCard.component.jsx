import { Box, Container, IconButton, Grid, Typography, Divider, Tooltip, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { OrderStepTitle } from "../OrderStepTitle/orderStepTitle.component";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { createPreference } from "../../features/checkoutSlice/checkoutSlice";
import loadMercadoPagoScript from "../../utils/loadMercadoPagoScript";
import { useEffect, useState } from "react";
import { useMercadopago } from 'react-sdk-mercadopago';

const DisplayGiftCard = () => {   
    //const mercadopago = require("mercadopago");

    const giftcard = useSelector(state => state.giftcard);
    console.log("giftcard:", giftcard);
    const day = giftcard.giftCardDate;
    
    const date = day.split("T")[0].split('-').reverse().join('/');
    const hour = day.split("T")[1].split(":")[0];
    const minutes = day.split("T")[1].split(":")[1];

    // PUBLIC KEY
    const mercadopago = useMercadopago.v2('APP_USR-6d805d48-0abb-4277-8f9f-a4a01fdc0a34', {
        locale: 'es-PE'
    });

    const dispatch = useDispatch();
    const id = "123viva";
    const [preferenceId, setPreferenceId] = useState(null);

    useEffect(() => {
        const orderData = new FormData();
        orderData.append('quantity', 1);
        orderData.append('description', 'PhotoBox Peru Gift Card');
        orderData.append('price', giftcard.giftCardAmount);
        
        console.log("let's go");
        dispatch(createPreference(orderData))
        .then(res => {
            //console.log("this is res", res);
            setPreferenceId(res.payload.id);
            //return res.json();
        }).catch(err => {
            console.log("shit", err);
        })
    }, [id]);

    useEffect(() => {
        if(preferenceId) {
            console.log("my preference:", preferenceId);
            const script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = 'https://sdk.mercadopago.com/js/v2';
            const container = document.getElementById("displayGiftCard_container");
            container.appendChild(script);
        }
    }, [preferenceId]);

    useEffect(() => {
        if(mercadopago && preferenceId) {
            mercadopago.checkout({
                preference: {
                    id: preferenceId
                },
                render: {
                    container: '#cho-container',
                    label: 'Pay',
                }
            })
        }
    }, [preferenceId]);

    /*.then(resPreference => {
            // Initialize the checkout
            /*mercadopago.checkout({
                preference: {
                id: resPreference.id
                },
                render: {
                container: '#button-checkout', // Class name where the payment button will be displayed
                label: 'Pay', // Change the payment button text (optional)
                }
            });
        }).catch(err => {
            alert("BOOH");
            console.log("ERROR");
        })
    }*/


    return(
        <Container id="displayGiftCard_container" fluid sx={{
            display: "flex",
            justifyContent: "center",
        }}>
            <Grid container>
                <Grid item xs={12}>
                    <OrderStepTitle title="Recibe tu Gift Card" marginTop={5}/>
                </Grid>
                <Grid item xs={12} display="flex" justifyContent="center">
                    <Typography variant="h5">
                        
                    </Typography>
                </Grid>
                <Grid item xs={12} display="flex" justifyContent="center">
                    <Box sx={{
                        width: "50%",
                        height: "100px",
                        backgroundColor: "#FFFFFF",//"#FF66C4",
                        color: "#FF66C4",
                        padding: 2,
                        borderRadius: 3,
                        border: "1px solid #FF66C4",
                        position:"relative",
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '1.1em'
                    }}>
                        <Tooltip title="Copiar">
                        <IconButton
                            color="primary"
                            aria-label="upload picture"
                            component="label"
                            sx={{
                                border: "1px solid #FF66C4",
                                borderRadius: "10px",
                                position: 'absolute',
                                right: 10,
                                top: 10
                            }}
                            onClick={() => {
                                navigator.clipboard.writeText(giftcard.giftCardId);
                            }}
                        >
                            <ContentCopyIcon />
                        </IconButton>
                        </Tooltip>
                        <Typography variant="h1" sx={{
                            
                        }}>
                            {giftcard.giftCardId}
                        </Typography>
                    </Box>
                </Grid>
                <Grid item xs={12}>
                    <Divider sx={{mt: 5, mb: 2}}></Divider>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="h5">
                        <b>Valor:</b> {giftcard.giftCardAmount} S/
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="h5">
                        <b>Fecha de creacion:</b> {date} {hour}:{minutes}
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                        <Button variant="contained" id="checkout-btn" sx={{color: 'white'}}>Buy Now</Button>
                </Grid>
                <Box id="cho-container"></Box>
            </Grid>
        </Container>
        
    );
}

export default DisplayGiftCard;