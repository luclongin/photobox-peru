import React from "react";
import { IconButton } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { useDispatch } from "react-redux";
import { photoDirectAdded, photoUpdatedSrc } from "../../../features/photoEdition/PhotoSlice";
import { nextButtonEnabled } from "../../../features/handleFormButtons/FormButtonsSlice";
import { Fragment } from "react";
import { addPhotoCount, incrementPhotoCount } from "../../../features/photoCount/PhotoCountSlice";

const AddCardButton = () => {
      const dispatch = useDispatch();

      const handleImage = (e) => {
            const imageBlob = URL.createObjectURL(e.target.files[0]);
            console.log("imgSrc: ", imageBlob);
            dispatch(photoDirectAdded({
                  imgDimensions: "20x20",
                  imgSrc: imageBlob
            }));
            dispatch(nextButtonEnabled(true));
            dispatch(incrementPhotoCount());
      }

      return(
            <Fragment>
                  <IconButton
                        sx={{
                              width: 60,
                              height: 60,
                              backgroundColor: '#ffffff',
                              border: '1px solid #BCB7BC'
                        }}
                        component="label"
                        color="primary"
                        aria-label="upload picture"
                  >
                        <input hidden accept="image/*" multiple type="file" onChange={handleImage}/>
                        <AddIcon />
                  </IconButton>
            </Fragment> 
      );
}

export default AddCardButton;