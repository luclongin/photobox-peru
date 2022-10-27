import React, {useState} from "react";
import { Button} from "@mui/material";
import {Container} from "@mui/material";
import UploadPhotoDialog from "../uploadPhotoDialog/uploadPhotoDialog.component";
import UploadPhotoCardEmpty from "../uploadPhotoCardEmpty/uploadPhotoCardEmpty.component";
import UploadPhotoCardHover from "../uploadPhotoCardHover/uploadPhotoCardHover.component";

const UploadPhotoCard = ({photo}) => {
      
      const [openDialog, setOpenDialog] = useState(false);
      const [manageCard, setManageCard] = useState({
            emptyCardHidden: false
      })

      return(
            <Container>
                  <Button component="label" position="relative" sx={{
                        padding: 0,
                        margin: 0,
                  }}>
                        {
                              !manageCard.emptyCardHidden ? (<UploadPhotoCardEmpty id={photo.id} manageCard={manageCard} setManageCard={setManageCard} sx={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                              }} />
                              ): null 
                        }
                        {
                              manageCard.emptyCardHidden ? (<UploadPhotoCardHover id={photo.id} setOpenDialog={setOpenDialog} sx={{
                              position: 'absolute',
                              top: 0,
                              left: 0,
                              }}/>
                              ): null
                        }
                        <UploadPhotoDialog id={photo.id} openDialog={openDialog} setOpenDialog={setOpenDialog} />
                  </Button>
                  
            </Container>
      );
}

export default UploadPhotoCard;