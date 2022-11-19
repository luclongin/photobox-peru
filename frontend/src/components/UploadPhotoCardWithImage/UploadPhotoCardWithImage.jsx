import React, { useState, useEffect } from "react";
import { Box, IconButton, styled } from "@mui/material";
import { useSelector } from "react-redux";
import UploadPhotoCardHover from "../UploadPhotoCardHover/uploadPhotoCardHover.component";
import { Fragment } from "react";
import UploadPhotoCardEmpty from "../uploadPhotoCardEmpty/uploadPhotoCardEmpty.component";
/*
Main photo card that displays uploaded image.
*/
const UploadPhotoCardWithImage = ({id, setOpenDialog, width="350px"}) => {
      const photo = useSelector(state=>state.photos.find(photo => photo.id === id));
      // Needed for hovering
      const HoverBox = styled(Box) ({
            "& .hidden-hover": {
                  display: "none"
            },
            "&:hover .hidden-hover": {
                  display: "block"
            }
      });

      let relativeBorderRadius = '';
      if (width < 350) {
            relativeBorderRadius = '0';
      } else {
            relativeBorderRadius = '10px';
      }

      console.log("photo", photo);
      return(
            <Fragment>
                  {
                  (photo.imgSrc === null) ? 
                  <UploadPhotoCardEmpty id={photo.id} width={width}/>
                  :
                  <Fragment>
                  <HoverBox sx={{
                        width: width,
                        height: width,
                        minWidth: width,
                        position: 'relative',
                        overflow: 'hidden'
                  }}>
                        <img width={width} height={width} src={photo.imgResult} alt="" style={{borderRadius: relativeBorderRadius}}/>
                        
                        <Box sx={{zIndex: 3, position: 'absolute', top: 0}} className="hidden-hover" >
                              <UploadPhotoCardHover id={id} setOpenDialog={setOpenDialog} hoverWidth={width}/>
                        </Box>
                  </HoverBox>
                  </Fragment>
                  }
            </Fragment>
      );

}

export default UploadPhotoCardWithImage;