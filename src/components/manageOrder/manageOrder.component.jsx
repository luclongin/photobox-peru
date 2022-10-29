import { Button, Container, Typography } from "@mui/material";
import React, {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { nextButtonEnabled, backButtonEnabled } from "../../features/handleFormButtons/FormButtonsSlice";
import AddPhrase from "../addPhrase/addPhrase.component";
import ProductGrid from "../productGrid/productGrid.component";
import SameSize from "../secondStep/sameSize/sameSize.component";
import Sonados from "../secondStep/sonados/sonados.component";
import { allPhotosDeleted } from "../../features/photoEdition/PhotoSlice";
import { deleteProduct } from "../../features/productSelection/ProductSlice";
import Checkout from "../checkout/checkout.component";
import Cart from "../cart/cart.component";
import {styled, Box} from "@mui/material";

const ManageOrder = () => {
      const selectedProduct = useSelector(state => state.product);
      const [step, setStep] = useState(0);
      const dispatch = useDispatch();
      const enableNextButton = useSelector(state => state.formButtons.enableNextButton);
      const enableBackButton = useSelector(state => state.formButtons.enableBackButton);
      const enableSubmitButton = useSelector(state => state.formButtons.enableSubmitButton);
      const photos = useSelector(state => state.photos);

      const NavigationButton = styled(Button)({
            borderRadius: 10,
            color: '#ffffff',
            backgroundColor: '#FF66C4',
            width: 120,
            height: 50,
            fontSize: '1.1em',
            "& :disabled": {
                  color: "#ffffff!important"
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
                        return <AddPhrase />
                  case 3:
                        return <Cart />
                  default:
                        return <div>Not Found</div>
            }
      }

      // Renders a Product-specific component
      const renderStepTwoContent = (product) => {
            switch (product) {
                  case 'sameSize':
                        return <SameSize />
                  case 'sonados':
                        return <Sonados />
                  default:
                        return <div>Step Two Not Found</div>
            }
      }

      const handleBack = () => {
            setStep(step-1);
      }

      const handleNext = () => {
            setStep(step + 1);
      }

      const handleSubmit = () => {
      }

      useEffect(() => {
            console.log("step: ", step);
            if(step === 0) {
                  // back to product grid, starting from scratch
                  dispatch(allPhotosDeleted());
                  dispatch(deleteProduct());
                  dispatch(nextButtonEnabled(false));
                  dispatch(backButtonEnabled(false));
            } else {
                  dispatch(backButtonEnabled(true));
                  dispatch(nextButtonEnabled(false));
            }

            if (step === 1 && photos.length > 0) {
                  dispatch(nextButtonEnabled(true));
            }
      }, [step])

      return(
            <Container fluid="true">
                  <Typography variant="h4">Escoje un producto</Typography>
                  {renderContentByStep(step)}
                  <Box sx={{
                        justifyContent: 'center',
                        marginTop: 3
                  }}>
                        <NavigationButton disabled={!enableBackButton} onClick={handleBack}>
                              Back
                        </NavigationButton>
                        <NavigationButton disabled={!enableNextButton} onClick={handleNext}>
                              Next
                        </NavigationButton>
                        <NavigationButton disabled={!enableSubmitButton} onClick={handleSubmit}>
                              Submit
                        </NavigationButton>
                  </Box>
            </Container>
      );
}

export default ManageOrder;