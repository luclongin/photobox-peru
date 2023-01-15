import { Button, Box, Container, ImageList, ImageListItem } from '@mui/material';
import React, {useState} from 'react';
import { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import UploadPhotoCard from '../../uploadPhotoCard/uploadPhotoCard.component';
import { photoAdded } from '../../../features/photoEdition/PhotoSlice';
import {OrderStepTitle, OrderStepSubtitle} from '../../OrderStepTitle/orderStepTitle.component';
import AddCardButton from '../../manageOrder/addCardButton/addCardButton.component';
import {styled} from '@mui/material';
import AddCardButtonPulse from '../../manageOrder/addCardButtonPulse/addCardButtonPulse.component';
const SameSize = () => {  
  const addedPhotos = useSelector(state => state.photos);
  console.log("addedPhotos", addedPhotos);
  const [isHiddenAddCardBtn, setIsHiddenAddCardBtn] = useState(false);

  const dispatch = useDispatch();

  const handleAddCard = () => {
    dispatch(photoAdded("20x20"));
  }

  const showButton = (addedPhotos.length > 0) && (addedPhotos[0].imgSrc !== "") && (addedPhotos[0].imgSrc !== null);
  
  return (
    <Container>
        <OrderStepTitle title="Sube y edita tus fotos" />
        <OrderStepSubtitle title="Producto " highlight="Mismo Tamaño" />
        {
          /*<Button onClick={handleAddCard}>
          Add Card
        </Button>*/
        }
        {
            !showButton ?
        <Box sx={{
          display: 'flex',
          height: '50vh',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
            <AddCardButtonPulse width={200} plusSize="6em"/> 
        </Box>
        : null
        }
        <ImageList cols={3} gap={20} sx={{
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