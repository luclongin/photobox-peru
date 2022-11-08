import http from '../http-common'
import { UploadHttp } from '../http-common';

const create = data => {
  return http.post("/users", data);
};

const upload = data => {
  console.log("order data: ", data);
  return UploadHttp.post("/orders/upload", data);
}
/*
const get = id => {
  return http.get(`/users/${id}`);
};

const getAll = () => {
  return http.get("/users");
};
const findByName = name => {
  return http.get(`/users?firstName=${name}`);
};*/

const OrderService = {
      //create,
      upload,
      //get,
      //getAll,
      //findByName
};

export default OrderService;