import { Button, Box, Container, Grid, Typography } from '@mui/material';
import React, {useState, useEffect} from 'react';
import UploadPhotoCard from '../../uploadPhotoCard/uploadPhotoCard.component';

const SameSize = ({formData, setFormData}) => {
  const [uploadCards, setUploadCards] = useState([]);
  
  useEffect(() => {
    console.log("Displayed Upload Cards: ", uploadCards);
  }, [uploadCards]);

  const removeFromFormData = (cardImgSrc) => {
    const newUploadedPhotos = formData.uploadedPhotos.filter((photoURL) => {
      return photoURL !== cardImgSrc;
    })
    setFormData({
      ...formData,
      uploadedPhotos: newUploadedPhotos
    })
  }

  const removeFromDisplayedUploadCards = (cardId) => {
    setUploadCards(
      current => current.filter((uploadCard) => {
        return uploadCard.id !== cardId
      })
    );
    removeFromFormData(cardId);
  }

  const handleDeleteCard = (cardId, cardImgSrc) => {
    removeFromDisplayedUploadCards(cardId);
    removeFromFormData(cardImgSrc);
  }

  // challenge is to find a way to display cards so that you can find it by URL
  // maybe associate a card with an id

  const handleAddCard = () => {
    const cardId = uploadCards.length;
    setUploadCards([
      ...uploadCards,
      {
        id: cardId,
        cardObject: <UploadPhotoCard cardId={cardId} formData={formData} setFormData={setFormData} handleDeleteCard={handleDeleteCard} />
      }
    ])
  }

  return (
    <Box sx={{width: '100%'}}>
      <Typography variant="h1" component="h1">Mismo Tamaño</Typography>
        <Button onClick={handleAddCard}>
          Add Card
        </Button>
        <Grid container columnSpacing={2} sx={{
          justifyContent: 'center',
        }}>
          {

          }
          
          {
            uploadCards.map((uploadCard) => {
              return(
                <Grid key={uploadCard.id} item xs={3} sm={3} md={3} lg={3} xl={3}>
                {uploadCard.cardObject}
                </Grid>
              );
            })
          }
        </Grid>
        
    </Box>
  )
}

export default SameSize;