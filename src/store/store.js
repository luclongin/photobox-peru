import { configureStore } from "@reduxjs/toolkit";
import ProductReducer from '../features/productSelection/ProductSlice';
import PhotoReducer from '../features/photoEdition/PhotoSlice';
import FormButtonsReducer from '../features/handleFormButtons/FormButtonsSlice';

export default configureStore({
      reducer: {
            product: ProductReducer,
            photos: PhotoReducer,
            formButtons: FormButtonsReducer
      }
})