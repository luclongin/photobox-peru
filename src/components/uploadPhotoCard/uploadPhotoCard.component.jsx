import React, {useEffect, useState} from "react";
import { Box, Button, Paper, styled, Typography } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import {Container} from "@mui/material";
import UploadPhotoDialog from "../uploadPhotoDialog/uploadPhotoDialog.component";
import UploadPhotoCardEmpty from "../uploadPhotoCardEmpty/uploadPhotoCardEmpty.component";
import UploadPhotoCardHover from "../uploadPhotoCardHover/uploadPhotoCardHover.component";

const UploadPhotoCard = ({cardId, formData, setFormData, handleDeleteCard}) => {
      const [emptyCardHidden, setEmptyCardHidden] = useState(false);
      const [newUploadPhotoCard, setNewUploadPhotoCard] = useState({
            id: cardId,
            imgSrc: null,
            result: null,
            dialogOpen: false,
      });

      const handleOpen = () => {
            setNewUploadPhotoCard({
                  ...newUploadPhotoCard,
                  dialogOpen: true
            });
      }
      
      const handleClose = () => {
            setNewUploadPhotoCard({
                  ...newUploadPhotoCard,
                  dialogOpen: false
            });
      }

      useEffect(() => {
            if(newUploadPhotoCard.imgSrc !== null) {
                  setEmptyCardHidden(true);
            }
      }, [newUploadPhotoCard])

      // this is shit
      // you need to update the already existing uploadedPhotos.imgSrc
      // maybe this means removing it and inserting another one.
      // USING ID

      useEffect(() => {
            console.log("ChangedPhotoCard...", newUploadPhotoCard);
            console.log("formdata looks like: ", formData.uploadedPhotos);
      }, [newUploadPhotoCard]);

      return(
            <Container>
                  <Button component="label" position="relative" sx={{
                        padding: 0,
                        margin: 0,
                  }}>
                        {
                              !emptyCardHidden ? (<UploadPhotoCardEmpty newUploadPhotoCard={newUploadPhotoCard} setNewUploadPhotoCard={setNewUploadPhotoCard} formData={formData} setFormData={setFormData} sx={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                              }} />
                              ): null 
                        }
                        {
                              emptyCardHidden ? (<UploadPhotoCardHover newUploadPhotoCard={newUploadPhotoCard} setNewUploadPhotoCard={setNewUploadPhotoCard} handleOpen={handleOpen} handleClose={handleClose} formData={formData} setFormData={setFormData}  handleDeleteCard={handleDeleteCard} sx={{
                              position: 'absolute',
                              top: 0,
                              left: 0,
                              }}/>
                              ): null
                        }
                        <UploadPhotoDialog newUploadPhotoCard={newUploadPhotoCard} setNewUploadPhotoCard={setNewUploadPhotoCard} open={newUploadPhotoCard.dialogOpen} handleClose={handleClose} />
                  </Button>
                  
            </Container>
      );
}

export default UploadPhotoCard;