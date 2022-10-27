import { Button, Box, Grid, Typography } from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import UploadPhotoCard from '../../uploadPhotoCard/uploadPhotoCard.component';
import { photoAdded } from '../../../features/photoEdition/PhotoSlice';

const SameSize = () => {  
  const addedPhotos = useSelector(state => state.photos);
  console.log("addedPhotos", addedPhotos);
  const dispatch = useDispatch();

  const handleAddCard = () => {
    dispatch(photoAdded("20x20"));
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
            addedPhotos.map((photo) => {
              return(
                <Grid key={photo.id} item xs={3} sm={3} md={3} lg={3} xl={3}>
                  <UploadPhotoCard photo={photo} />
                </Grid>
              );
            })
          }
        </Grid>
    </Box>
  )
}

export default SameSize;