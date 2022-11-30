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

const GiftCard = () => {
    const dispatch = useDispatch();

    const handleSubmitGiftCard = (e) => {
        e.preventDefault();
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
        }
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
            borderColor: 'rgba(0, 0, 0, 0.1)',
            width: '100px',
            color: clicked ? 'white' : "black"
        }}>
            {amount} S/
        </Button>
        );
    }
    return(
        <Container fluid>
            <OrderStepTitle title="Regala un Gift Card" marginBottom={3} marginTop={4} />
            <Grid container>
                <Grid item xs={7}>
                    <Box sx={{
                        mt: 10
                    }}>
                        <img src={VoucherImage} width="320px"/>
                    </Box>
                </Grid>
                <Grid item xs={5}>
                    <Typography variant="h5" sx={{
                        mt: 5,
                        mb: 2 
                    }}>
                        Escoje el monto
                    </Typography>
                
                    <Grid container sx={{}}>
                        <Grid item xs={3}>
                            <VoucherButton amount="50" index={0} clickHandler={toggleClicked} clicked={clicked[0]}/>
                        </Grid>
                        <Grid item xs={3} sx={{}}>
                            <VoucherButton amount="100" index={1} clickHandler={toggleClicked} clicked={clicked[1]}/>
                        </Grid>
                        <Grid item xs={3} sx={{}}>
                            <VoucherButton amount="150" index={2} clickHandler={toggleClicked} clicked={clicked[2]}/>
                        </Grid>
                        <Grid item xs={3}>
                            <VoucherButton amount="200" index={3} clickHandler={toggleClicked} clicked={clicked[3]}/>
                        </Grid>
                        <Grid item xs={12} sx={{mt: 2}}>
                            <Typography variant="h5">
                                o escribelo...
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl sx={{ m: 1, width: '150px', height: '60px'}} variant="outlined">
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
                        <Grid xs={12}>
                            <AddButton
                                variant="contained"
                                disabled={false}
                                onClick={handleSubmitGiftCard}
                            >
                                Comprar
                            </AddButton>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    );
}

export default GiftCard;