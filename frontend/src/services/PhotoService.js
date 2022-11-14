import http from '../http-common'
import { UploadHttp } from '../http-common';

const uploadPhoto = data => {
      return UploadHttp.post("/orders/uploadPhoto", data);
}

const createPhoto = data => {
      return UploadHttp.post("/orders/createPhoto", data);
};

const getPhotos = data => {
      return http.get("/orders/photos", data);
}

const PhotoService = {
      uploadPhoto,
      createPhoto,
      getPhotos
};
    

export default PhotoService;