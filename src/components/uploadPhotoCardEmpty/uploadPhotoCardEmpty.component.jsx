import React, { useState, Fragment, useEffect } from "react";
import AddIcon from '@mui/icons-material/Add';
import { Paper, styled, Typography } from "@mui/material";

const UploadPhotoCardEmpty = ({newUploadPhotoCard, setNewUploadPhotoCard, formData, setFormData}) => {
      const PaperButton = styled(Paper) ({
            elevation: "2",
            display: 'flex',
            flexWrap: 'wrap',
            width: 220,
            height: 220,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: '10px',
            border: '2px color #666',
            "&:hover": {
                  backgroundColor: "rgb(100,100,100,0.8)",
                  "& svg": {
                        color: "rgb(243, 116, 231, 0.1)"
                  },
                  "& p": {
                        color: 'white',
                        display: 'block'
                  }
            },
            position: 'absolute',
            top: 0,
            left: 0,   
      })

      const handleImage = (e) => {
            const imageBlob = URL.createObjectURL(e.target.files[0]);
            setNewUploadPhotoCard({
                  ...newUploadPhotoCard,
                  imgSrc: imageBlob,
                  result: imageBlob
            });
            
            setFormData({
                  ...formData,
                  uploadedPhotos: [
                        ...formData.uploadedPhotos,
                        {
                              original: imageBlob,
                              cropped: imageBlob
                        }
                  ]
            });
      };

      return(
            <Fragment>
                  <PaperButton>
                        <AddIcon sx={{fontSize: '8em', color: '#F374E7'}}/>
                        <Typography variant="h10" component="p" hidden style={{
                              position: 'absolute',
                              bottom: 0
                        }}>
                              Haz un clic aquí para subir una foto
                        </Typography>
                  </PaperButton>
                  <input hidden accept="image/*" multiple type="file" onChange={handleImage}/>
            </Fragment>
      );
}

export default UploadPhotoCardEmpty;