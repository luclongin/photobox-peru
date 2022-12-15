import { Box, Grid, Typography } from "@mui/material"
import React from "react";
import NavBar from "../navbar/navbar.component";
import { useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";

const OrderFeedbackYape = () => {
    const currentOrder = useSelector(state => state.orders);

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
    
                    </Typography>
                </Grid>
                <Grid item xs={9} sx={{textAlign: 'center'}}>
                    <Typography variant="p">
                        Contactanos por Whatsapp para seguir tu pedido
                    </Typography>
                </Grid>
            </Grid>
        </Box>
    )
}

export default OrderFeedbackYape;