import { Button, IconButton, Toolbar } from "@mui/material";
import React, {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { nextButtonEnabled, backButtonEnabled } from "../../features/handleFormButtons/FormButtonsSlice";
import AddPhrasePage from "../addPhrasePage/addPhrasePage.component";
import ProductGrid from "../productGrid/productGrid.component";
import SameSize from "../secondStep/sameSize/sameSize.component";
import { allPhotosDeleted } from "../../features/photoEdition/PhotoSlice";
import { deleteProduct } from "../../features/productSelection/ProductSlice";
import {styled, Box} from "@mui/material";
import {AppBar} from "@mui/material";
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import AddCardButtonPulse from "./addCardButtonPulse/addCardButtonPulse.component";
import Checkout from "../checkout/checkout.component";
import { incrementStep, decrementStep } from "../../features/step/stepSlice";
import Letras from "../secondStep/letras/letras.component";
import { photoAdded } from "../../features/photoEdition/PhotoSlice";
import { setLetters } from "../../features/lettersEdition/LettersSlice";
import GiftCard from "../secondStep/giftCard/giftCard.component";
import DisplayGiftCard from "../displayGiftCard/displayGiftCard.component";
import { getPrice } from "../../utils/pricing";
import { setTotalPrice } from "../../features/totalPrice/totalPrice";
import { setAppliedDiscount } from "../../features/appliedDiscount/appliedDiscountSlice";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { forwardRef } from "react";
import { setImgResolutionMsg } from "../../features/errorMessages/errorMessages";
import { photoDeleted } from "../../features/photoEdition/PhotoSlice";
import { phraseDeleted } from "../../features/additionalPhrase/AdditionalPhraseSlice";
/*
      Main function of our application. Handles the navigation and rendering of components.
*/

const Alert = forwardRef(function Alert(props, ref) {
return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

    
const ManageOrder = () => {
      const dispatch = useDispatch();

      // Local States
      //const [step, setStep] = useState(0);
      const [isHiddenNextBtn, setHiddenNextBtn] = useState('');
      const [isHiddenBackBtn, setHiddenBackBtn] = useState('');
      const [isHiddenSubmitBtn, setHiddenSubmitBtn] = useState('none');

      // Redux Store Values
      const selectedProduct = useSelector(state => state.product);
      const enableNextButton = useSelector(state => state.formButtons.enableNextButton);
      const enableBackButton = useSelector(state => state.formButtons.enableBackButton);
      const photos = useSelector(state => state.photos);
      const step = useSelector(state => state.step.value);
      const letters = useSelector(state => state.letters);
      const additionalPhrases = useSelector(state => state.additionalPhrases); 
      const imgResErrorState = useSelector(state => state.errorMessages.imgResolution);
      
      const NavigationButton = styled(Button)({
            borderRadius: 5,
            color: '#ffffff',
            backgroundColor: 'rgb(255, 102, 196, 1)',
            width: 160,
            height: 50,
            fontSize: '1.05em',
            "&:disabled": {
                  backgroundColor: 'rgb(255, 102, 196, 0.3)',
                  color: '#ffffff'
            }
      })

      // Main stepper logic
      const renderContentByStep = (step) => {
            switch (step) {
                  case 0:
                        return <ProductGrid />
                  case 1:
                        return renderStepTwoContent(selectedProduct);
                  case 2: 
                        return renderStepThreeContent(selectedProduct);
                  case 3:
                        return <Checkout />
                  default:
                        return <div>Not Found</div>
            }
      }

      const renderStepThreeContent = (selectedProduct) => {
            switch (selectedProduct) {
                  case 'sameSize':
                        return <AddPhrasePage />
                  case 'letras':
                        return <AddPhrasePage />
                  case 'giftCard':
                        return <DisplayGiftCard />
                  default:
                        return <div>Step Three Not Found</div>
            }
      }

      // Renders a Product-specific component
      const renderStepTwoContent = (product) => {
            switch (product) {
                  case 'sameSize':
                        return <SameSize />
                  case 'letras':
                        return <Letras />
                  case 'giftCard':
                        return <GiftCard />
                  default:
                        return <div>Step Two Not Found</div>
            }
      }

      const handleBack = () => {
            dispatch(decrementStep());
      }

      const handleNext = () => {
            dispatch(incrementStep());
      }

      const showBackButton = () => {
            setHiddenBackBtn('');
      }

      const hideBackButton = () => {
            setHiddenBackBtn('none');
      }

      const checkIfAllPhotosUploaded = () => {
            let ifIs = true;
            if(photos.length > 0) {
                  photos.map(photo => {
                        ifIs = ifIs && (photo.imgSrc !== "" || photo.imgSrc !== null)
                  });
            } else {
                  ifIs = false;
            }
            return ifIs;
      }

      useEffect(() => {
            if(step === 1 && selectedProduct === "letras") {
                  dispatch(photoAdded("20x20"));
                  dispatch(photoAdded("20x20"));
                  dispatch(photoAdded("20x20"));
            }

            if(step === 0) {
                  // back to product grid, starting from scratch
            
                  // delete all photos
                  // because of delete async, only able to visualize deletion
                  // in the next step 
                  photos.map(photo => {
                        dispatch(photoDeleted({id: photo.id}));
                  });

                  additionalPhrases.map(phrase => {
                        dispatch(phraseDeleted({id: phrase.id}));
                  });

                  dispatch(deleteProduct());
                  
                  hideBackButton();
                  dispatch(nextButtonEnabled(false));
                  dispatch(backButtonEnabled(false));
                  // remove all added coupons
                  dispatch(setAppliedDiscount({
                        id: "",
                        type: "",
                        value: ""
                  }));
                  
            } else {
                  showBackButton();
                  dispatch(backButtonEnabled(true));
                  dispatch(nextButtonEnabled(false));
            }

            if(step === 1) {
                  const ifIs = checkIfAllPhotosUploaded();
                  if(ifIs) {
                        dispatch(nextButtonEnabled(true));
                  }
            }

            if(step === 2 && selectedProduct === "giftCard") {
                  hideBackButton();
                  dispatch(backButtonEnabled(false));
            }

            if((selectedProduct === "letras" || selectedProduct === "sameSize")) {
                  if(step === 2) {
                        const totalPrice = getPrice(selectedProduct, photos.length) + getPrice("additionalPhrase", additionalPhrases.length);
                        dispatch(setTotalPrice(totalPrice));
                  }
            }
            
      }, [step])

      const getBottomToolBarHeight = (step, product) => {
            if(product === "giftCard" && step > 0) {
                  return "0vh";
            } else {
                  if(step === 0) {
                        return "10vh";
                  } else {
                        return "15vh";
                  }
            }
      }

      const getMainContentHeight = (step, product) => {
            if(product === "giftCard" && step > 0) {
                  return "90vh";
            } else {
                  switch(step) {
                        case 0:
                              return "80vh"
                        case 1: 
                              return "75vh"
                        default: 
                              return "90vh"
                  }
            }
      }

      const handleCloseAlert = (e, reason) => {
            if (reason === 'clickaway') {
                  return;
            }
            dispatch(setImgResolutionMsg(false));
      }

      return(
            <Box>
                  <Box flex={1} overflow="auto" sx={{
                        position: 'relative',
                        backgroundColor: '#FAF9F9',
                        zIndex: '0',
                        height: getMainContentHeight(step, selectedProduct)
                  }}>
                        <IconButton disabled={!enableBackButton} onClick={handleBack} sx={{
                              display: `${isHiddenBackBtn}`,
                              width: 60,
                              height: 60,
                              position: 'absolute',
                              left: 30,
                              top: 30,
                              backgroundColor: '#ffffff',
                              border: '1px solid #BCB7BC'
                        }}>
                              <ArrowBackIosNewRoundedIcon sx={{
                                    position: 'absolute',
                                    left: '28%'
                              }}/> 
                        </IconButton>
                        {renderContentByStep(step)}
                  </Box>


                  {
                  (step < 2) && (
                  <Box sx={{
                        display: (getBottomToolBarHeight(step, selectedProduct)==="0vh") ? "none" : "flex",
                        height: getBottomToolBarHeight(step, selectedProduct),
                  }}>
                        <AppBar position="static" sx={{
                              height: '100%',
                              backgroundColor: '#FAF9F9'
                        }}>
                              <Snackbar open={imgResErrorState} autoHideDuration={5000} onClose={handleCloseAlert}
                                    sx={{
                                          zIndex: 5,
                                          position: 'absolute',
                                          left: 0,
                                          bottom: 0
                                    }}
                              >
                                    <Alert onClose={handleCloseAlert} severity="error" sx={{ width: '100%' }}>
                                          Asegúrate de que la resolución de tu foto sea suficientemente buena
                                    </Alert>
                              </Snackbar>
                              
                              <Toolbar sx={{
                                    height: '100%',
                                    display: 'flex',
                                    justifyContent: 'center'
                              }}>
                                    {
                                    (step === 1) && 
                                    (selectedProduct === 'sameSize') && 
                                    (photos.length > 0) &&
                                    (photos[0].imgSrc !== "") &&
                                    (<AddCardButtonPulse width={90} plusSize="2em" textOnly={true}/>)
                                    }
                                    
                                    {// do not show button if step is 1 and product is giftcard
                                          // negation is show this button if step is different than 1
                                          // and if product is not giftcard in step 1
                                    }
                                    {(selectedProduct==="giftCard") && (step === 1) ? null :
                                    <NavigationButton variant="contained" disabled={!enableNextButton} onClick={handleNext} sx={{
                                                display: `${isHiddenNextBtn}`,
                                                position: 'absolute',
                                                right: 30,
                                                bottom: 20

                                          }}>
                                          Siguiente
                                    </NavigationButton>
                                    }
                              </Toolbar>
                        </AppBar>
                  </Box>
                  )}
            </Box>
      );
}

export default ManageOrder;