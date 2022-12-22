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

const OrderFeedbackYape = () => {
    const currentOrder = useSelector(state => state.orders);

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
                    pt: 4,
                    
                }}>
                    <Box sx={{
                        height: '280px',
                        width: '53%',
                        borderRadius: '10px',
                        overflow: 'hidden',
                    }}>
                        <img src={ThankYouImage} alt="Thank you for your order" height={'100%'} width={'100%'}/>
                    </Box>
                </Grid>
                <Grid item xs={12} sx={{textAlign: 'center', pt: 3.5, pb: 3.5}}>
                    <Typography variant="h3" sx={{fontFamily: 'Questrial', fontSize: '3.2em', fontWeight: '', "span": {color: "#FF66C4"}}}>
                        Gracias por tu compra<span>.</span>
                    </Typography>
                </Grid>

                
                <Grid item xs={6} sx={{textAlign: 'center'}}>
                    <Typography variant="p" sx={{
                        fontSize: '1.1em',
                        fontFamily: 'Questrial'
                    }}>
                        Envíanos el comprobante de pago por WhatsApp y recibirás tu pedido en los próximos días o en 48 horas si escogiste la opción Express.<br />
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
                            top: '-5px',
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

export default OrderFeedbackYape;