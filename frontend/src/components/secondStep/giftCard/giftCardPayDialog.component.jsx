import React, {useState} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import SelectPaymentComponent from '../../checkout/selectPayment.component';
import { Box, Grid, IconButton, FormGroup, Typography, styled, Divider } from '@mui/material';
import MercadoPagoButton from '../../mercadoPagoButton/mercadoPagoButton.component';
import theme from '../../../utils/theme';
import AddressAddition from '../../addressAddition/addressAddition.component';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import YapePopUp from '../../yapePopUp/yapePopUp.component';
import { useDispatch, useSelector } from 'react-redux';
import { deleteAddress} from '../../../features/userInfo/userInfoSlice';
import { nanoid } from '@reduxjs/toolkit';
import { setGiftCard } from '../../../features/giftCard/giftCardSlice';
import { createDiscount } from '../../../features/discountUpload/discountUpload';

const StyleDialog = styled(Dialog)(({ theme }) => ({
    "& .MuiPaper-root": {
      overflowY: "visible",
      width: '460px'
    }
  }));

const GiftCardPayDialog = ({open, handleOpen}) => {
    const dispatch = useDispatch();
    const paymentMethod = useSelector(state => state.paymentMethod);
    const [yapeIsOpen, setYapeIsOpen] = useState(false);
    const [plinIsOpen, setPlinIsOpen] = useState(false);
    const totalPrice = useSelector(state => state.totalPrice);

    const handleClose = () => {
        handleOpen(false);
        dispatch(deleteAddress());
    };

    const userInfo = useSelector(state => state.userInfo);
    const [infoAdded, setInfoAdded] = useState(true);

    const handleClick = () => {
        console.log("userInfo:", userInfo);
        if(userInfo.userId !== "" && paymentMethod !== "") {
            setInfoAdded(true);
            if(paymentMethod === "card") {
                document.getElementsByClassName("mercadopago-button")[0].click();
            } else if(paymentMethod === "yape") {
                setYapeIsOpen(true);
                handleUploadToDb();
            } else if(paymentMethod === "plin") {
                setPlinIsOpen(true);
            }
        } else {
            setInfoAdded(false);
        }
    }

    const handleUploadToDb = () => {
        let giftCardData = new FormData();
        const giftCardId = nanoid();
        giftCardData.append('discountId', giftCardId);
        giftCardData.append('discountType', 'giftCard');
        giftCardData.append('discountAmount', totalPrice);
        giftCardData.append('discountPercentage', "");
        const dateOfCreation = new Date().toISOString();
        giftCardData.append('discountStartDate', dateOfCreation);
        giftCardData.append('discountEndDate', "");
        giftCardData.append('discountUsedAddresses', "");
        if(giftCardId !== "" && totalPrice !== "" && dateOfCreation !== "") {
            dispatch(setGiftCard({
                giftCardId: giftCardId,
                giftCardAmount: totalPrice,
                giftCardDate: dateOfCreation
            }));
            dispatch(createDiscount(giftCardData));
        }
    }

  return (
    <Box>
      <StyleDialog open={open} onClose={handleClose}>
        <DialogTitle sx={{
            fontSize: '1.8em',
            fontWeight: 'bold',
            textAlign: 'center',
            backgroundColor: '#FAF9F9',
            pl: 4
        }}>Pagar Gift Card</DialogTitle>
        <IconButton sx={{  
            position: 'absolute',
            right: 10,
            top: 12,
            color: "rgb(0,0,0,0.3)"        
        }} onClick={handleClose}>
            <HighlightOffIcon fontSize="large" />
        </IconButton>
        <DialogContent sx={{
            backgroundColor: '#FAF9F9',
            pb: 0.5,
            pl: 4,
            pr: 4,
            m: 0,
            mt: -2
        }}>
            <Grid container>
                <Grid item xs={9} display="flex"> 
                    <FormGroup>
                        <Typography variant="h6" sx={{textAlign: 'left', pb: 0.5}}>
                                Dirección
                        </Typography>
                        <AddressAddition />
                    </FormGroup>
                </Grid>
            </Grid>
            <Divider sx={{mt: 3}}/>
            <Grid container sx={{pt: 1}}>
                <Grid item xs={9}>
                    <Typography variant="h6" sx={{textAlign: 'left', pb: 0.5}}>
                        Pagar
                     </Typography>
                    <SelectPaymentComponent />
                    {
                        !infoAdded && (<Typography variant="p" sx={{
                            fontSize: '0.9em',
                            color: '#FF66C4',
                            position: 'relative',
                            top: 4
                        }}>
                            Asegúrate de que hayas completado todo lo necesario
                        </Typography>
                        )
                    }
                </Grid>
            </Grid>
        </DialogContent>
        <Box sx={{textAlign: 'center', p: 3,
            backgroundColor: '#FAF9F9',}}>
            <Button variant="contained" sx={{
                    color: '#FFFFFF',
                    width: 180,
                    padding: 1,
                    fontSize: '1.1em'
            }} onClick={handleClick}>
                Realizar Pago        
            </Button>
            <Box sx={{display: 'none'}}>
                <MercadoPagoButton/>
            </Box>
            <YapePopUp product={"giftCard"} open={yapeIsOpen} handleOpen={setYapeIsOpen} price={totalPrice} handlePayment={() => {}}/>
            {
            // have to create a new component for plin. Saving for later.
            }
            <YapePopUp product={"giftCard"} open={plinIsOpen} handleOpen={setPlinIsOpen} price={totalPrice} handlePayment={() => {}}/>
        </Box> 
      </StyleDialog>
    </Box>
  );
}

export default GiftCardPayDialog;