import React, { Fragment } from "react";
import AddIcon from '@mui/icons-material/Add';
import { Paper, styled, Typography, Box} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { photoUpdatedSrc } from "../../features/photoEdition/PhotoSlice";
import { nextButtonEnabled } from "../../features/handleFormButtons/FormButtonsSlice";
import UploadPhotoCardHover from "../UploadPhotoCardHover/uploadPhotoCardHover.component";
import { photoSetFile } from "../../features/photoEdition/PhotoSlice";
import { uploadCroppedPhotos } from "../../features/order/orders";

const UploadPhotoCardEmpty = ({ id, width=350 }) => {
      const dispatch = useDispatch();
      const photos = useSelector(state => state.photos);
      const letters = useSelector(state => state.letters);

      const PaperButton = styled(Paper) ({
            elevation: "2",
            display: 'flex',
            width: width,
            minWidth: width,
            height: width,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: '0',
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
                  imgSrc: imageBlob,
                  type: e.target.files[0].type
            }));
            
            // HANDLE NEXT BUTTON IF THREE PHOTOS
            // INDEPENDENT FROM PHOTOS
            // CASE: LAST IMAGE IS UPLOADED AND ALL LETTERS ARE ALREADY FILLED
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

            const lettersAllFilled = (letters.letter1 !== "") && (letters.letter2 !== "") && (letters.letter3 !== "");
            enableNext = enableNext && lettersAllFilled;
            if(enableNext) {
                  dispatch(nextButtonEnabled(true));
            } else {
                  dispatch(nextButtonEnabled(false));
            }
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

      let relativeFontSize = '';
      if (width < 350) {
            relativeFontSize = '5em';
      }

      return(
            <Fragment>
                  <HoverBox sx={{position: 'relative'}}>
                        <PaperButton>
                                    <AddIcon sx={{fontSize: relativeFontSize, color: '#F374E7'}}/>
                              <Typography variant="h10" component="p" hidden style={{
                                    position: 'absolute',
                                    bottom: 0
                              }}>
                                    Haz un clic aquí para subir una foto
                              </Typography>
                        </PaperButton>
                        <input hidden accept="image/*" multiple={false} type="file" onChange={handleImage}/>
                        <Box sx={{zIndex: 3, position: 'absolute', top: -6}} className="hidden-hover" >
                              <UploadPhotoCardHover width={width} id={id} setOpenDialog={null} noButtonShown={true} hoverWidth={width}/>
                        </Box>
                  </HoverBox>
            </Fragment>
      );
}

export default UploadPhotoCardEmpty;