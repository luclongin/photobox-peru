import React, {useState} from "react";
import { Button} from "@mui/material";
import {Container} from "@mui/material";
import UploadPhotoDialog from "../uploadPhotoDialog/uploadPhotoDialog.component";
import UploadPhotoCardEmpty from "../uploadPhotoCardEmpty/uploadPhotoCardEmpty.component";
import UploadPhotoCardWithImage from "../UploadPhotoCardWithImage/UploadPhotoCardWithImage";

const UploadPhotoCard = ({photo}) => {
      
      const [openDialog, setOpenDialog] = useState(false);
      return(
            
                  <Button component="label">
                        {
                              photo.hidden ? (<UploadPhotoCardEmpty id={photo.id} sx={{
                                    
                              }} />
                              ): null 
                        }
                        {
                              !photo.hidden ? (<UploadPhotoCardWithImage id={photo.id} setOpenDialog={setOpenDialog} sx={{
                              
                              }}/>
                              ): null
                        }
                        <UploadPhotoDialog id={photo.id} openDialog={openDialog} setOpenDialog={setOpenDialog} />
                  </Button>
      );
}

export default UploadPhotoCard;