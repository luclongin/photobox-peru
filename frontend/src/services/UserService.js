import http from '../http-common'
import { UploadHttp } from '../http-common';

const createUser = data => {
      return UploadHttp.post("/orders/createUser", data);
};

const getUsers = data => {
      return http.get("/orders/users", data);
}

const UserService = {
      createUser,
      getUsers
};
    

export default UserService;