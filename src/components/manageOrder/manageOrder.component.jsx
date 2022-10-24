import { Button, Container } from "@mui/material";
import React, {useState} from "react";
import ProductGrid from "../productGrid/productGrid.component";
import SameSize from "../secondStep/sameSize/sameSize.component";
import Sonados from "../secondStep/sonados/sonados.component";

const ManageOrder = () => {
      const [step, setStep] = useState(1);
      const [formData, setFormData] = useState({
            chosenProduct: '',
            enableNextButton: false,
            uploadedPhotos: []
      });

      console.log(formData);

      // Main stepper logic
      const renderContentByStep = (step) => {
            switch (step) {
                  case 1:
                        return <ProductGrid formData={formData} setFormData={setFormData}/>
                  case 2:
                        return renderStepTwoContent(formData.chosenProduct);
                  default:
                        return <div>Not Found</div>
            }
      }

      // Renders a Product-specific component
      const renderStepTwoContent = (chosenProduct) => {
            switch (chosenProduct) {
                  case 'sameSize':
                        return <SameSize formData={formData} setFormData={setFormData} />
                  case 'sonados':
                        return <Sonados formData={formData} setFormData={setFormData} />
                  default:
                        return <div>Step Two Not Found</div>
            }
      }

      const handleSubmit = () => {
            setStep(step + 1);
            setFormData({
                  ...formData,
                  enableNextButton: false
            })
      }

      return(
            <Container fluid="true">
                  {renderContentByStep(step)}
                  <Button disabled={!formData.enableNextButton} onClick={handleSubmit}>
                        {(step > 0 && step < 2) ?"Next":"Submit"}
                  </Button>
                  {
                        step > 1 && <Button onClick={() => setStep(step-1)}>Back</Button>
                  }
            </Container>
      );
}

export default ManageOrder;