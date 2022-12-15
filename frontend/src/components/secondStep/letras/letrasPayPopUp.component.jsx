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
import { deleteAddress
 } from '../../../features/userInfo/userInfoSlice';
const StyleDialog = styled(Dialog)(({ theme }) => ({
    "& .MuiPaper-root": {
      overflowY: "visible",
      width: '460px'
    }
  }));

const LetrasDialog = ({open, handleOpen}) => {
    const dispatch = useDispatch();
    const paymentMethod = useSelector(state => state.paymentMethod);
    const [yapeIsOpen, setYapeIsOpen] = useState(false);
    const [plinIsOpen, setPlinIsOpen] = useState(false);

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
            } else if(paymentMethod === "plin") {
                setPlinIsOpen(true);
            }
        } else {
            setInfoAdded(false);
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
                            color: 'red',
                            position: 'relative',
                            top: 4
                        }}>
                            Llena tus datos y escoje un metodo de pago
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
            <YapePopUp open={yapeIsOpen} handleOpen={setYapeIsOpen} price={"100"} />
            {
            // have to create a new component for plin. Saving for later.
            }
            <YapePopUp open={plinIsOpen} handleOpen={setPlinIsOpen} price={"100"} />
        </Box> 
      </StyleDialog>
    </Box>
  );
}

export default LetrasDialog;