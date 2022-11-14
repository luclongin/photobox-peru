import { Box, Button } from "@mui/material";
import React, { useState, Fragment } from "react";
import AddressDialog from "../addressDialog/addressDialog.component";
import { useSelector } from "react-redux";
import HomeIcon from '@mui/icons-material/Home';
import AddHomeIcon from '@mui/icons-material/AddHome';
import { useEffect } from "react";

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

      useEffect(() => {
            console.log("open:", open)
      }, [open]);
      
      return(
            <Fragment> 
                  {
                  !addressAdded ? 
                        <Box>
                              <Button variant="contained" startIcon={<AddHomeIcon />} sx={{
                                    color: "#FFFFFF",
                                    width: 200,
                                    padding: 1,
                                    fontSize: '1.1em',
                                    mt: 2,
                                    mb: 2
                              }} onClick={handleOpen}>
                                    Añadir dirección
                              </Button>
                        </Box>
                  :
                  <Box sx={{display: 'flex', alignItems: 'center'}}>
                              <HomeIcon/>
                              <span>
                                    {userInfo.userFullName}, {userInfo.userDistrict}, {userInfo.userCity}
                              </span>
                              <Button onClick={handleChangeAddress} variant="contained" sx={{ml: 1, color: "#FFFFFF", pl: 1, pr: 1, pt: 0, pb: 0}}>
                                    Cambiar
                              </Button>
                  </Box>
                  }
                  <AddressDialog open={open} handleClose={handleClose} setUserInfo={setUserInfo} setAddressAdded={setAddressAdded} defaultValues={userInfo} />
            </Fragment>
      );
}

export default AddressAddition;