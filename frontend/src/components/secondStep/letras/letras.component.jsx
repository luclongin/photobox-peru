import { Box, Container, TextField, Grid, Typography } from "@mui/material";
import React from "react";
import {styled} from "@mui/material";
import UploadPhotoCardEmpty from "../../uploadPhotoCardEmpty/uploadPhotoCardEmpty.component";
import { OrderStepTitle } from "../../OrderStepTitle/orderStepTitle.component";
import { OrderStepSubtitle } from "../../OrderStepTitle/orderStepTitle.component";

const Letras = () => {


    const textOnChangeHandlerFirst = (e) => {
        const letter = e.target.value;
        if(letter === "Q") {
            console.log(e.target.style);
            e.target.style.margin = '-20px 0 0 0'
        } else {
            e.target.style.margin = "0"
        }
    }

    const textOnChangeHandlerSecond = (e) => {
        const letter = e.target.value;
        if(letter === "Q") {
            console.log(e.target.style);
            e.target.style.margin = '-16px 0 0 0'
        } else {
            e.target.style.margin = "0"
        }
    }



    const StyledTextField = styled(TextField)({
        
    })

    return(
        <Container>
            <OrderStepTitle title="Escoje tus fotos y letras" />
            <Box display="flex" justifyContent="center" sx={{}}>
                <Grid container sx={{
                    width:'400px',
                //backgroundColor: 'red'
            }}>
                    <Grid item xs={6} sx={{
                        position: 'relative',
                        //backgroundColor: 'yellow',
                        overflow: 'hidden'
                    }}>
                        <StyledTextField onChange={textOnChangeHandlerFirst} variant="standard" placeholder="P" 
                        InputProps={{
                            inputProps: {
                                style: {
                                    textAlign: 'center'
                                }
                            },
                            maxLength: 1,
                            disableUnderline: true,
                            style: {
                                fontSize: "10.9em",
                                fontWeight: 'bold',
                                fontFamily: 'Arial',
                            },
                        }} sx={{
                            margin: "0",
                            padding: "0",
                            position: 'absolute',
                            top: "-45px",
                            left: "40px",
                            textAlign: "center",
                        }}/>
                    </Grid>
                    <Grid item xs={6}>
                        <UploadPhotoCardEmpty width={160}/>
                    </Grid>
                    <Grid item xs={6} sx={{display: 'flex', justifyContent: 'flex-end'}}>
                        <UploadPhotoCardEmpty width={160} />
                    </Grid>
                    <Grid item xs={6} sx={{
                        position: 'relative',
                        display: 'flex',
                        justifyContent: 'flex-start',
                        overflow: 'hidden'
                    }}>
                        <StyledTextField onChange={textOnChangeHandlerSecond} variant="standard" placeholder="&" 
                        InputProps={{
                            inputProps: {
                                style: {
                                    textAlign: 'center'
                                }
                            },
                            disableUnderline: true,
                            maxLength: 1,
                            style: {
                                fontSize: "10.9em",
                                fontWeight: 'bold',
                                fontFamily: 'Arial',
                            },
                        }} sx={{
                            margin: "0",
                            padding: "0",
                            position: 'absolute',
                            top: "-50px",
                            right: "45px",
                            textAlign: "center",
                        }}/>
                    </Grid>
                    <Grid item xs={6} sx={{
                        position: 'relative',
                        display: 'flex',
                        justifyContent: 'flex-end',
                        overflow: 'hidden'
                    }}>
                        <StyledTextField onChange={textOnChangeHandlerFirst} variant="standard" placeholder="B" 
                        InputProps={{
                            inputProps: {
                                style: {
                                    textAlign: 'center'
                                }
                            },
                            disableUnderline: true,
                            maxLength: 1,
                            style: {
                                fontSize: "10.9em",
                                fontWeight: 'bold',
                                fontFamily: 'Arial',
                            },
                        }} sx={{
                            margin: "0",
                            padding: "0",
                            position: 'absolute',
                            top: "-45px",
                            left: "40px",
                            textAlign: "center",
                        }}/>
                    </Grid>
                    <Grid item xs={6}>
                        <UploadPhotoCardEmpty width={160} />
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
}

export default Letras;