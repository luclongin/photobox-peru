import { Box, Button, Typography, Grid } from "@mui/material";
import React, { useState, Fragment } from "react";
import AddressDialog from "../addressDialog/addressDialog.component";
import { useSelector } from "react-redux";
import HomeIcon from '@mui/icons-material/Home';
import AddHomeIcon from '@mui/icons-material/AddHome';
import { useEffect } from "react";
import theme from "../../utils/theme";

const AddressAddition = () => {
      const [open, setOpen] = useState(false);
      const [addressAdded, setAddressAdded] = useState(false);
      const [userInfo, setUserInfo] = useState({});

      const handleOpen = () => {
            setOpen(true);
      };

      const handleClose = () => {
            setOpen(false);
      };

      const handleChangeAddress = () => {
            setOpen(true);    
      }
      
      return(
            <Fragment> 
                  {
                  !addressAdded ? 
                        <Box sx={{m: 0, p: 0}}>
                              <Button variant="contained" startIcon={<AddHomeIcon sx={{color: '#FF66C4'}} />} sx={{
                                    color: "black",
                                    backgroundColor: 'white!important',
                                    width: 200,
                                    padding: 1.5,
                                    pr: 2,
                                    fontSize: '1em',
                                    m: 0
                              }} onClick={handleOpen}>
                                    Añadir dirección
                              </Button>
                        </Box>
                  :
                  <Box sx={{display: 'flex', alignItems: 'center', width: '380px'}}>
                        <Grid container sx={{pl: 1}}>
                              <Grid item xs={1} sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                                    <HomeIcon sx={{fontSize: '1.6em'}}/>
                              </Grid>
                              <Grid item xs={8} sx={{pl: 1}}>
                                    <Grid container>
                                          <Grid item xs={12}>
                                                <Typography variant="p" sx={{
                                                      fontSize: '1em',
                                                      fontWeight: 'bold'
                                                }}>
                                                      {userInfo.userFullName}
                                                </Typography>
                                          </Grid>
                                          <Grid item xs={12} sx={{
                                                mt: -0.5
                                          }}>
                                                <Typography variant="p" sx={{
                                                      fontSize: '0.9em',
                                                }}>
                                                      {userInfo.userDistrict}, {userInfo.userCity}
                                                </Typography>
                                          </Grid>
                                    </Grid>
                              </Grid>
                              <Grid item xs={3} sx={{
                                    display: 'flex', 
                                    justifyContent: 'start', 
                                    alignItems: 'center',
                                    pl: 2
                              }}>
                                    <Button onClick={handleChangeAddress} variant="outlined" sx={{
                                          borderColor: "rgb(0,0,0,0.3)", 
                                          color: "rgb(0,0,0,0.5)", 
                                          pl: 1, 
                                          pr: 1, 
                                          pt: 0, 
                                          pb: 0, 
                                          "&:hover": {
                                                color: theme.palette.primary.main
                                          }
                                    }}>
                                          Cambiar
                                    </Button>
                              </Grid>
                        </Grid>                              
                  </Box>
                  }
                  <AddressDialog open={open} handleClose={handleClose} setUserInfo={setUserInfo} setAddressAdded={setAddressAdded} defaultValues={userInfo} />
            </Fragment>
      );
}

export default AddressAddition;