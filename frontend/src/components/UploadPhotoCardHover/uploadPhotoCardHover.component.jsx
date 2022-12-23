import { Box, Typography} from "@mui/material";
import CropIcon from '@mui/icons-material/Crop';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch, useSelector } from "react-redux";
import { photoDeleted } from "../../features/photoEdition/PhotoSlice";
import { IconButton, styled } from "@mui/material";
import { nextButtonEnabled } from "../../features/handleFormButtons/FormButtonsSlice";
import { Fragment } from "react";
import { photoUpdatedSrc } from "../../features/photoEdition/PhotoSlice";

/*
      Card that appears when hovering over a photo. Gives the option to delete or crop.

*/
const UploadPhotoCardHover = ({ id, setOpenDialog, noButtonShown, hoverWidth="350px" }) =>{      
      const dispatch = useDispatch();
      const UploadPhotoCardHoverButton = styled(IconButton) ({
            width: 30,
            height: 30,
            color:"primary",
            ariaLabel:"Recortar Foto",
            backgroundColor: 'white',
      });
           
      const photos = useSelector(state => state.photos);
      const letters = useSelector(state => state.letters);
      const product = useSelector(state => state.product);

      const handleDelete = () => {
            if(product === "sameSize") {
                  dispatch(photoDeleted({id: id}));
                  // if you're deleting the last photo
                  // 1 because of async lag, photos doesn't get updated immediately after dispatch
                  if (photos.length < 4) {
                        dispatch(nextButtonEnabled(false));
                  }
            } else if(product === "letras") {
                  dispatch(photoUpdatedSrc({id: id, imgSrc: null, type: null}));
                  dispatch(nextButtonEnabled(false));
            }
      }

      return(
            <Box sx={{
                  width: hoverWidth,
                  height: hoverWidth,
                  minWidth: hoverWidth,
                  position: 'absolute',
                  zIndex: 2,
                  backgroundColor: 'rgb(0,0,0,0.3)',
                  borderRadius: '5px',
            }}>
                  { !noButtonShown && (
                  <Fragment>
                        <UploadPhotoCardHoverButton component="label" onClick={() => setOpenDialog(true)} sx={{
                              position: 'absolute',
                              top: 10,
                              right: 10,
                              padding: 3,
                              borderRadius: 3
                        }}>
                              <CropIcon sx={{
                                    width: 30
                              }}/>
                        </UploadPhotoCardHoverButton>
                        
                        <UploadPhotoCardHoverButton component="label" onClick={handleDelete} sx={{
                              position: 'absolute',
                              top: 68,
                              right: 10,
                              padding: 3,
                              borderRadius: 3
                        }}>
                              <DeleteIcon sx={{
                                    width: 30
                              }}/>
                        </UploadPhotoCardHoverButton>
                  </Fragment>
                  )}
            </Box>
      );
}

export default UploadPhotoCardHover;