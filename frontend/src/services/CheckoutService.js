import http from '../http-common'
import { UploadHttp } from '../http-common';

const createPreference = data => {
      return UploadHttp.post("/checkout/create_preference", data);
};

const getFeedback = data => {
      return http.get("/checkout/getFeedback", data);
}

const CheckoutService = {
    createPreference,
    getFeedback
};  

export default CheckoutService;