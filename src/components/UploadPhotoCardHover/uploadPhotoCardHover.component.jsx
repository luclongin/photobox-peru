import { Box, } from "@mui/material";
import CropIcon from '@mui/icons-material/Crop';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch, useSelector } from "react-redux";
import { photoDeleted } from "../../features/photoEdition/PhotoSlice";
import { IconButton, styled } from "@mui/material";
import { nextButtonEnabled } from "../../features/handleFormButtons/FormButtonsSlice";

/*
      Card that appears when hovering over a photo. Gives the option to delete or crop.

*/
const UploadPhotoCardHover = ({ id, setOpenDialog, onlyDelete }) =>{      
      const dispatch = useDispatch();
      const UploadPhotoCardHoverButton = styled(IconButton) ({
            width: 30,
            height: 30,
            color:"primary",
            ariaLabel:"Crop Photo",
            backgroundColor: 'white',
            borderRadius: '3px',
      });

      // WILL BE DEPRECATED
      // only available for Empty PHoto Card
      const topPos = (onlyDelete) => {
            if (onlyDelete) {
                  return(10)
            } else {
                  return(68);
            }
      }
           
      const photos = useSelector(state => state.photos);

      const handleDelete = () => {
            dispatch(photoDeleted({id: id}));
            // if you're deleting the last photo
            // 1 because of async lag, photos doesn't get updated immediately after dispatch
            if (photos.length === 1) {
                  dispatch(nextButtonEnabled(false));
            }
      }

      return(
            <Box sx={{
                  width: 350,
                  height: 350,
                  minWidth: 350,
                  borderRadius: 2,
                  position: 'absolute',
                  zIndex: 2,
                  backgroundColor: 'rgb(0,0,0,0.3)'
            }}>
                  { !onlyDelete && (<UploadPhotoCardHoverButton component="label" onClick={() => setOpenDialog(true)} sx={{
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
                  )}
                  <UploadPhotoCardHoverButton component="label" onClick={handleDelete} sx={{
                        position: 'absolute',
                        top: topPos(onlyDelete),
                        right: 10,
                        padding: 3,
                        borderRadius: 3
                  }}>
                        <DeleteIcon sx={{
                              width: 30
                        }}/>
                  </UploadPhotoCardHoverButton>
            </Box>
      );
}

export default UploadPhotoCardHover;