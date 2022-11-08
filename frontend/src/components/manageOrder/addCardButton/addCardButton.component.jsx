import React from "react";
import { IconButton } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { useDispatch } from "react-redux";
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

      const handleImage = (e) => {
            
            console.log("e.target", e.target.files[0]);
            const imageBlob = URL.createObjectURL(e.target.files[0]);
            console.log("imgSrc: ", imageBlob);
            dispatch(photoDirectAdded({
                  imgDimensions: "20x20",
                  imgSrc: imageBlob,
                  name: e.target.files[0].name
            }));
            dispatch(nextButtonEnabled(true));
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