import {useRouteError} from "react-router-dom";
import { Box } from "@mui/material";
import { OrderStepTitle } from "./components/OrderStepTitle/orderStepTitle.component";
const ErrorPage = () => {
      return(
            <Box>
                  <OrderStepTitle title="Lo siento, esta página no existe" />
            </Box>
      );
}
export default ErrorPage;