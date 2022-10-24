import React from "react";
import { Button, Paper, rgbToHex, styled, Typography } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';

const UploadPhotoCard = () => {
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
            position: 'relative'
            
      })

      const handleUploadCardClick = () => {
            
      }

      return(
            <Button component="label" onClick={handleUploadCardClick}>
                  <PaperButton>
                        <AddIcon sx={{fontSize: '8em', color: '#F374E7'}}/>
                        <Typography variant="h10" component="p" hidden style={{
                              position: 'absolute',
                              bottom: 0
                        }}>
                              Haz un clic aquí para subir una foto
                        </Typography>
                  </PaperButton>
                  <input hidden accept="image/*" multiple type="file" />
            </Button>
      );
}

export default UploadPhotoCard;