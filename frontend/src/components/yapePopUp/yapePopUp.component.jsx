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
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
      padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
      padding: theme.spacing(1),
    },
    "& .MuiPaper-root": {
      width: '460px'
    }
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

    const dispatch = useDispatch();
    
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
            fontSize: '1.6em',
            p: 1,
            backgroundColor: '#FAF9F9'
        }}>
          Pagar con Yape
        </BootstrapDialogTitle>
        <DialogContent dividers sx={{
            paddingTop: "0px!important",
            backgroundColor: '#FAF9F9'
        }}>
            <Grid container sx={{
              display: 'flex',
              justifyContent: 'center'
            }}>
                <Grid item xs={12} sx={{
                    display: 'flex',
                    justifyContent: 'center',   
                    pt: 2           
                }}>
                  <Box sx={{
                    backgroundColor: 'white',
                    borderRadius: '15px',
                    border: '1px solid rgba(0, 0, 0, 0.12)'
                  }}>
                    <img src={QrCode} alt="qrcode" width="220px" height="220px"/>
                    <Box sx={{
                      mt: "-22px",
                      textAlign: 'center'
                    }}>
                      <Typography variant="p" sx={{
                            fontSize: '1em',
                            color: '#9B8E9A'
                        }}>
                            Katherine Pinche
                        </Typography>
                      </Box>
                      <Box sx={{
                        mt: '-2px',
                        pb: 1,
                        textAlign: 'center'
                      }}>
                        <Typography variant="p" sx={{
                            fontSize: '0.9em',
                            fontWeight: 'bold'
                        }}>
                            +51123456789
                        </Typography>
                        </Box>
                  </Box>
                </Grid>
                <Grid item xs={12} sx={{display: 'flex', justifyContent: 'center'}}>
                    <Box sx={{width: '200px'}}>    
                        
                    </Box>
                </Grid>
                <Grid item xs={8} sx={{textAlign: 'center', pt: 4, pb: 3}}>
                      <Typography variant="p" sx={{
                          fontSize: '1.5em'
                      }}>
                          Monto a pagar <b>S/ {price}</b>
                      </Typography>
                </Grid>
                <Grid>
                    <Grid container sx={{display: 'flex', justifyContent: 'center'}}>
                        <Grid item xs={10}>
                            <Typography variant="p" sx={{fontSize: '1em'}}>
                                <b>1.</b> Escanea el codigo QR desde la app Yape y realiza el pago.
                            </Typography>
                            <Typography variant="p" sx={{display: 'block', fontSize: '1em', pt: 1}}>
                                <b>2.</b> Luego envianos la captura de pantalla del Yapeo realizado al <b>+51123456789</b> (es el unico comprobante de pago) para completar la solicitud.
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </DialogContent>
        <DialogActions sx={{
            backgroundColor: '#FAF9F9'
          }}>
          <Link to="/yape">
            <Button variant="contained" sx={{
              backgroundColor: 'white', 
              color: "#FF66C4",
              "&:hover": {
                color: 'white'
              }
            }} autoFocus>
              Ya pagué
            </Button>
          </Link>
        </DialogActions>
      </BootstrapDialog>
    );
}

export default YapePopUp;