import { Box, Grid, Typography } from "@mui/material"
import React from "react";
import NavBar from "../navbar/navbar.component";
import { useSearchParams } from "react-router-dom";
import { useMercadopago } from 'react-sdk-mercadopago';


const OrderFeedbackCard = () => {
    const [urlParams] = useSearchParams();
    console.log("urlParams:", urlParams);
  
    console.log("merchant order id:", urlParams.get('merchant_order_id'));
    const doodoo = urlParams.get('merchant_order_id');

    // PUBLIC KEY
    const mercadopago = useMercadopago.v2('APP_USR-56a889a9-b928-4f89-8f60-fe89f3b1ad78', {
        locale: 'es-PE'
    });

    console.log("merci", mercadopago);


    return(
        <Box>
            <NavBar/>
            <Grid container sx={{
                display: 'flex',
                justifyContent: 'center'
            }}>
                <Grid item xs={12} sx={{textAlign: 'center'}}>
                    <Typography variant="h3" sx={{fontFamily: 'Questrial', fontSize: '3em', fontWeight: 'bold'}}>
                        Gracias por tu compra
                    </Typography>
                </Grid>

                <Grid item xs={12} sx={{textAlign: 'center'}}>
                    <Typography variant="h5">
                    Pedido #{urlParams.get('payment_id')}
                    </Typography>
                </Grid>
                <Grid item xs={9} sx={{textAlign: 'center'}}>
                    <Typography variant="p">
                        Recibirás tu pedido en los próximos días o 48 horas si es Express.
                        Mientras esperas tu pedido puedes visitar nuestra cuenta de Instagram donde subimos muros muy chulos de nuestros clientes que quizá sirvan de inspiración.
                    </Typography>
                </Grid>
            </Grid>
        </Box>
    )
}

export default OrderFeedbackCard;