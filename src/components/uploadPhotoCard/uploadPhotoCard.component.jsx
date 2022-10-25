import React, {useState} from "react";
import { Button, Paper, styled, Typography } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import {Container} from "@mui/material";
import UploadPhotoDialog from "../uploadPhotoDialog/uploadPhotoDialog.component";


const UploadPhotoCard = ({formData, setFormData}) => {
      // image source
      const [srcImg, setSrcImg] = useState(null);
      // image for cropping
      const [image, setImage] = useState(null);
      // aspect ratio of crop tool
      const [crop, setCrop] = useState({aspect: 16/9});
      //save result
      const [result, setResult] = useState(null);
            
      const handleImage = (e) => {
            setFormData({
                  ...formData,
                  uploadedPhotos: [...formData.uploadedPhotos, URL.createObjectURL(e.target.files[0])],
            })
      };

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
            <Container>
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
                        <input hidden accept="image/*" multiple type="file" onChange={handleImage}/>
                  </Button>
       </Container>
      );
}

export default UploadPhotoCard;