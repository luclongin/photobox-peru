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

const checkGiftCard = giftCardId => {
      return http.get(`/orders/checkGiftCard/${giftCardId}`);
}

const GiftCardService = {
    createGiftCard,
    checkGiftCard,
    getGiftCards,
    deleteGiftCard
};  

export default GiftCardService;