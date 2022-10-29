import React, { useState, useEffect } from "react";
import { Box, IconButton, styled } from "@mui/material";
import { useSelector } from "react-redux";
import UploadPhotoCardHover from "../UploadPhotoCardHover/uploadPhotoCardHover.component";
import { Fragment } from "react";

const UploadPhotoCardWithImage = ({id, setOpenDialog}) => {
      const photo = useSelector(state=>state.photos.find(photo => photo.id === id));
      const HoverBox = styled(Box) ({
            "& .hidden-hover": {
                  display: "none"
            },
            "&:hover .hidden-hover": {
                  display: "block"
            }
      });

      return(
            <Fragment>
                  <HoverBox sx={{
                        width: 350,
                        height: 350,
                        minWidth: 350,
                        position: 'relative',
                        overflow: 'hidden'
                  }}>
                        <img width={350} height={350} src={photo.imgResult} alt="" style={{borderRadius: '10px'}}/>
                        
                        <Box sx={{zIndex: 3, position: 'absolute', top: 0}} className="hidden-hover" >
                              <UploadPhotoCardHover id={id} setOpenDialog={setOpenDialog}/>
                        </Box>
                  </HoverBox>
                  
            </Fragment>
      );

}

export default UploadPhotoCardWithImage;