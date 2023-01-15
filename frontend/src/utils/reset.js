import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { nextButtonEnabled, backButtonEnabled, submitButtonEnabled } from "../features/handleFormButtons/FormButtonsSlice";
import { deleteOrder } from "../features/order/orders";
import { allPhotosDeleted } from "../features/photoEdition/PhotoSlice";
import { allPhrasesDeleted } from "../features/additionalPhrase/AdditionalPhraseSlice";
import { setStep } from "../features/step/stepSlice";
import { setDelivery } from "../features/delivery/deliverySlice";
import { deleteAddress } from "../features/userInfo/userInfoSlice";
import { dispatchLetters } from "../features/lettersEdition/LettersSlice";
import { setImgResolutionMsg } from "../features/errorMessages/errorMessages";
import { setTotalPrice } from "../features/totalPrice/totalPrice";

const resetApp = (orders, dispatch) => {
    
    // reset Order
    orders.map((order, index) => {
        const orderId = order.orderId;
        dispatch(deleteOrder(orderId));
    });

    // reset Form Buttons
    dispatch(nextButtonEnabled(false));
    dispatch(backButtonEnabled(false));
    dispatch(submitButtonEnabled(false));

    // reset photos
    dispatch(allPhotosDeleted());

    // reset additionalPhrases
    dispatch(allPhrasesDeleted());

    // reset step
    dispatch(setStep(0));

    // reset delivery
    dispatch(setDelivery("gratis"));

    // reset User Info
    dispatch(deleteAddress());

    //reset letters
    dispatch(dispatchLetters({letter1: "", letter2: "", letter3: ""}));

    // reset errorMsgs
    dispatch(setImgResolutionMsg(false));

    // reset total price
    dispatch(setTotalPrice(0));
}

export default resetApp;
