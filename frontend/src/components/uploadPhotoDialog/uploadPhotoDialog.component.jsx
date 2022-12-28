import React, { Fragment, useState, useCallback, useEffect, useRef } from 'react'
import Cropper from 'react-easy-crop'
import { Slider, Box} from '@mui/material';
import getCroppedImg from '../../utils/cropImage';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { photoSetFile, photoUpdatedResult } from '../../features/photoEdition/PhotoSlice';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

/*
  Our dialog for Cropping. Heavily inspired by online demo. 
*/
function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;
  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

const UploadPhotoDialog = ({id, openDialog, setOpenDialog}) => {
      const dispatch = useDispatch();
      const mounted = useRef();
      // troublesome because could be heavy on the computing side
      const photo = useSelector(state=>state.photos.find(photo => photo.id === id));

      const [crop, setCrop] = useState({ x: 0, y: 0 });
      const [rotation, setRotation] = useState(0);
      const [zoom, setZoom] = useState(1);
      const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
      const [croppedImage, setCroppedImage] = useState(null);
      const [croppedBlob, setCroppedBlob] = useState(null);
      
      const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels);
      }, [])

      const handleSave = useCallback(async () => {
        try {
            const flip = { horizontal: false, vertical: false };
            const cropped = await getCroppedImg(
              {
                imageSrc: photo.imgResult,
                pixelCrop: croppedAreaPixels,
                rotation: rotation,
                flip: flip
              }
            );
            setCroppedImage(URL.createObjectURL(cropped));
            setCroppedBlob(cropped);

        } catch (e) {
              console.error(e);
        }
      }, [croppedAreaPixels]);

      useEffect(() => {
        // because of the way croppedImage can be triggered so easily (clicking back button)
        // adding condition
        if(croppedImage !== null) {
          // dispatching to update already existing photo item in store
          dispatch(photoUpdatedResult({id: photo.id, imgResult: croppedImage}));
          //let formData = new FormData();
          //formData.append('croppedBlob', croppedBlob);
          //dispatch(photoSetFile({id: photo.id, file: formData}));
          //let formData = new FormData();
          //const newFile = new File([croppedImage], photo.id);
          //formData.append('file', newFile);
         //dispatch(photoSetFile({id: photo.id, file: formData}));
        }
        setOpenDialog(false);
      }, [croppedImage]);
      
      return(
        <Dialog
          onClose={() => setOpenDialog(false)}
          aria-labelledby="customized-dialog-title"
          open={openDialog}
          fullWidth={true}
          maxWidth='sm'
        >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={() => setOpenDialog(false)} sx={{
          textAlign: 'center',
          fontSize: '1.6em',
          pt: 2,
          pb: 1
        }}>
          Recortar foto
        </BootstrapDialogTitle>
        <DialogContent dividers>
              { photo.imgResult ? (
              <Fragment>
                <Box sx={{
                  position: 'relative',
                  width: '100%',
                  height: 250,
                  background: '#333',
                }}>
                  <Cropper
                        image={photo.imgResult}
                        crop={crop}
                        rotation={rotation}
                        zoom={zoom}
                        aspect={1}
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
                    alignItems: 'center',
                    pt: 1
                  }}>
                    <Typography
                      variant="overline" sx={{fontSize: '0.9em', fontWeight: 'bold'}}>
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
                </Box>
              </Fragment>
            ) : null
            }
            </DialogContent>
            <DialogActions>
            <Button
              autoFocus
              onClick={handleSave}
              variant="contained"
              sx={{
                color: "white",
                fontSize: '1em',
                pl: 3,
                pr: 3
              }}
            >
              Listo
            </Button>
          </DialogActions>
          </Dialog>
      );
}

export default UploadPhotoDialog;