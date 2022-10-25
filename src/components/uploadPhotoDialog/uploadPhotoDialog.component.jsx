import React, { Fragment, useState, useCallback } from 'react'
import Cropper from 'react-easy-crop'
import { Container, Slider, Button, Typography, Box} from '@mui/material';
import getCroppedImg from '../../utils/cropImage';
import {styled} from '@mui/material/styles';
import UploadPhotoCard from '../uploadPhotoCard/uploadPhotoCard.component';

function readFile(file) {
  return new Promise((resolve) => {
    const reader = new FileReader()
    reader.addEventListener('load', () => resolve(reader.result), false)
    reader.readAsDataURL(file)
  })
}

const UploadPhotoDialog = () => {
      const [imageSrc, setImageSrc] = useState(null);
      const [crop, setCrop] = useState({ x: 0, y: 0 });
      const [rotation, setRotation] = useState(0);
      const [zoom, setZoom] = useState(1);
      const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
      const [croppedImage, setCroppedImage] = useState(null);

      const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels);
      }, [])

      const showCroppedImage = useCallback(async () => {
      try {
            const croppedImage = await getCroppedImg(
            imageSrc,
            croppedAreaPixels,
            rotation
            )
            console.log('donee', { croppedImage });
            setCroppedImage(croppedImage);
      } catch (e) {
            console.error(e);
      }
      }, [croppedAreaPixels, rotation])

      const onClose = useCallback(() => {
      setCroppedImage(null)
      }, []);

      const onFileChange = async (e) => {
        if (e.target.files && e.target.files.length > 0) {
          const file = e.target.files[0]
          let imageDataUrl = await readFile(file);
          setImageSrc(imageDataUrl)
        }
      }

      return(
            <Container fluid="true" sx={{
              width: 500
            }}>
              { imageSrc ? (
              <Fragment>
                <Box sx={{
                  position: 'relative',
                  width: '100%',
                  height: 200,
                  background: '#333',
                }}>
                  <Cropper
                        image={imageSrc}
                        crop={crop}
                        rotation={rotation}
                        zoom={zoom}
                        aspect={4/3}
                        onCropChange={setCrop}
                        onRotationChange={setRotation}
                        onCropComplete={onCropComplete}
                        onZoomChange={setZoom}
                  /> 
                </Box>
                <Box sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'stretch',
                }}>
                  <Box sx={{
                    display: 'flex',
                    flex: '1',
                    alignItems: 'center',}}
                  >
                    <Typography
                      variant="overline"                  >
                      Zoom
                    </Typography>
                    <Slider
                      value={zoom}
                      min={1}
                      max={3}
                      step={0.1}
                      aria-labelledby="Zoom"
                      onChange={(e, zoom) => setZoom(zoom)}
                      style={{
                        padding: '22px 0px',
                        marginLeft: 16,
                      }}
                    />
                  </Box>
                  <Button
                    onClick={showCroppedImage}
                    variant="contained"
                    color="primary"
                  >
                    Show Result
                  </Button>
                </Box>
              </Fragment>
            ) : (
              <div>MERDE</div>
              //<UploadPhotoCard />
              //<input type="file" onChange={onFileChange} accept="image/*" />
            )
            }
            </Container>
            
            
      );
}

export default UploadPhotoDialog;