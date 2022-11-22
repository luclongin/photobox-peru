import React from "react";
import { IconButton } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { useDispatch, useSelector } from "react-redux";
import { photoDirectAdded, photoUpdatedSrc } from "../../../features/photoEdition/PhotoSlice";
import { nextButtonEnabled } from "../../../features/handleFormButtons/FormButtonsSlice";
import { Fragment } from "react";
import theme from "../../../utils/theme";
/*
      Button in order to add directly a photo. Works exactly like your model website's button.
      Simplifies workflow as we do not have to call photoAdded action.
*/
const AddCardButton = () => {
      const dispatch = useDispatch();
      const photos = useSelector(state => state.photos);

      const handleImage = (e) => {
            
            console.log("e.target", e.target.files[0]);
            const imageBlob = URL.createObjectURL(e.target.files[0]);
            console.log("imgSrc: ", imageBlob);
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
      }

      return(
            <Fragment>
                  <IconButton
                        sx={{
                              width: 90,
                              height: 90,
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
                              fontSize: '2em'
                        }} />
                  </IconButton>
            </Fragment> 
      );
}

export default AddCardButton;