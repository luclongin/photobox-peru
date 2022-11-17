import http from '../http-common'
import { UploadHttp } from '../http-common';

const createUser = data => {
      return UploadHttp.post("/orders/createUser", data);
};

const getUsers = data => {
      return http.get("/orders/users", data);
}

const deleteUser = id => {
      return http.delete(`/orders/users/${id}`);
}

const UserService = {
      createUser,
      getUsers,
      deleteUser
};  

export default UserService;