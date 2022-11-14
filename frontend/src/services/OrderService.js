import http from '../http-common'
import { UploadHttp } from '../http-common';

const createOrder = data => {
  return UploadHttp.post("/orders/createOrder", data);
};

const getAll = () => {
  return http.get("/orders");
};

const OrderService = {
      createOrder,
      getAll,
};

export default OrderService;