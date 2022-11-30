import { Box, Container, IconButton, Grid, Typography, Divider, Tooltip } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { OrderStepTitle } from "../OrderStepTitle/orderStepTitle.component";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { createPreference } from "../../features/checkoutSlice/checkoutSlice";
import loadMercadoPagoScript from "../../utils/loadMercadoPagoScript";
import { useEffect, useState } from "react";

const DisplayGiftCard = () => {   
    const dispatch = useDispatch();
    const id = "123viva";
    const [preferenceId, setPreferenceId] = useState(null);

    useEffect(() => {
        const orderData = new FormData();
        orderData.append('quantity', 1);
        orderData.append('description', 'my photo box');
        orderData.append('price', 100);
        
        console.log("let's go");
        dispatch(createPreference(orderData))
        .then(res => {
            console.log("this is res", res);
            return res.json();
        }).catch(err => {
            console.log("shit", err);
        })
    }, [id]);
    /*
    loadMercadoPagoScript(() => {
        console.log("loaded");
    });
    */



    //const mercadopago = new MercadoPago('TEST-72018f64-6873-4a3d-aabe-ae14d73a2b65', {
    //    locale: 'es-PE' // The most common are: 'pt-BR', 'es-AR' and 'en-US'
    //});

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




    const giftcard = useSelector(state => state.giftcard);
    console.log("giftcard:", giftcard);
    const day = giftcard.giftCardDate;
    
    const date = day.split("T")[0].split('-').reverse().join('/');
    const hour = day.split("T")[1].split(":")[0];
    const minutes = day.split("T")[1].split(":")[1];

    
    return(
        
        <Container fluid sx={{
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

                </Grid>
            </Grid>
        </Container>
        
    );
}

export default DisplayGiftCard;