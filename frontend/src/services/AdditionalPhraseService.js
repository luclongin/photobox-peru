import http from '../http-common'
import { UploadHttp } from '../http-common';

const createAdditionalPhrase = data => {
      return UploadHttp.post("/orders/createAdditionalPhrase", data);
};

const getAdditionalPhrases = data => {
      return http.get("/orders/additionalPhrases", data);
}

const deleteAdditionalPhrase = id => {
      return http.delete(`/orders/additionalPhrases/${id}`);
    }

const AdditionalPhraseService = {
      createAdditionalPhrase,
      getAdditionalPhrases,
      deleteAdditionalPhrase
};  

export default AdditionalPhraseService;