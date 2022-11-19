import http from '../http-common'
import { UploadHttp } from '../http-common';

const createLetter = data => {
      return UploadHttp.post("/orders/createLetter", data);
};

const getLetters = data => {
      return http.get("/orders/getLetters", data);
}

const deleteLetters = id => {
      return http.delete(`/orders/letters/${id}`);
}

const LetterService = {
    createLetter,
    getLetters,
    deleteLetters
};  

export default LetterService;