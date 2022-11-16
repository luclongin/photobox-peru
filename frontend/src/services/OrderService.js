import http from '../http-common'
import { UploadHttp } from '../http-common';

const createOrder = data => {
  return UploadHttp.post("/orders/createOrder", data);
};

const getAll = () => {
  return http.get("/orders");
};

const deleteOrder = id => {
  return http.delete(`/orders/${id}`);
}

const OrderService = {
      createOrder,
      getAll,
      deleteOrder
};

export default OrderService;