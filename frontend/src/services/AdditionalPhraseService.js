import http from '../http-common'
import { UploadHttp } from '../http-common';

const createAdditionalPhrase = data => {
      return UploadHttp.post("/orders/createAdditionalPhrase", data);
};

const getAdditionalPhrases = data => {
      return http.get("/orders/additionalPhrases", data);
}

const AdditionalPhraseService = {
      createAdditionalPhrase,
      getAdditionalPhrases
};  

export default AdditionalPhraseService;