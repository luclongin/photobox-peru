import React, { Fragment } from "react";
import AddCardButtonPulseRaw from '../manageOrder/addCardButtonPulse/addCardButtonPulseRaw.component';
import AddIcon from '@mui/icons-material/Add';
import { Paper, styled, Typography, Box} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { photoUpdatedSrc } from "../../features/photoEdition/PhotoSlice";
import { nextButtonEnabled } from "../../features/handleFormButtons/FormButtonsSlice";
import UploadPhotoCardHover from "../UploadPhotoCardHover/uploadPhotoCardHover.component";
import { photoSetFile } from "../../features/photoEdition/PhotoSlice";
import { uploadCroppedPhotos } from "../../features/order/orders";
import theme from "../../utils/theme";
import {getImageSize} from '../../utils/imageTools';
import { setImgResolutionMsg } from "../../features/errorMessages/errorMessages";

const UploadPhotoCardEmpty = ({ id, width=350 }) => {
      const dispatch = useDispatch();
      const photos = useSelector(state => state.photos);
      const letters = useSelector(state => state.letters);

      const PaperButton = styled(Paper) ({
            display: 'flex',
            width: width,
            minWidth: width,
            height: width,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: '5px',
            border: '2px color #666',
      })

      const handleImage = async (e) => {
            e.preventDefault();
            let acceptImage = false;
            const imageBlob = URL.createObjectURL(e.target.files[0]);
            // checking if image size is acceptable
            const imgSize = await getImageSize(imageBlob);
                        
            if (imgSize.width > 500 && imgSize.height > 500) {
                  acceptImage = true;
            }

            // if image is within the accepted dimensions
            if(acceptImage) {
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
            } else {
                  dispatch(setImgResolutionMsg(true));
            }
      };

      // Needed for Hovering
      const HoverBox = styled(Box) ({
            "& .hidden-hover": {
                  display: "none"
            },
            "&:hover .hidden-hover": {
                  display: "flex",
                  marginTop: 0,
            }
      });

      let relativeFontSize = '';
      if (width < 350) {
            relativeFontSize = '7.5em';
      }

      return(
            <Fragment>
                  <HoverBox sx={{position: 'relative', display: 'flex', justifyContent: 'center'}}>
                        <PaperButton elevation={4}>
                              <AddCardButtonPulseRaw width={45} plusSize="1.8em" textOnly={true} /> 
                              { /*
                              <AddIcon sx={{fontSize: relativeFontSize, color: theme.palette.primary.main}}/>
                              */
                              }
                        </PaperButton>
                        <input hidden accept="image/*" multiple={false} type="file" onChange={handleImage}/>
                        <Box sx={{zIndex: 3, position: 'absolute', top: -15, width: '80%', height: '100%', textAlign: 'center'}} className="hidden-hover" >
                              <Typography variant="h10" component="p" style={{
                                    position: 'absolute',
                                    bottom: -8,
                                    width: '100%',
                                    lineHeight: '16px',
                                    zIndex: 4,
                                    color: "#9B8E9A",
                                    fontSize: '0.85em'
                              }}>
                                    Haz clic aquí para subir una foto
                              </Typography>
                              <UploadPhotoCardHover width={width} id={id} setOpenDialog={null} noButtonShown={true} hoverWidth={width}/>
                        </Box>
                  </HoverBox>
            </Fragment>
      );
}

export default UploadPhotoCardEmpty;