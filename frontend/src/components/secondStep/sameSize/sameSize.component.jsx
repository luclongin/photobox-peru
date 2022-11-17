import { Button, Container, ImageList, ImageListItem } from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import UploadPhotoCard from '../../uploadPhotoCard/uploadPhotoCard.component';
import { photoAdded } from '../../../features/photoEdition/PhotoSlice';
import {OrderStepTitle, OrderStepSubtitle} from '../../OrderStepTitle/orderStepTitle.component';

const SameSize = () => {  
  const addedPhotos = useSelector(state => state.photos);
  const dispatch = useDispatch();

  const handleAddCard = () => {
    dispatch(photoAdded("20x20"));
  }

  return (
    <Container>
        <OrderStepTitle title="Suba y edita tus fotos" />
        <OrderStepSubtitle title="Producto " highlight="Mismo Tamaño" />
        <Button onClick={handleAddCard}>
          Add Card
        </Button>
        <ImageList cols={3} gap={0} sx={{
          height: '100%'
        }}>
          {
            addedPhotos.map((photo) => {
              return(
                <ImageListItem key={photo.id}>
                  <UploadPhotoCard photo={photo} />
                </ImageListItem>
              );
            })
          }
        </ImageList>
    </Container>
  )
}

export default SameSize;