import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import GiftCardService from "../../services/GiftCardService";

const initialState = [];

export const createGiftCard = createAsyncThunk(
      "orders/createGiftCard",
      async (giftCard) => {
            const res = await GiftCardService.createGiftCard(giftCard);
            return res.data;
      }
);

export const checkGiftCard = createAsyncThunk(
      "orders/checkGiftCard",
      async (giftCardId) => {
            const res = await GiftCardService.checkGiftCard(giftCardId);
            let result;
            if(res.data.exists) {
                  console.log("res data:", res.data);
                  // if the discount exists
                  result = {
                        discountId: res.data.id,
                        discountAmount: res.data.amount
                  }
            } else {
                  // if the discount is wrong
                  result = false;
            }
            return result;
      }
)

export const getGiftCards = createAsyncThunk(
      "orders/getGiftCards",
      async () => {
            const res = await GiftCardService.getGiftCards();
            return res.data;
      }
);

export const deleteGiftCard = createAsyncThunk(
      "orders/deleteGiftCard",
      async (giftCardId) => {
            const res = await GiftCardService.deleteGiftCard(giftCardId);
            return res.data;
      }
)

const giftCardSlice = createSlice({
      name: "giftCard",
      initialState,
      extraReducers: {
            [createGiftCard.fulfilled]: (state, action) => {
                  state.push(action.payload);
            },
            [getGiftCards.fulfilled]: (state, action) => {
                  return [...action.payload];
            },
            [checkGiftCard.fulfilled]: (state, action) => {
                  return;
            },
            [deleteGiftCard.fulfilled]: (state, action) => {
                  let index = state.findIndex(({giftCardId}) => giftCardId === action.payload.giftCardId);
                  state.splice(index, 1);
            }
      },
});


const { reducer } = giftCardSlice;
export default reducer;