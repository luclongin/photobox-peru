import React, { useEffect } from "react";
import { Box, IconButton, styled } from "@mui/material";
import CropIcon from '@mui/icons-material/Crop';
import DeleteIcon from '@mui/icons-material/Delete';

const UploadPhotoCardHover = ({ newUploadPhotoCard, handleOpen, handleDeleteCard, formData, setFormData}) =>{      
      const UploadPhotoCardHoverButton = styled(IconButton) ({
            width: 30,
            height: 30,
            color:"primary",
            ariaLabel:"Crop Photo",
            backgroundColor: 'white',
            borderRadius: '3px',
      });

      const getCorrespondingCard = () => {
            const cardId = newUploadPhotoCard.id;
            const cardImgSrc = newUploadPhotoCard.imgSrc;
            handleDeleteCard(cardId, cardImgSrc);
      }

      useEffect(() => {
            console.log("formdata from hover: ", formData.uploadedPhotos);
      }, [newUploadPhotoCard])

      return(
            <Box sx={{
                  width: 220,
                  height: 220,
                  position: 'relative'
            }}>
                  <img width={220} height={220} src={newUploadPhotoCard.result} alt="" style={{borderRadius: '10px'}}/>
                  <UploadPhotoCardHoverButton component="label" onClick={handleOpen} sx={{
                        position: 'absolute',
                        top: 10,
                        right: 10,
                  }}>
                        <CropIcon sx={{
                              width: 20
                        }}/>
                  </UploadPhotoCardHoverButton>
                  <UploadPhotoCardHoverButton component="label" onClick={getCorrespondingCard} sx={{
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