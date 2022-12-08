import { Box } from "@mui/material";
import React, {useState} from "react";
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import QrCode from '../../images/qr_example.png';
import {Grid} from "@mui/material";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
      padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
      padding: theme.spacing(1),
    },
  }));

function BootstrapDialogTitle(props) {
    const { children, onClose, ...other } = props;
  
    return (
      <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
        {children}
        {onClose ? (
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        ) : null}
      </DialogTitle>
    );
  }
  
  BootstrapDialogTitle.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
  };
  


const YapePopUp = ({open, handleOpen, price}) => {

    const handleClose = () => {
        handleOpen(false);
    };

    return(
        <BootstrapDialog
            onClose={handleClose}
            aria-labelledby="customized-dialog-title"
            open={open}
        >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose} sx={{
            textAlign: 'center',
            fontSize: '1.8em'
        }}>
          Pagar con Yape
        </BootstrapDialogTitle>
        <DialogContent dividers sx={{paddingTop: "0px!important",}}>
            <Grid container>
                <Grid item xs={12} sx={{
                    display: 'flex',
                    justifyContent: 'center'
                }}>
                    <img src={QrCode} alt="qrcode" width="250px" height="250px"/>
                </Grid>
                <Grid item xs={12} sx={{display: 'flex', justifyContent: 'center', mt: "-20px"}}>
                    <Box sx={{width: '200px'}}>    
                        <Typography variant="p" sx={{
                            fontSize: '1em'
                        }}>
                            Katherine Pinche
                        </Typography>
                        <br />
                        <Typography variant="p" sx={{
                            fontSize: '1.2em'
                        }}>
                            +51 123 456 789
                        </Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} sx={{textAlign: 'center'}}>
                    <Typography variant="p" sx={{
                        fontSize: '1.5em'
                    }}>
                        Monto a pagar
                    </Typography>
                </Grid>
                <Grid item xs={12} sx={{textAlign: 'center'}}>
                    <Typography variant="p" sx={{
                        fontSize: '2em'
                    }}>
                        {price} S/
                    </Typography>
                </Grid>
                <Grid>
                    <Grid container>
                        <Grid item xs={12}>
                            <Typography variant="p">
                                Escanea el codigo QR desde la app Yape y realiza el pago.<br />
                                Luego envianos la captura de pantalla del Yapeo realizado al +51 123 456 789 (es el unico comprobante de pago) para completar la solicitud.
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" sx={{backgroundColor: 'white', color: "#FF66C4"}} autoFocus onClick={handleClose}>
            Ya pagué
          </Button>
        </DialogActions>
      </BootstrapDialog>
    );
}

export default YapePopUp;