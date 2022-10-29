import { Box, } from "@mui/material";
import CropIcon from '@mui/icons-material/Crop';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch } from "react-redux";
import { photoDeleted } from "../../features/photoEdition/PhotoSlice";
import { IconButton, styled } from "@mui/material";



const UploadPhotoCardHover = ({ id, setOpenDialog }) =>{      
      
      const dispatch = useDispatch();
      const UploadPhotoCardHoverButton = styled(IconButton) ({
            width: 30,
            height: 30,
            color:"primary",
            ariaLabel:"Crop Photo",
            backgroundColor: 'white',
            borderRadius: '3px',
      });

      return(
            <Box sx={{
                  width: 350,
                  height: 350,
                  minWidth: 350,
                  position: 'absolute',
                  zIndex: 2,
                  backgroundColor: 'rgb(0,0,0,0.5)'
            }}>
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
                  <UploadPhotoCardHoverButton component="label" onClick={() => { 
                        dispatch(photoDeleted({id: id}));
                  }} sx={{
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
            </Box>
      );
}

export default UploadPhotoCardHover;