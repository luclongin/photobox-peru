import http from '../http-common'
import { UploadHttp } from '../http-common';

const createGiftCard = data => {
      return UploadHttp.post("/orders/createGiftCard", data);
};

const getGiftCards = data => {
      return http.get("/orders/getGiftCards", data);
}

const deleteGiftCard = id => {
      return http.delete(`/orders/giftCards/${id}`);
}

const GiftCardService = {
    createGiftCard,
    getGiftCards,
    deleteGiftCard
};  

export default GiftCardService;