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
      const addedUserInfo = useSelector(state => state.userInfo);
      let initialAddedAddress = false;
      // adding this bit to true when the user has already filled in the userInfo
      // and has gone back and forth through the process
      // in order for him not to have to re-fill in the form every time
      if(addedUserInfo.userFullName !== "" && addedUserInfo.userFullName !== null) {
            initialAddedAddress = true;
      }
      const [addressAdded, setAddressAdded] = useState(initialAddedAddress);
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
                              <Grid item xs={1} sx={{
                                    display: 'flex', 
                                    justifyContent: 'center', 
                                    alignItems: 'center'
                              }}>
                                    <HomeIcon sx={{fontSize: '1.6em'}}/>
                              </Grid>
                              <Grid item xs={"auto"} sx={{pl: 1, textAlign: 'left'}}>
                                    <Grid container>
                                          <Grid item xs={12}>
                                                <Typography variant="p" sx={{
                                                      fontSize: '1em',
                                                      fontWeight: 'bold'
                                                }}>
                                                      {addedUserInfo.userFullName}
                                                </Typography>
                                          </Grid>
                                          <Grid item xs={12} sx={{
                                                mt: 0
                                          }}>
                                                <Typography variant="p" sx={{
                                                      fontSize: '0.9em',
                                                }}>
                                                      {addedUserInfo.userDistrict}, {addedUserInfo.userCity}
                                                </Typography>
                                          </Grid>
                                    </Grid>
                              </Grid>
                              <Grid item xs={"auto"} sx={{
                                    display: 'flex', 
                                    justifyContent: 'start', 
                                    alignItems: 'center',
                                    pl: 0
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