import { Box, Button, Card, CardActionArea, Container, Divider, Grid, Paper, Typography } from "@mui/material";
import React from "react"
import theme from "../../utils/theme";
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import { Fragment } from "react";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import {styled} from "@mui/material";
import NoNail from '../../images/nonail.png';
import Easy from '../../images/easy.png';
import Sizes from '../../images/sizes.png';
import Shipping from '../../images/shipping.png';
import Girl from '../../images/girl.png';
import Baby from '../../images/baby.png';
import Carousel from "../carousel/carousel.component";
import { Link } from "react-router-dom";

const FirstPart = () => {
    return(
        <Fragment>
            <Box sx={{
                backgroundColor: theme.palette.background.main,
                minHeight: "86vh",
                margin: 0,
                padding: 0,
            }}>
                <Grid container sx={{}}>
                    {
                        // BACKRGOUND IMAGE
                    }
                    <Grid item xs={6.5} sx={{

                    }}>

                    </Grid>
                    <Grid item xs={5.5}>
                        <Grid container>
                            <Grid item xs={12} sx={{pt: "16%", textAlign: 'left'}}>
                                <Typography variant="homepageh1">
                                    Tus mejores recuerdos<br /> en una pared<span>.</span>
                                </Typography>
                            </Grid>
                            <Grid item xs={8} sx={{pt: 3.5, textAlign: 'left'}}>
                                <Typography variant="homepageh2">
                                    Diseña hermosas paredes usando tus fotos favoritas
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sx={{textAlign: 'left', pt: 4}}>
                                <Link to="/pedido">
                                    <Button variant="contained" sx={{
                                        color: 'white',
                                        p: 1, 
                                        pl: 6, 
                                        pr: 6,
                                        fontSize: '1.4em'
                                    }}>
                                        Comienza ahora
                                    </Button>
                                </Link>
                            </Grid>
                            <Grid item xs={12} sx={{textAlign: 'left', pt: 2}}>
                                    <LocalShippingIcon sx={{fontSize: '1.8em', position: 'relative', top: 7}}/> 
                                    <Typography variant="p" sx={{fontSize: '1.1em', pl: 0.5}}>
                                        Envios gratis a todo el Perú
                                    </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    
                </Grid>
                
            </Box>
        </Fragment>
    );
}

