import { configureStore } from "@reduxjs/toolkit";
import ProductReducer from '../features/productSelection/ProductSlice';
import PhotoReducer from '../features/photoEdition/PhotoSlice';
import FormButtonsReducer from '../features/handleFormButtons/FormButtonsSlice';
import AdditionalPhraseReducer from '../features/additionalPhrase/AdditionalPhraseSlice';
import StepReducer from '../features/step/stepSlice';
import DeliveryReducer from '../features/delivery/deliverySlice';
import AddressReducer from '../features/userAddress/userAddressSlice';
import OrderReducer from '../features/order/orders';

export default configureStore({
      reducer: {
            product: ProductReducer,
            photos: PhotoReducer,
            formButtons: FormButtonsReducer,
            additionalPhrases: AdditionalPhraseReducer,
            step: StepReducer,
            delivery: DeliveryReducer,
            address: AddressReducer,
            order: OrderReducer,
      }
})