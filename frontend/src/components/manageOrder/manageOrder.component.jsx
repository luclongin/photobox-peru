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
import AddCardButton from "./addCardButton/addCardButton.component";
import Checkout from "../checkout/checkout.component";
import { incrementStep, decrementStep } from "../../features/step/stepSlice";
import Letras from "../secondStep/letras/letras.component";
/*
      Main function of our application. Handles the navigation and rendering of components.
*/
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

      const NavigationButton = styled(Button)({
            borderRadius: 5,
            color: '#ffffff',
            backgroundColor: 'rgb(255, 102, 196, 1)',
            width: 200,
            height: 50,
            fontSize: '1em',
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
                        // sending step/setStep here because default nav buttons aren't used here
                        // we're using a special button "hacer compra" that's inside the Cart component
                        return <AddPhrasePage />
                  case 3:
                        return <Checkout />
                  default:
                        return <div>Not Found</div>
            }
      }

      // Renders a Product-specific component
      const renderStepTwoContent = (product) => {
            switch (product) {
                  case 'sameSize':
                        return <SameSize />
                  case 'letras':
                        return <Letras />
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

      useEffect(() => {
            if(step === 0) {
                  // back to product grid, starting from scratch
                  dispatch(allPhotosDeleted());
                  dispatch(deleteProduct());
                  hideBackButton();
                  dispatch(nextButtonEnabled(false));
                  dispatch(backButtonEnabled(false));
            } else {
                  showBackButton();
                  dispatch(backButtonEnabled(true));
                  dispatch(nextButtonEnabled(false));
            }

            // Case where you click back from Phrases step
            // and you have photos uploaded
            if (step === 1 && photos.length > 0) {
                  dispatch(nextButtonEnabled(true));
            }
      }, [step])

      const getBottomToolBarHeight = (step) => {
            if(step === 0) {
                  return "10vh";
            } else {
                  return "15vh";
            }
      }

      const getMainContentHeight = (step) => {
            switch(step) {
                  case 0:
                        return "80vh"
                  case 1: 
                        return "75vh"
                  default: 
                        return "90vh"
            }
      }

      return(
            <Box>
                  <Box flex={1} overflow="auto" sx={{
                        position: 'relative',
                        backgroundColor: '#FAF9F9',
                        zIndex: '0',
                        height: getMainContentHeight(step)
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
                  step < 2 && (
                  <Box sx={{
                        height: getBottomToolBarHeight(step),
                  }}>
                        <AppBar position="static" sx={{
                              height: '100%',
                              backgroundColor: '#FAF9F9'
                        }}>
                              <Toolbar sx={{
                                    height: '100%',
                                    display: 'flex',
                                    justifyContent: 'center'
                              }}>
                                    
                                    {(step === 1) && (selectedProduct === 'sameSize') && (<AddCardButton />)}
                                    
                                    <NavigationButton variant="contained" disabled={!enableNextButton} onClick={handleNext} sx={{
                                                display: `${isHiddenNextBtn}`,
                                                position: 'absolute',
                                                right: 30
                                          }}>
                                          Siguiente
                                    </NavigationButton>
                                    
                              </Toolbar>
                        </AppBar>
                  </Box>
                  )}
            </Box>
      );
}

export default ManageOrder;