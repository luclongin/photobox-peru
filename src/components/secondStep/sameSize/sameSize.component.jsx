import { Container, Typography } from '@mui/material';
import React from 'react';
import UploadPhotoCard from '../../uploadPhotoCard/uploadPhotoCard.component';

const SameSize = ({formData, setFormData}) => {
  return (
    <Container fluid="true">
      <Typography variant="h1" component="h1">Mismo Tamaño</Typography>
      <UploadPhotoCard formData={formData} setFormData={setFormData} />
    </Container>
  )
}

export default SameSize;