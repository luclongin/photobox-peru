import http from '../http-common'
import { UploadHttp } from '../http-common';

const create = data => {
  console.log("order data: ", data);
  return UploadHttp.post("/orders", data);
};

const upload = data => {
  return UploadHttp.post("/orders/upload", data);
}

const getAll = () => {
  return http.get("/orders");
};

const OrderService = {
      create,
      upload,
      getAll,
};

export default OrderService;