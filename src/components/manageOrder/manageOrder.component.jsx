import { Button, Container } from "@mui/material";
import React, {useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductGrid from "../productGrid/productGrid.component";
import SameSize from "../secondStep/sameSize/sameSize.component";
import Sonados from "../secondStep/sonados/sonados.component";

const ManageOrder = () => {
      const selectedProduct = useSelector(state => state.product);
      const [step, setStep] = useState(1);
      const dispatch = useDispatch();
      const nextButtonEnabled = useSelector(state => state.formButtons.enableNextButton);

      // Main stepper logic
      const renderContentByStep = (step) => {
            switch (step) {
                  case 1:
                        return <ProductGrid />
                  case 2:
                        return renderStepTwoContent(selectedProduct);
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

      const handleSubmit = () => {
            setStep(step + 1);
            dispatch(nextButtonEnabled(false));
      }

      return(
            <Container fluid="true">
                  {renderContentByStep(step)}
                  <Button disabled={!nextButtonEnabled} onClick={handleSubmit}>
                        {(step > 0 && step < 2) ?"Next":"Submit"}
                  </Button>
                  {
                        step > 1 && <Button onClick={() => setStep(step-1)}>Back</Button>
                  }
            </Container>
      );
}

export default ManageOrder;