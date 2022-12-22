import React, {useState} from "react";
import { Button} from "@mui/material";
import {Container} from "@mui/material";
import UploadPhotoDialog from "../uploadPhotoDialog/uploadPhotoDialog.component";
import UploadPhotoCardEmpty from "../uploadPhotoCardEmpty/uploadPhotoCardEmpty.component";
import UploadPhotoCardWithImage from "../UploadPhotoCardWithImage/UploadPhotoCardWithImage";

const UploadPhotoCard = ({photo, width="350px"}) => {
      
      const [openDialog, setOpenDialog] = useState(false);
      
            return(
                  <Button component="label" sx={{padding: 0, pt: 2, pb: 2}}>
                        {
                              photo.hidden ? (<UploadPhotoCardEmpty id={photo.id} width={width}/>
                              ): null 
                        }
                        {
                              !photo.hidden ? (<UploadPhotoCardWithImage id={photo.id} setOpenDialog={setOpenDialog} width={width}/>
                              ): null
                        }
                        <UploadPhotoDialog id={photo.id} openDialog={openDialog} setOpenDialog={setOpenDialog} />
                  </Button>
            );
      
}

export default UploadPhotoCard;