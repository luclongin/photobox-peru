import React, { Fragment } from "react";
import AddIcon from '@mui/icons-material/Add';
import { Paper, styled, Typography, Box} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { photoUpdatedSrc } from "../../features/photoEdition/PhotoSlice";
import { nextButtonEnabled } from "../../features/handleFormButtons/FormButtonsSlice";
import UploadPhotoCardHover from "../UploadPhotoCardHover/uploadPhotoCardHover.component";
import { photoSetFile } from "../../features/photoEdition/PhotoSlice";
import { uploadCroppedPhotos } from "../../features/order/orders";

/*
      WILL BE DEPRECATED.
      Is the card that shows when calling the photoAdded() action.
*/
const UploadPhotoCardEmpty = ({ id }) => {
      const dispatch = useDispatch();
      const photos = useSelector(state => state.photos);

      const PaperButton = styled(Paper) ({
            elevation: "2",
            display: 'flex',
            width: 350,
            minWidth: 350,
            height: 350,
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
      })

      const handleImage = async (e) => {
            e.preventDefault();



            const imageBlob = URL.createObjectURL(e.target.files[0]);
            dispatch(photoUpdatedSrc({
                  id: id,
                  imgSrc: imageBlob
                  //file: e.target.files[0]
            }));

            
            //console.log("photos from empty: ", photos);
            dispatch(nextButtonEnabled(true));
      };

      // Needed for Hovering
      const HoverBox = styled(Box) ({
            "& .hidden-hover": {
                  display: "none"
            },
            "&:hover .hidden-hover": {
                  display: "flex",
                  marginTop: 6
            }
      });

      return(
            <Fragment>
                  <HoverBox>
                        <PaperButton>
                              <AddIcon sx={{fontSize: '16em', color: '#F374E7'}}/>
                              <Typography variant="h10" component="p" hidden style={{
                                    position: 'absolute',
                                    bottom: 0
                              }}>
                                    Haz un clic aquí para subir una foto
                              </Typography>
                        </PaperButton>
                        <input hidden accept="image/*" multiple={false} type="file" onChange={handleImage}/>
                        <Box sx={{zIndex: 3, position: 'absolute', top: 0}} className="hidden-hover" >
                              <UploadPhotoCardHover id={id} setOpenDialog={null} onlyDelete={true}/>
                        </Box>
                  </HoverBox>
            </Fragment>
      );
}

export default UploadPhotoCardEmpty;