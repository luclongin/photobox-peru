import { Box, Grid, Container,Button,FormControl, InputAdornment, OutlinedInput, Typography, styled, getNativeSelectUtilityClasses } from "@mui/material";
import { OrderStepSubtitle, OrderStepTitle } from "../../OrderStepTitle/orderStepTitle.component";
import VoucherImage from '../../../images/voucher.png';
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from 'react-redux';
import { createDiscount } from "../../../features/discountUpload/discountUpload";
import { nanoid } from "@reduxjs/toolkit";
import { incrementStep } from "../../../features/step/stepSlice";
import { setGiftCard } from "../../../features/giftCard/giftCardSlice";
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import RedeemOutlinedIcon from '@mui/icons-material/RedeemOutlined';
import SendToMobileOutlinedIcon from '@mui/icons-material/SendToMobileOutlined';
import LetrasDialog from "../letras/letrasPayPopUp.component";

const GiftCard = () => {
    const dispatch = useDispatch();
    const [dialogOpen, setDialogOpen] = useState(false);

    const handleSubmitGiftCard = (e) => {
        setDialogOpen(true);

        /*e.preventDefault();
        let giftCardData = new FormData();
        const giftCardId = nanoid();
        giftCardData.append('discountId', giftCardId);
        giftCardData.append('discountType', 'giftCard');
        giftCardData.append('discountAmount', finalAmount);
        giftCardData.append('discountPercentage', "");
        const dateOfCreation = new Date().toISOString();
        giftCardData.append('discountStartDate', dateOfCreation);
        giftCardData.append('discountEndDate', "");
        giftCardData.append('discountUsedAddresses', "");
        if(giftCardId !== "" && finalAmount !== "" && dateOfCreation !== "") {
            dispatch(setGiftCard({
                giftCardId: giftCardId,
                giftCardAmount: finalAmount,
                giftCardDate: dateOfCreation
            }));
            dispatch(createDiscount(giftCardData));
            dispatch(incrementStep());
        }*/
    }


    const AddButton = styled(Button)({
        borderRadius: 5,
        color: '#ffffff',
        backgroundColor: 'rgb(255, 102, 196, 1)',
        width: 200,
        height: 50,
        fontSize: '1em',
        "&:disabled": {
              backgroundColor: 'rgb(255, 102, 196, 0.3)',
              color: '#ffffff'
        }
  })

    const initialClicked = [false, false, false, false];
    const [clicked, setClicked] = useState(initialClicked);
    const [customAmount, setCustomAmount] = useState("");
    const [finalAmount, setFinalAmount] = useState(0);

    const toggleClicked = (e) => {
        let clickedCopy = [false, false, false, false];
        // name here is the index
        clickedCopy[e.target.name] = true;
        setCustomAmount("");
        setFinalAmount(e.target.value)
        setClicked(clickedCopy);
    }

    useEffect(() => {
        console.log("amount: ", finalAmount);
    }, [finalAmount])

    const resetClicked = () => {
        const clickedReset = [false, false, false, false];
        setClicked(clickedReset);
    }

    const VoucherButton = ({amount, index, clickHandler, clicked}) => {
        return(
        <Button variant={clicked ? "contained" : "outlined"}
        onClick={clickHandler}
        name={index}
        value={amount}
        sx={{
            fontSize: '1em',
            padding: 1,
            pt: 1.5, 
            pb: 1.5,
            borderColor: 'rgba(0, 0, 0, 0.1)',
            width: '90px',
            color: clicked ? 'white' : "black"
        }}>
            {amount} S/
        </Button>
        );
    }
    return(
        <Container fluid>
            <Grid container sx={{pt: 5}}>
                <Grid item xs={6}>
                    <Box sx={{
                        mt: 10
                    }}>
                        <img src={VoucherImage} width="320px"/>
                    </Box>
                </Grid>
                <Grid item xs={6}>
                    <Typography variant="h3" sx={{
                        mt: 3,
                        mb: 1,
                        pl: 1,
                        fontWeight: 'bold',
                        textAlign: 'left'
                    }}>
                        Regala un Gift Card
                    </Typography>
                
                    <Grid container sx={{}} spacing={0}>
                        <Grid item xs={12} sx={{mt: 2, ml: 2, pb: 1, textAlign: 'left'}}>
                            <Typography variant="h6" sx={{fontWeight: 'bold'}}>
                                Usar montos definidos
                            </Typography>
                        </Grid>
                        <Grid item xs={8}>
                            <Grid container sx={{pl: 1}}>
                                <Grid item xs={3}>
                                    <VoucherButton amount="69" index={0} clickHandler={toggleClicked} clicked={clicked[0]}/>
                                </Grid>
                                <Grid item xs={3} sx={{}}>
                                    <VoucherButton amount="139" index={1} clickHandler={toggleClicked} clicked={clicked[1]}/>
                                </Grid>
                                <Grid item xs={3} sx={{}}>
                                    <VoucherButton amount="189" index={2} clickHandler={toggleClicked} clicked={clicked[2]}/>
                                </Grid>
                                <Grid item xs={3}>
                                    <VoucherButton amount="229" index={3} clickHandler={toggleClicked} clicked={clicked[3]}/>
                                </Grid>
                                <Grid container sx={{mt: 0.8}} spacing={0}>
                                    <Grid item xs={3}>
                                        <VoucherButton amount="299" index={4} clickHandler={toggleClicked} clicked={clicked[4]}/>
                                    </Grid>
                                    <Grid item xs={3}>
                                        <VoucherButton amount="359" index={5} clickHandler={toggleClicked} clicked={clicked[5]}/>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid container>
                        <Grid item xs={12} sx={{mt: 2, ml: 2, textAlign: 'left'}}>
                            <Typography variant="h6" sx={{fontWeight: 'bold'}}>
                                Personaliza el monto
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sx={{display: 'flex', pl: 1}}>
                            <FormControl sx={{ m: 1, width: '200px', height: '50px'}} variant="outlined">
                                <OutlinedInput
                                    id="outlined-adornment-weight"
                                    onChange={(e) => {
                                        resetClicked();
                                        setCustomAmount(e.target.value);
                                        setFinalAmount(e.target.value);
                                    }}
                                    endAdornment={<InputAdornment position="end">PEN</InputAdornment>}
                                    aria-describedby="outlined-weight-helper-text"
                                    placeholder="Monto"
                                    defaultValue={customAmount}
                                    value={customAmount}
                                    inputProps={{
                                    'aria-label': 'weight',
                                    }}
                                    sx={{
                                        backgroundColor: 'white',
                                        height: '100%',
                                        fontSize: '1.1em', 
                                        pl: 1
                                    }}

                                />
                            </FormControl>
                        </Grid>
                        <Grid xs={12} sx={{textAlign: 'left', pl: 2, pt: 2}}>
                            <AddButton
                                variant="contained"
                                disabled={false}
                                onClick={handleSubmitGiftCard}
                            >
                                Comprar
                            </AddButton>
                            <LetrasDialog open={dialogOpen} handleOpen={setDialogOpen} />
                        </Grid>
                    </Grid>
                    <Grid container>
                        <Grid item xs={12} sx={{textAlign: 'left', pl: 2, pt: 5}}>
                            <Typography variant="h5" sx={{fontWeight: 'bold'}}>
                                ¿Cómo funciona?
                            </Typography>
                        </Grid>
                        <Grid item xs={12} >
                            <Grid container sx={{p: 1}}>
                                <Grid item xs={1} sx={{p: 1}}>
                                    <ShoppingCartOutlinedIcon sx={{fontSize: '2.1em'}}/>
                                </Grid>
                                <Grid item xs={10} sx={{textAlign: 'left', pl: 1, display: 'flex', alignItems: 'center'}}>
                                    <Typography variant="giftCardHowItWorks">
                                    1. Compra un gift card digital 
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} >
                            <Grid container sx={{pl: 1}}>
                                <Grid item xs={1} sx={{p: 1}}>
                                    <SendToMobileOutlinedIcon sx={{fontSize: '2.1em'}}/>
                                </Grid>
                                <Grid item xs={10} sx={{textAlign: 'left', pl: 1, display: 'flex', alignItems: 'center'}}>
                                    <Typography variant="giftCardHowItWorks">
                                    2. Recibes un código y lo envías a tu amigo por el medio que prefieras
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} sx={{pb: 10}}>
                            <Grid container sx={{pl: 1, pt: 2}}>
                                <Grid item xs={1} sx={{p: 1}}>
                                    <RedeemOutlinedIcon sx={{fontSize: '2.1em'}}/>
                                </Grid>
                                <Grid item xs={10} sx={{textAlign: 'left', pl: 1, display: 'flex', alignItems: 'center'}}>
                                    <Typography variant="giftCardHowItWorks">
                                    3. Ellos realizan un pedido y aplican este código al momento de pagar
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    );
}

export default GiftCard;