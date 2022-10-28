import { Button, Container } from "@mui/material";
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

const ManageOrder = () => {
      const selectedProduct = useSelector(state => state.product);
      const [step, setStep] = useState(0);
      const dispatch = useDispatch();
      const enableNextButton = useSelector(state => state.formButtons.enableNextButton);
      const enableBackButton = useSelector(state => state.formButtons.enableBackButton);
      const enableSubmitButton = useSelector(state => state.formButtons.enableSubmitButton);
      const photos = useSelector(state => state.photos);

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
                  {renderContentByStep(step)}
                  <Button disabled={!enableBackButton} onClick={handleBack}>
                        Back
                  </Button>
                  <Button disabled={!enableNextButton} onClick={handleNext}>
                        Next
                  </Button>
                  <Button disabled={!enableSubmitButton} onClick={handleSubmit}>
                        Submit
                  </Button>
            </Container>
      );
}

export default ManageOrder;