import { configureStore } from "@reduxjs/toolkit";
import ProductReducer from '../features/productSelection/ProductSlice';
import PhotoReducer from '../features/photoEdition/PhotoSlice';
import FormButtonsReducer from '../features/handleFormButtons/FormButtonsSlice';
import AdditionalPhraseReducer from '../features/additionalPhrase/AdditionalPhraseSlice';
import StepReducer from '../features/step/stepSlice';
import DeliveryReducer from '../features/delivery/deliverySlice';
import UserInfoReducer from '../features/userInfo/userInfoSlice';
import OrderReducer from '../features/order/orders';
import PhotoUploadReducer from '../features/photoUpload/photoUpload';
import UserUploadReducer from '../features/userInfoUpload/userInfoUpload';
import AdditionalPhraseUploadReducer from '../features/additionalPhraseUpload/additionalPhraseUploadSlice';


export default configureStore({
      reducer: {
            product: ProductReducer,
            photos: PhotoReducer,
            formButtons: FormButtonsReducer,
            additionalPhrases: AdditionalPhraseReducer,
            step: StepReducer,
            delivery: DeliveryReducer,
            userInfo: UserInfoReducer,
            orders: OrderReducer,
            uploadedPhotos: PhotoUploadReducer,
            uploadedUser: UserUploadReducer,
            uploadedAdditionalPhrases: AdditionalPhraseUploadReducer
      }
});