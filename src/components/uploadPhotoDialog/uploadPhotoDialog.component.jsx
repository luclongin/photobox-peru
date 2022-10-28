import React, { Fragment, useState, useCallback, useEffect, useRef } from 'react'
import Cropper from 'react-easy-crop'
import { Slider, Box} from '@mui/material';
import getCroppedImg from '../../utils/cropImage';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { photoUpdatedResult } from '../../features/photoEdition/PhotoSlice';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
const BootstrapDialog = styled(Dialog)(({  }) => ({
  
}));

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
      //const [imageSrc, setImageSrc] = useState(null);
      // troublesome because could be heavy on the computing side
      const photo = useSelector(state=>state.photos.find(photo => photo.id === id));

      const [crop, setCrop] = useState({ x: 0, y: 0 });
      const [rotation, setRotation] = useState(0);
      const [zoom, setZoom] = useState(1);
      const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
      const [croppedImage, setCroppedImage] = useState(null);

      const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels);
      }, [])

      const handleSave = useCallback(async () => {
        try {
                setCroppedImage(await getCroppedImg(
                  photo.imgResult,
                  croppedAreaPixels,
                  rotation
                ));
        } catch (e) {
              console.error(e);
        }
      }, [croppedAreaPixels])

      useEffect(() => {
        // because of the way croppedImage can be triggered so easily (clicking back button)
        // adding condition
        if(croppedImage !== null) {
          dispatch(photoUpdatedResult({id: photo.id, imgResult: croppedImage}));
        }
        setOpenDialog(false);
      }, [croppedImage]);
      
      return(
        <BootstrapDialog
          onClose={() => setOpenDialog(false)}
          aria-labelledby="customized-dialog-title"
          open={openDialog}
          fullWidth={true}
          maxWidth='sm'
        >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={() => setOpenDialog(false)}>
          Crop Image
        </BootstrapDialogTitle>
        <DialogContent dividers>
              { photo.imgResult ? (
              <Fragment>
                <Box sx={{
                  position: 'relative',
                  width: '100%',
                  height: 200,
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
                    alignItems: 'center',}}
                  >
                    <Typography
                      variant="overline">
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
            ) : (
              <div>MERDE</div>
            )
            }
            </DialogContent>
            <DialogActions>
            <Button
              autoFocus
              onClick={handleSave}
              variant="contained"
              color="primary"
            >
              Done
            </Button>
          </DialogActions>
          </BootstrapDialog>
            
            
      );
}

export default UploadPhotoDialog;