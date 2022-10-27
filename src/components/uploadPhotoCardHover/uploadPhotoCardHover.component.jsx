import React, { useEffect } from "react";
import { Box, IconButton, styled } from "@mui/material";
import CropIcon from '@mui/icons-material/Crop';
import DeleteIcon from '@mui/icons-material/Delete';
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { photoDeleted } from "../../features/photoEdition/PhotoSlice";

const UploadPhotoCardHover = ({ id, setOpenDialog }) =>{      
      const dispatch = useDispatch();
      const UploadPhotoCardHoverButton = styled(IconButton) ({
            width: 30,
            height: 30,
            color:"primary",
            ariaLabel:"Crop Photo",
            backgroundColor: 'white',
            borderRadius: '3px',
      });

      const photo = useSelector(state=>state.photos.find(photo => photo.id === id));

      return(
            <Box sx={{
                  width: 220,
                  height: 220,
                  position: 'relative'
            }}>
                  <img width={220} height={220} src={photo.imgResult} alt="" style={{borderRadius: '10px'}}/>
                  <UploadPhotoCardHoverButton component="label" onClick={() => setOpenDialog(true)} sx={{
                        position: 'absolute',
                        top: 10,
                        right: 10,
                  }}>
                        <CropIcon sx={{
                              width: 20
                        }}/>
                  </UploadPhotoCardHoverButton>
                  <UploadPhotoCardHoverButton component="label" onClick={() => { 
                        dispatch(photoDeleted({id: id}));
                  }} sx={{
                        position: 'absolute',
                        top: 45,
                        right: 10,
                  }}>
                        <DeleteIcon sx={{
                              width: 20
                        }}/>
                  </UploadPhotoCardHoverButton>
            </Box>
      );
}

export default UploadPhotoCardHover;