const SecondPart = () => {
    const DetailPaper = styled(Paper)({
        height: '260px',
        width: '260px',
        //boxShadow: "rgba(240, 46, 170, 0.4) 5px 5px, rgba(240, 46, 170, 0.3) 10px 10px, rgba(240, 46, 170, 0.2) 15px 15px, rgba(240, 46, 170, 0.1) 20px 20px, rgba(240, 46, 170, 0.05) 25px 25px"
        //boxShadow: "rgb(85, 91, 255) 0px 0px 0px 3px, rgb(31, 193, 27) 0px 0px 0px 6px, rgb(255, 217, 19) 0px 0px 0px 9px, rgb(255, 156, 85) 0px 0px 0px 12px, rgb(255, 85, 85) 0px 0px 0px 15px"
    });

    const detailPaperElevation = 10;

    return(
        <Grid container sx={{
            display: 'flex',
            justifyContent: 'center',
            backgroundColor: '#fdecef',
            pb: 6,
            pt: 7
        }}>
            <Grid item xs={6} sx={{
                textAlign: 'center',
                pb: 2
            }}>
                <Typography variant="secondparttitle">
                    Cuadros magicos para llenar<br />tus paredes<span>.</span>
                </Typography>
            </Grid>
            <Grid item xs={12} sx={{pt: 5, pb: 5}}>
                <Grid container sx={{display: 'flex', justifyContent: 'center'}} spacing={7}>
                    <Grid item xs={3} sx={{display: 'flex', justifyContent: 'end'}}>
                        <DetailPaper elevation={detailPaperElevation}>
                            <Box sx={{pt: 4}}>    
                                <img src={NoNail} width='80px' height='80px'/>
                            </Box>
                            <Box>
                                <Typography variant="secondpartsubtitle">
                                    Seguro para tus paredes
                                </Typography>
                            </Box>
                            <Box>
                                <Typography variant="p">
                                    Sin clavos
                                </Typography>
                            </Box>
                            <Box>
                                <Typography variant="p">
                                    Sin agujeros
                                </Typography>
                            </Box>
                            <Box>
                                <Typography variant="p">
                                    Sin dejar marcas
                                </Typography>
                            </Box>
                        </DetailPaper>
                    </Grid>
                    <Grid item xs={3} sx={{display: 'flex', justifyContent: 'start'}}>
                        <DetailPaper elevation={detailPaperElevation}>
                            <Box sx={{pt: 4}}>
                                <img src={Easy} width='32px' height='80px'/>
                            </Box>
                            <Typography variant="secondpartsubtitle">
                                Facil de instalar
                            </Typography>
                        </DetailPaper>
                    </Grid>
                </Grid>
                <Grid container sx={{display: 'flex', justifyContent: 'center', pt: 4}} spacing={7}>
                    <Grid item xs={3} sx={{display: 'flex', justifyContent: 'end'}}>
                        <DetailPaper elevation={detailPaperElevation}>
                            <Box sx={{pt: 4}}>
                                <img src={Shipping} width='100px' height='60px'/>
                            </Box>
                            <Typography variant="secondpartsubtitle">
                                Envios a todo el Peru
                            </Typography>
                        </DetailPaper>
                    </Grid>
                    <Grid item xs={3} sx={{display: 'flex', justifyContent: 'start'}}>
                        <DetailPaper elevation={detailPaperElevation} sx={{position: 'relative'}}>
                            <Grid container>
                                <Grid item xs={12} sx={{
                                    height: '130px',
                                    pt: 3,
                                    pb: 1,
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}>
                                    <img src={Girl} width='120px' height='80px'/>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant="secondpartsubtitle">
                                        Preparado con carino
                                    </Typography>
                                </Grid>
                            </Grid>
                        </DetailPaper>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}

const ThirdPart = () => {
    return(
        <Box sx={{
            pt: 16,
            pb: 11,
            backgroundColor: "#fdecef",
        }}>
            <Box>
                <Grid container sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    pb: 5,
                    height: '100%'
                }}>
                    <Grid item xs={8}>
                        <Card elevation={0} sx={{
                            width: '100%',
                            height: '360px',
                            textAlign: 'left',
                            display: 'flex',
                            alignItems: 'center',
                            backgroundColor: '#FAF9F9'
                        }}>
                            <CardActionArea sx={{width: '100%', height: '100%',
                            pl: 8,
                            fontFamily: 'Questrial'}}>
                                <Grid container sx={{display: 'flex', alignItems: 'center'}}>
                                    <Grid item xs={7}>
                                        <Grid container>
                                            <Grid item xs={12}>
                                                <Typography variant="thirdparth1">
                                                    Descrube nuestros productos<span>.</span>
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={12} sx={{pt: 2}}>
                                                <Typography variant="thridpartsubtitle">
                                                    Get your photos in stylish frames that stick directly to
                                                    your wall and leave no damage behind!
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={5} sx={{height: '100%', width: '100%', textAlign: 'right', pr: 5}}>
                                        <Box sx={{borderRadius: '10px', backgroundColor: 'gray', overflow: 'hidden', width:"280px"}}>
                                            <img src={Baby} alt="Baby Picture" width="100%" />
                                        </Box>
                                    </Grid>
                                </Grid>
                            </CardActionArea>
                        </Card>
                    </Grid>
                </Grid>
                
            </Box>
        </Box>
    );
}

const FourthPart = () => {
    return(
        <Box sx={{
            backgroundColor: "#fdecef"
        }}>
            <Grid container>
                <Grid item xs={12} sx={{pb: 5}}>
                    <Typography variant="secondparttitle">
                        Siguenos en Instagram<span>.</span>
                    </Typography>
                </Grid>
                <Grid item xs={12} sx={{
                    height: '80vh'
                }}>
                    <Carousel />
                </Grid>
            </Grid>
        </Box>
    );
}

const BottomToolbar = () => {
    return(
        <Box>
            <Grid container>
                <Grid item xs={4}>
                    <Grid container>
                        <Grid item xs={12}>
                            <Typography variant="p">
                                Sobre nosotros
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={4}>
                    
                </Grid>
                <Grid item xs={4}>
                    
                </Grid>
            </Grid>
        </Box>
    );
}


const HomePage = () => {
    return(
        <Box sx={{
            backgroundColor: theme.palette.background.main
        }}>
            <FirstPart />
            <SecondPart />
            <ThirdPart />
            <FourthPart />
        </Box>
    );
}

export default HomePage;