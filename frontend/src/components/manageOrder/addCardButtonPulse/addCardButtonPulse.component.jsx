import React from "react";
import { IconButton, Box, Typography, Grid } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { useDispatch, useSelector } from "react-redux";
import { photoDirectAdded, photoUpdatedSrc } from "../../../features/photoEdition/PhotoSlice";
import { nextButtonEnabled } from "../../../features/handleFormButtons/FormButtonsSlice";
import theme from "../../../utils/theme";
import {styled} from "@mui/material";
import { setImgResolutionMsg } from "../../../features/errorMessages/errorMessages";
import {getImageSize} from '../../../utils/imageTools';

/*
      Button in order to add directly a photo. Works exactly like your model website's button.
      Simplifies workflow as we do not have to call photoAdded action.
*/
const AddCardButtonPulse = ({width, plusSize, textOnly=false}) => {
      const dispatch = useDispatch();
      const photos = useSelector(state => state.photos);      

      const PulseButton = styled(IconButton) ({
        '&.MuiButtonBase-root': {
            '&::after': {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            animation: 'ripple 2.5s infinite ease-in-out',
            content: '""',
            }
        },
        '@keyframes ripple': {
            "0%": {
                transform: "scale(1)",
                opacity: "0.9",
                boxShadow: "0 0 0 0 #FF36C4"
            },
            "70%": {
                transform: "scale(1)",
                opacity: "0.2",
                boxShadow: "0 0 0 10px #FF36C4"
            },
            "100%": {
                transform: "scale(1)",
                opacity: "0.05",
                boxShadow: "0 0 0 0 #FF36C4"
            }
        }
      });

      const handleImage = async (e) => {
            let acceptImage = false;
            const imageBlob = URL.createObjectURL(e.target.files[0]);
            // checking if image size is acceptable
            const imgSize = await getImageSize(imageBlob);
            
            if (imgSize.width > 500 && imgSize.height > 500) {
                  acceptImage = true;
            }

            // if image is within the accepted dimensions
            if(acceptImage) {
                  dispatch(setImgResolutionMsg(false));
                  dispatch(photoDirectAdded({
                        imgDimensions: "20x20",
                        imgSrc: imageBlob,
                        type: e.target.files[0].type
                  }));

                  // ONLY AT LEAST 3
                  let enableNext = true;
                  // because this is dispatch image, there is a lag of one photo
                  // so if we have 2 photos imgSrc already completed
                  // and this function is called, then that means that a 3rd one
            
                  let imgCount = 0;
                  photos.map(photo => {
                        if(photo.imgSrc !== null) {
                              imgCount += 1;  
                        }
                  });
                  if(imgCount < 2) {
                        enableNext = false;
                  }

                  if(enableNext) {
                        dispatch(nextButtonEnabled(true));
                  }
            } else {
                  dispatch(setImgResolutionMsg(true));
            }
      }

      return(
            <Grid container>
                  <Grid item xs={12}>
                        <PulseButton
                              sx={{
                                    width: width,
                                    height: width,
                                    backgroundColor: 'rgb(255, 102, 196)',
                                    color: '#ffffff',
                                    "&:hover" : {
                                          backgroundColor: theme.palette.primary.darker,
                                          color: "#ffffff"
                                    }
                              }}
                              component="label"
                              color="primary"
                              aria-label="upload picture"
                        >
                              <input hidden accept="image/*" multiple type="file" onChange={handleImage}/>
                              <AddIcon sx={{
                                    fontSize: plusSize
                              }} />
                        </PulseButton>
                  </Grid>
                  {!textOnly && (<Grid item xs={12} sx={{
                  mt: 4,
                  color: "#9B8E9A"
                  }}>
                  <Typography variant="h6">
                        Haz clic para subir fotos
                  </Typography>
                  </Grid>)
                  }
            </Grid> 
            
      );
}

export default AddCardButtonPulse;