import http from '../http-common'
import { UploadHttp } from '../http-common';

const createDiscount = data => {
      return UploadHttp.post("/orders/createDiscount", data);
};

const getDiscounts = data => {
      return http.get("/orders/getDiscounts", data);
}

const deleteDiscount = discountId => {
      return http.delete(`/orders/discounts/${discountId}`);
}

const checkDiscount = discountId => {
      return http.get(`/orders/checkDiscount/${discountId}`);
}

const DiscountService = {
      createDiscount,
      checkDiscount,
      getDiscounts,
      deleteDiscount
};  

export default DiscountService;